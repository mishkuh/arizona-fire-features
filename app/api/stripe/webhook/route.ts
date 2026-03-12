/**
 * POST /api/stripe/webhook
 *
 * Stripe webhook handler. Receives events from Stripe and processes them:
 *
 * - `payment_intent.succeeded` — marks the corresponding Sanity invoice as
 *   `paid`, stores the Stripe PaymentIntent ID, and sends a confirmation email
 *   to the customer and business.
 *
 * The raw request body must not be parsed (Stripe signature verification
 * requires the raw bytes). We read it as `text()` and pass it directly to
 * `stripe.webhooks.constructEvent`.
 *
 * Setup:
 *   1. Add STRIPE_WEBHOOK_SECRET to your .env.local
 *   2. Run `stripe listen --forward-to localhost:3000/api/stripe/webhook`
 *   3. In production, add a webhook endpoint in the Stripe dashboard
 */
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import stripe from '@/lib/stripe'
import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '@/lib/sanity.api'
import { sendPaymentConfirmationEmail } from '@/app/actions'

/**
 * Sanity write client — uses the write token so we can patch the invoice
 * document after a successful payment. This client is intentionally separate
 * from the read-only client used elsewhere.
 */
const sanityWriteClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN,
})

/**
 * Disables body parsing — Stripe requires the raw request body bytes to
 * verify the webhook signature.
 */
export const config = { api: { bodyParser: false } }

export async function POST(request: NextRequest): Promise<NextResponse> {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
        return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

    if (!webhookSecret) {
        console.error('[stripe/webhook] STRIPE_WEBHOOK_SECRET is not set.')
        return NextResponse.json({ error: 'Webhook secret not configured.' }, { status: 500 })
    }

    let event: Stripe.Event

    try {
        /** Verify the event signature to prevent forged requests. */
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        console.error(`[stripe/webhook] Signature verification failed: ${message}`)
        return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
    }

    /** Only handle the events we care about. */
    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const { invoiceToken, sanityInvoiceId, invoiceNumber } = paymentIntent.metadata

        if (!sanityInvoiceId || !invoiceToken) {
            console.warn('[stripe/webhook] PaymentIntent missing invoice metadata, skipping.')
            return NextResponse.json({ received: true })
        }

        try {
            /** Patch the Sanity invoice document to mark it as paid. */
            await sanityWriteClient
                .patch(sanityInvoiceId)
                .set({
                    status: 'paid',
                    stripePaymentIntentId: paymentIntent.id,
                })
                .commit()

            console.log(`[stripe/webhook] Invoice ${invoiceNumber} marked as paid.`)

            /** Fetch the full invoice for the confirmation email. */
            const invoice = await sanityWriteClient.fetch<{
                customerName: string
                customerEmail: string
                lineItems: Array<{ description: string; quantity: number; unitPrice: number }>
            }>(
                `*[_type == "invoice" && _id == $id][0]{
          customerName,
          customerEmail,
          lineItems,
        }`,
                { id: sanityInvoiceId },
            )

            const totalAmount = invoice.lineItems.reduce(
                (sum: number, item: { quantity: number; unitPrice: number }) =>
                    sum + item.quantity * item.unitPrice,
                0,
            )

            /** Send confirmation email to customer and business. */
            await sendPaymentConfirmationEmail({
                invoiceNumber,
                customerName: invoice.customerName,
                customerEmail: invoice.customerEmail,
                totalAmount,
                paymentIntentId: paymentIntent.id,
            })
        } catch (err) {
            console.error('[stripe/webhook] Failed to update invoice or send email:', err)
            /** Return 500 so Stripe retries the webhook. */
            return NextResponse.json({ error: 'Failed to process payment.' }, { status: 500 })
        }
    }

    return NextResponse.json({ received: true })
}
