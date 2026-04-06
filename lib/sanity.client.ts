/**
 * Sanity client singleton.
 *
 * Creates and exports a pre-configured `next-sanity` client that is used
 * for all server-side data fetching. Key settings:
 * - `useCdn: false` — always fetch fresh data from the Sanity API (not the CDN)
 * - `perspective: 'published'` — only returns published documents by default
 * - `stega` — enables visual editing overlays when viewed inside Sanity Studio Presentation
 *
 * For live / real-time queries, use {@link ../components/sanity/live} instead.
 */
import { apiVersion, dataset, projectId } from 'lib/sanity.api'
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  /** Disable the CDN so edits are reflected immediately without cache delays. */
  useCdn: false,
  /** Read token required for draft-mode / authenticated content fetches. */
  token: process.env.SANITY_API_READ_TOKEN,
  /** Only surface published documents by default. */
  perspective: 'published',
  /** Stega config adds edit-intent encoded data for the Presentation tool. */
  stega: {
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL,
  },
})
