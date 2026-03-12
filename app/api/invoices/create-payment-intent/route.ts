/**
 * POST /api/invoices/create-payment-intent
 *
 * Creates a Stripe PaymentIntent for a given invoice identified by its unique
 * payment token. Returns the `clientSecret` needed by the Stripe Elements
 * client component to confirm the payment.
 *
 * Request body: `{ token: string }`
 * Response:     `{ clientSecret: string }` | `{ error: string }`
 */
import { NextRequest, NextResponse } from 'next/server'
import stripe from '@/lib/stripe'
import { sanityClient } from '@/lib/sanity.client'
import { getInvoiceByTokenQuery } from '@/lib/sanity.queries'

/** Shape of each line item stored in Sanity. */
interface LineItem {
    description: string
    quantity: number
    unitPrice: number
}

/** Minimal invoice shape returned by {@link getInvoiceByTokenQuery}. */
interface Invoice {
    _id: string
    invoiceNumber: string
    customerName: string
    customerEmail: string
    lineItems: LineItem[]
    status: 'draft' | 'sent' | 'paid' | 'cancelled'
    token: string
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = await request.json() as { token?: string }
        const { token } = body

        if (!token || typeof token !== 'string') {
            return NextResponse.json({ error: 'Missing or invalid token.' }, { status: 400 })
        }

        /** Fetch the invoice from Sanity by token. */
        const invoice = await sanityClient.fetch<Invoice | null>(
            getInvoiceByTokenQuery,
            { token } as Record<string, string>,
        )


        if (!invoice) {
            return NextResponse.json({ error: 'Invoice not found.' }, { status: 404 })
        }

        if (invoice.status === 'paid') {
            return NextResponse.json({ error: 'This invoice has already been paid.' }, { status: 409 })
        }

        if (invoice.status === 'cancelled') {
            return NextResponse.json({ error: 'This invoice has been cancelled.' }, { status: 409 })
        }

        if (invoice.status === 'draft') {
            return NextResponse.json(
                { error: 'This invoice has not been sent yet and cannot be paid online.' },
                { status: 409 },
            )
        }

        /** Calculate total in cents (Stripe uses the smallest currency unit). */
        const totalCents = Math.round(
            invoice.lineItems.reduce(
                (sum, item) => sum + item.quantity * item.unitPrice,
                0,
            ) * 100,
        )

        if (totalCents <= 0) {
            return NextResponse.json({ error: 'Invoice total must be greater than zero.' }, { status: 400 })
        }

        /** Create a Stripe PaymentIntent. */
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalCents,
            currency: 'usd',
            /**
             * Store the invoice token and Sanity document ID in Stripe metadata
             * so the webhook can look up and update the correct invoice.
             */
            metadata: {
                invoiceToken: invoice.token,
                sanityInvoiceId: invoice._id,
                invoiceNumber: invoice.invoiceNumber,
            },
            receipt_email: invoice.customerEmail,
            description: `Invoice ${invoice.invoiceNumber} — ${invoice.customerName}`,
        })

        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    } catch (error) {
        console.error('[create-payment-intent] Error:', error)
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 },
        )
    }
}
