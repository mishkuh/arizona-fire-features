/**
 * PaymentConfirmationTemplate
 *
 * React Email component for the payment confirmation email sent to the
 * customer and business after a successful Stripe payment.
 *
 * Used by {@link sendPaymentConfirmationEmail} in `app/actions.ts`.
 */
import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Row,
    Column,
    Section,
    Text,
} from '@react-email/components'

/** Props required to render the payment confirmation email. */
export interface PaymentConfirmationEmailProps {
    /** Human-readable invoice number (e.g. INV-2024-001). */
    invoiceNumber: string
    /** Full name of the customer. */
    customerName: string
    /** Amount paid in USD. */
    totalAmount: number
    /** Stripe PaymentIntent ID for reference. */
    paymentIntentId: string
}

/** Formats a number as a USD currency string. */
function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

export default function PaymentConfirmationTemplate({
    invoiceNumber,
    customerName,
    totalAmount,
    paymentIntentId,
}: PaymentConfirmationEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Payment received for Invoice {invoiceNumber} — {formatCurrency(totalAmount)}</Preview>
            <Body style={bodyStyle}>
                <Container style={containerStyle}>
                    {/* Header */}
                    <Section style={headerStyle}>
                        <Heading style={brandStyle}>Arizona Fire Features</Heading>
                    </Section>

                    {/* Success badge */}
                    <Section style={{ textAlign: 'center', padding: '24px 0 8px' }}>
                        <Text style={badgeStyle}>✅ Payment Confirmed</Text>
                    </Section>

                    {/* Greeting */}
                    <Section style={contentStyle}>
                        <Text style={greetingStyle}>Hi {customerName},</Text>
                        <Text style={bodyTextStyle}>
                            Thank you! We&apos;ve received your payment for invoice{' '}
                            <strong>{invoiceNumber}</strong>. Here are your payment details:
                        </Text>
                    </Section>

                    {/* Payment details */}
                    <Section style={detailsBoxStyle}>
                        <Row>
                            <Column>
                                <Text style={detailLabelStyle}>Invoice Number</Text>
                                <Text style={detailValueStyle}>{invoiceNumber}</Text>
                            </Column>
                            <Column>
                                <Text style={detailLabelStyle}>Amount Paid</Text>
                                <Text style={detailValueStyle}>{formatCurrency(totalAmount)}</Text>
                            </Column>
                        </Row>
                        <Hr style={hrStyle} />
                        <Row>
                            <Column>
                                <Text style={detailLabelStyle}>Payment Reference</Text>
                                <Text style={{ ...detailValueStyle, fontFamily: 'monospace', fontSize: '13px' }}>
                                    {paymentIntentId}
                                </Text>
                            </Column>
                        </Row>
                    </Section>

                    {/* Body */}
                    <Section style={contentStyle}>
                        <Text style={bodyTextStyle}>
                            If you have any questions about your order or need assistance, please
                            don&apos;t hesitate to reach out.
                        </Text>
                        <Text style={bodyTextStyle}>
                            Contact us:{' '}
                            <a href="mailto:arizonafirefeatures@gmail.com" style={linkStyle}>
                                arizonafirefeatures@gmail.com
                            </a>
                        </Text>
                    </Section>

                    <Hr style={hrStyle} />

                    {/* Footer */}
                    <Section style={footerStyle}>
                        <Text style={footerTextStyle}>
                            © {new Date().getFullYear()} Arizona Fire Features. All rights reserved.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

// ─── Inline styles ────────────────────────────────────────────────────────────

const bodyStyle = {
    backgroundColor: '#111111',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    margin: '0',
    padding: '0',
}

const containerStyle = {
    maxWidth: '560px',
    margin: '40px auto',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #2a2a2a',
}

const headerStyle = {
    backgroundColor: '#f97316',
    padding: '24px 32px',
    textAlign: 'center' as const,
}

const brandStyle = {
    color: '#ffffff',
    margin: '0',
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
}

const badgeStyle = {
    display: 'inline-block',
    backgroundColor: '#166534',
    color: '#bbf7d0',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
}

const contentStyle = {
    padding: '8px 32px',
}

const greetingStyle = {
    color: '#f3f4f6',
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 8px',
}

const bodyTextStyle = {
    color: '#9ca3af',
    fontSize: '15px',
    lineHeight: '1.6',
    margin: '0 0 12px',
}

const detailsBoxStyle = {
    margin: '8px 32px 16px',
    backgroundColor: '#111111',
    borderRadius: '8px',
    padding: '20px 24px',
    border: '1px solid #2a2a2a',
}

const detailLabelStyle = {
    color: '#6b7280',
    fontSize: '12px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    margin: '0 0 4px',
}

const detailValueStyle = {
    color: '#f3f4f6',
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 16px',
}

const hrStyle = {
    borderColor: '#2a2a2a',
    margin: '16px 0',
}

const linkStyle = {
    color: '#f97316',
    textDecoration: 'none',
}

const footerStyle = {
    padding: '16px 32px 24px',
    textAlign: 'center' as const,
}

const footerTextStyle = {
    color: '#4b5563',
    fontSize: '12px',
    margin: '0',
}
