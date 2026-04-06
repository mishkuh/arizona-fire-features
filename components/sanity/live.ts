/**
 * Sanity Live module.
 *
 * Initializes the `next-sanity/live` integration which enables:
 * - Real-time content updates via `sanityFetch` on the server
 * - The `SanityLive` component that streams live data to the browser
 *
 * Both the server token and browser token are set so that authenticated
 * (draft) content can be previewed when Sanity draft mode is active.
 */
import { defineLive } from "next-sanity/live";
import { sanityClient } from "@/lib/sanity.client";

/** Read token used by both server-side fetches and browser live subscriptions. */
const token = process.env.SANITY_API_READ_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
    client: sanityClient,
    serverToken: token,
    browserToken: token,
});