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
 */
import { draftMode } from 'next/headers'
import resend from '@/lib/resend.client';
import InquiryTemplate, { InquiryFormProps } from '@/components/ui/InquiryTemplate';

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
export async function sendEmail(inquiryProps: InquiryFormProps) {
    try {
        const response = await resend.emails.send({
            from: 'arizonafirefeatures.com <notifications@pugetflux.com>',
            to: [process.env.CONTACT_FORM_RECEIVE_EMAIL!],
            bcc: "michael@pugetflux.com",
            subject: 'New Contact Form Submission',
            react: InquiryTemplate(inquiryProps),
        });

        if (response.error) {
            // Return a plain string instead of the whole error object
            return { success: false, error: response.error.message };
        }

        // Return a simple plain object
        return { success: true, id: response.data?.id };

    } catch (error) {
        return { success: false, error: "An unexpected error occurred" };
    }
}