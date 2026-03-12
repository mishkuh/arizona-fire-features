'use server'

/**
 * Server actions for the Arizona Fire Features site.
 *
 * All functions in this module run exclusively on the server (Next.js Server
 * Actions). They are safe to call from client components via the
 * `'use server'` directive.
 *
 * Exports:
 * - {@link disableDraftMode} — Exits Sanity draft/preview mode
 * - {@link sendEmail} — Sends a project inquiry email via Resend
 * - {@link sendPaymentConfirmationEmail} — Sends a payment confirmation email via Resend
 */
import { draftMode } from 'next/headers'
import InquiryTemplate, { InquiryEmailProps } from '@/components/ui/InquiryTemplate';
import PaymentConfirmationTemplate, { PaymentConfirmationEmailProps } from '@/components/ui/PaymentConfirmationTemplate';
import resend from '@/lib/resend.client';

/**
 * Disables Sanity draft mode for the current session.
 *
 * Resolves both the `disable()` call and a 1 s artificial delay before
 * returning so that any in-flight live-query subscriptions have time to
 * unsubscribe cleanly before the page re-renders in published mode.
 */
export async function disableDraftMode() {
    const disable = (await draftMode()).disable()
    const delay = new Promise((resolve) => setTimeout(resolve, 1000))

    await Promise.allSettled([disable, delay]);
}

/**
 * Sends a project inquiry email to the business inbox using Resend.
 *
 * The email is sent from the site's verified sending address and rendered
 * using the {@link InquiryTemplate} React component.
 *
 * @param inquiryProps - Form data collected from the contact form.
 * @returns A plain serialisable object indicating success or failure.
 *          On success: `{ success: true, id: string }`
 *          On failure: `{ success: false, error: string }`
 */
export async function sendEmail(inquiryProps: InquiryEmailProps) {
    try {
        const response = await resend.emails.send({
            from: 'Arizona Fire Features Site <arizonafirefeatures@gmail.com>',
            to: ['arizonafirefeatures@gmail.com'],
            subject: 'New Project Inquiry',
            react: InquiryTemplate(inquiryProps),
        });

        if (response.error) {
            /** Return a plain string instead of the raw Resend error object. */
            return { success: false, error: response.error.message };
        }

        return { success: true, id: response.data?.id };

    } catch (error) {
        /** Catch any unexpected network or runtime errors. */
        return { success: false, error: "An unexpected error occurred" };
    }
}

/**
 * Sends a payment confirmation email to the customer and business inbox.
 *
 * Called by the Stripe webhook handler after `payment_intent.succeeded`.
 * Sends to both the customer's email address and the business inbox.
 *
 * @param props - Invoice and payment data needed to render the email template.
 * @returns A plain serialisable object indicating success or failure.
 */
export async function sendPaymentConfirmationEmail(
    props: PaymentConfirmationEmailProps & { customerEmail: string },
) {
    try {
        const { customerEmail, ...templateProps } = props;

        /** Send to both the customer and the business inbox. */
        const response = await resend.emails.send({
            from: 'Arizona Fire Features <arizonafirefeatures@gmail.com>',
            to: [customerEmail, 'arizonafirefeatures@gmail.com'],
            subject: `Payment Confirmed — Invoice ${props.invoiceNumber}`,
            react: PaymentConfirmationTemplate(templateProps),
        });

        if (response.error) {
            return { success: false, error: response.error.message };
        }

        return { success: true, id: response.data?.id };
    } catch (error) {
        return { success: false, error: 'An unexpected error occurred' };
    }
}