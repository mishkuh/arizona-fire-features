'use server'

import { draftMode } from 'next/headers'
import InquiryTemplate, { InquiryEmailProps } from '@/components/ui/InquiryTemplate';
import resend from '@/lib/resend.client';

export async function disableDraftMode() {
    const disable = (await draftMode()).disable()
    const delay = new Promise((resolve) => setTimeout(resolve, 1000))

    await Promise.allSettled([disable, delay]);
}

export async function sendEmail(inquiryProps: InquiryEmailProps) {
    try {
        const response = await resend.emails.send({
            from: 'Arizona Fire Features Site <arizonafirefeatures@gmail.com>',
            to: ['mishkkuh@gmail.com'],
            subject: 'New Project Inquiry',
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