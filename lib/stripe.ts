/**
 * Stripe server-side client singleton.
 *
 * Initialises a single `Stripe` instance using the `STRIPE_SECRET_KEY`
 * environment variable. Import and use this client in server-side code only
 * (API routes, Server Actions, webhooks). Never import this on the client.
 */
import Stripe from 'stripe'

/** Shared Stripe client — authenticated via the STRIPE_SECRET_KEY env var. */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    /** Pin the API version for predictable behaviour across SDK updates. */
    apiVersion: '2026-01-28.clover',
})

export default stripe
