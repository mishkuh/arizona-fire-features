/**
 * Resend email client singleton.
 *
 * Initializes a single Resend instance using the `RESEND_API_KEY` environment
 * variable. Import and use this client whenever you need to send transactional
 * emails (e.g. inquiry notifications) from server-side code.
 */
import { Resend } from 'resend';

/** Shared Resend client — authenticated via the RESEND_API_KEY env var. */
const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
