'use client'

/**
 * PaymentForm
 *
 * Client component that drives the Stripe payment flow for a customer invoice.
 * On mount it requests a PaymentIntent `clientSecret` from the server, then
 * renders the Stripe `<PaymentElement>` inside an `<Elements>` provider.
 *
 * Props:
 * - `token`   — invoice payment token (used to create the PaymentIntent)
 * - `invoice` — pre-fetched invoice data for the summary display
 */
import { useCallback, useEffect, useState } from 'react'
import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js'

/** Invoice line item shape. */
interface LineItem {
    description: string
    quantity: number
    unitPrice: number
}

/** Minimal invoice data needed for the payment summary display. */
export interface InvoiceData {
    invoiceNumber: string
    customerName: string
    lineItems: LineItem[]
    dueDate?: string
    notes?: string
}

interface PaymentFormProps {
    /** Unique token from the invoice URL. */
    token: string
    /** Pre-fetched invoice data passed from the server component. */
    invoice: InvoiceData
}

/** Lazy-loaded Stripe.js singleton — safe to call multiple times. */
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

// ─── Inner form (must be a child of <Elements>) ───────────────────────────────

/** Inner Stripe form rendered inside the Elements provider. */
function CheckoutForm({ token }: { token: string }) {
    const stripe = useStripe()
    const elements = useElements()

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            if (!stripe || !elements) return

            setIsLoading(true)
            setErrorMessage(null)

            /** Confirm the payment — Stripe handles 3DS and card validation. */
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    /**
                     * After successful payment Stripe redirects here. The `success=true`
                     * param tells the server component to render the success state.
                     */
                    return_url: `${window.location.origin}/pay/${token}?success=true`,
                },
            })

            /**
             * `confirmPayment` only returns here if there was an immediate error
             * (e.g. declined card). Successful payments trigger the redirect above.
             */
            if (error) {
                setErrorMessage(error.message ?? 'An unexpected error occurred.')
            }

            setIsLoading(false)
        },
        [stripe, elements, token],
    )

    return (
        <form onSubmit={handleSubmit} className="pay-form">
            <PaymentElement
                options={{
                    layout: 'tabs',
                }}
            />

            {errorMessage && (
                <div className="pay-error" role="alert">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
                        <path d="M8 4.5v4M8 11h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    {errorMessage}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || !elements || isLoading}
                className="pay-submit-btn"
            >
                {isLoading ? (
                    <>
                        <span className="pay-spinner" aria-hidden="true" />
                        Processing…
                    </>
                ) : (
                    'Pay Now'
                )}
            </button>

            <p className="pay-secure-note">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="5" y="11" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Payments are processed securely by Stripe. We never store your card details.
            </p>
        </form>
    )
}

// ─── Public component ─────────────────────────────────────────────────────────

/** Formats a number as a USD currency string. */
function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

/** Formats an ISO date string as a human-readable date (e.g. "March 15, 2024"). */
function formatDate(isoDate: string): string {
    return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

export default function PaymentForm({ token, invoice }: PaymentFormProps) {
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [fetchError, setFetchError] = useState<string | null>(null)

    const total = invoice.lineItems.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
    )

    /** Create a PaymentIntent on the server and retrieve the clientSecret. */
    useEffect(() => {
        async function createIntent() {
            try {
                const res = await fetch('/api/invoices/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                })

                const data = await res.json() as { clientSecret?: string; error?: string }

                if (!res.ok || !data.clientSecret) {
                    setFetchError(data.error ?? 'Failed to initialise payment. Please try again.')
                    return
                }

                setClientSecret(data.clientSecret)
            } catch {
                setFetchError('Network error. Please check your connection and try again.')
            }
        }

        createIntent()
    }, [token])

    /** Stripe Elements appearance configuration — matches the dark site theme. */
    const elementsOptions: StripeElementsOptions = {
        clientSecret: clientSecret ?? undefined,
        appearance: {
            theme: 'night',
            variables: {
                colorPrimary: '#f97316',
                colorBackground: '#1a1a1a',
                colorText: '#f3f4f6',
                colorDanger: '#ef4444',
                fontFamily: 'system-ui, sans-serif',
                borderRadius: '8px',
            },
        },
    }

    return (
        <div className="pay-container">
            {/* ── Invoice Summary ─────────────────────────────── */}
            <div className="pay-summary">
                <div className="pay-summary-header">
                    <h1 className="pay-invoice-title">Invoice {invoice.invoiceNumber}</h1>
                    <span className="pay-status-badge pay-status-sent">Payment Due</span>
                </div>

                <p className="pay-customer-name">For: {invoice.customerName}</p>

                {invoice.dueDate && (
                    <p className="pay-due-date">Due: {formatDate(invoice.dueDate)}</p>
                )}

                {/* Line items table */}
                <table className="pay-line-items">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Qty</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.lineItems.map((item, index) => (
                            <tr key={index}>
                                <td>{item.description}</td>
                                <td>{item.quantity}</td>
                                <td>{formatCurrency(item.unitPrice)}</td>
                                <td>{formatCurrency(item.quantity * item.unitPrice)}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="pay-total-label">Total Due</td>
                            <td className="pay-total-amount">{formatCurrency(total)}</td>
                        </tr>
                    </tfoot>
                </table>

                {invoice.notes && (
                    <div className="pay-notes">
                        <p className="pay-notes-label">Notes</p>
                        <p className="pay-notes-content">{invoice.notes}</p>
                    </div>
                )}
            </div>

            {/* ── Payment form ────────────────────────────────── */}
            <div className="pay-form-wrapper">
                <h2 className="pay-payment-heading">Secure Payment</h2>

                {fetchError ? (
                    <div className="pay-error" role="alert">{fetchError}</div>
                ) : !clientSecret ? (
                    <div className="pay-loading">
                        <span className="pay-spinner" aria-label="Loading payment form…" />
                    </div>
                ) : (
                    <Elements stripe={stripePromise} options={elementsOptions}>
                        <CheckoutForm token={token} />
                    </Elements>
                )}
            </div>
        </div>
    )
}
