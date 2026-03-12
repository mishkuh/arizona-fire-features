/**
 * /pay/[token] — Invoice Payment Page
 *
 * Server component that loads an invoice from Sanity by its unique payment
 * token and renders the appropriate UI:
 *
 * - Not found / invalid token → error message
 * - `status === 'paid'`        → PaymentSuccess (already paid)
 * - `status === 'cancelled'`   → Cancelled message
 * - `status === 'draft'`       → Not-ready message
 * - `status === 'sent'`        → PaymentForm (Stripe checkout)
 * - `?success=true` param      → PaymentSuccess (just paid)
 */
import { sanityClient } from '@/lib/sanity.client'
import { getInvoiceByTokenQuery } from '@/lib/sanity.queries'
import PaymentForm, { type InvoiceData } from './PaymentForm'
import PaymentSuccess from './PaymentSuccess'

/** Invoice shape returned by Sanity for the payment page. */
interface Invoice extends InvoiceData {
    _id: string
    customerEmail: string
    status: 'draft' | 'sent' | 'paid' | 'cancelled'
    token: string
    dueDate?: string
    notes?: string
    stripePaymentIntentId?: string | null
}

interface PayPageProps {
    params: Promise<{ token: string }>
    searchParams: Promise<{ success?: string }>
}

export default async function PayPage({ params, searchParams }: PayPageProps) {
    const { token } = await params
    const { success } = await searchParams

    /** Fetch the invoice from Sanity using the token from the URL. */
    const invoice = await sanityClient.fetch<Invoice | null>(
        getInvoiceByTokenQuery,
        { token } as Record<string, string>,
    )

    /** Unknown token — show a 404-style message (don't call notFound() to avoid exposing the 404 page). */
    if (!invoice) {
        return (
            <div className="pay-page-shell">
                <div className="pay-state-card pay-state-error">
                    <h1>Invoice Not Found</h1>
                    <p>
                        This payment link is invalid or has expired. Please contact us if
                        you believe this is a mistake.
                    </p>
                    <a href="mailto:arizonafirefeatures@gmail.com" className="pay-contact-link">
                        arizonafirefeatures@gmail.com
                    </a>
                </div>
            </div>
        )
    }

    /**
     * Show success if Stripe redirected back with ?success=true
     * OR if the invoice is already marked as paid in Sanity.
     */
    if (success === 'true' || invoice.status === 'paid') {
        return (
            <div className="pay-page-shell">
                <PaymentSuccess
                    invoiceNumber={invoice.invoiceNumber}
                    customerName={invoice.customerName}
                    paymentIntentId={invoice.stripePaymentIntentId}
                />
            </div>
        )
    }

    /** Cancelled invoice. */
    if (invoice.status === 'cancelled') {
        return (
            <div className="pay-page-shell">
                <div className="pay-state-card pay-state-error">
                    <h1>Invoice Cancelled</h1>
                    <p>
                        This invoice has been cancelled and can no longer be paid online.
                        Please contact us if you have any questions.
                    </p>
                    <a href="mailto:arizonafirefeatures@gmail.com" className="pay-contact-link">
                        arizonafirefeatures@gmail.com
                    </a>
                </div>
            </div>
        )
    }

    /** Draft invoice — not yet sent to the customer. */
    if (invoice.status === 'draft') {
        return (
            <div className="pay-page-shell">
                <div className="pay-state-card pay-state-warning">
                    <h1>Invoice Not Ready</h1>
                    <p>
                        This invoice has not been finalised yet. Please contact us if you
                        received this link by mistake.
                    </p>
                    <a href="mailto:arizonafirefeatures@gmail.com" className="pay-contact-link">
                        arizonafirefeatures@gmail.com
                    </a>
                </div>
            </div>
        )
    }

    /** Status is `sent` — render the live Stripe payment form. */
    const invoiceData: InvoiceData = {
        invoiceNumber: invoice.invoiceNumber,
        customerName: invoice.customerName,
        lineItems: invoice.lineItems,
        dueDate: invoice.dueDate,
        notes: invoice.notes,
    }

    return (
        <div className="pay-page-shell">
            {/* Branding header */}
            <header className="pay-header">
                <span className="pay-brand">Arizona Fire Features</span>
            </header>

            <PaymentForm token={token} invoice={invoiceData} />

            <footer className="pay-footer">
                <p>© {new Date().getFullYear()} Arizona Fire Features. All rights reserved.</p>
            </footer>
        </div>
    )
}
