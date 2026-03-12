/**
 * PaymentSuccess
 *
 * Displays a success confirmation when an invoice has been paid.
 * Shown in two scenarios:
 *   1. Stripe redirects back with `?success=true` after payment.
 *   2. The invoice `status` is already `paid` when the page loads.
 */

interface PaymentSuccessProps {
    invoiceNumber: string
    customerName: string
    /** Optional Stripe PaymentIntent ID for reference. */
    paymentIntentId?: string | null
}

export default function PaymentSuccess({
    invoiceNumber,
    customerName,
    paymentIntentId,
}: PaymentSuccessProps) {
    return (
        <div className="pay-success-container">
            {/* Animated checkmark */}
            <div className="pay-success-icon" aria-hidden="true">
                <svg
                    viewBox="0 0 52 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pay-checkmark"
                >
                    <circle className="pay-checkmark-circle" cx="26" cy="26" r="25" />
                    <path
                        className="pay-checkmark-check"
                        d="M14 26l8 8 16-16"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            <h1 className="pay-success-title">Payment Received!</h1>

            <p className="pay-success-message">
                Thank you, <strong>{customerName}</strong>. Your payment for invoice{' '}
                <strong>{invoiceNumber}</strong> has been successfully processed.
            </p>

            <p className="pay-success-email-note">
                A confirmation receipt has been sent to your email address.
            </p>

            {paymentIntentId && (
                <p className="pay-success-ref">
                    Reference: <code>{paymentIntentId}</code>
                </p>
            )}

            <div className="pay-success-contact">
                <p>
                    Questions about your order? Contact us at{' '}
                    <a href="mailto:arizonafirefeatures@gmail.com">
                        arizonafirefeatures@gmail.com
                    </a>
                </p>
            </div>
        </div>
    )
}
