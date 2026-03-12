/**
 * Sanity API configuration constants.
 *
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the
 * client bundle size, or end up in a server-only function that doesn't need it.
 *
 * All values are read from environment variables so that they can be set
 * differently per deployment environment (development, staging, production).
 */

/**
 * The Sanity dataset to query (e.g. `"production"`).
 * Sourced from `NEXT_PUBLIC_SANITY_DATASET`.
 */
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)

/**
 * The Sanity project ID.
 * Sourced from `NEXT_PUBLIC_SANITY_PROJECT_ID`.
 */
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)

/**
 * The Sanity API read token used for authenticated requests (e.g. draft mode).
 * Falls back to an empty string so un-authed public requests still work.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN || ''

/**
 * The API version string to use for all Sanity queries.
 * See https://www.sanity.io/docs/api-versioning for how versioning works.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21'

/**
 * Asserts that `v` is defined and throws `errorMessage` if it is not.
 *
 * @param v - The value to check.
 * @param errorMessage - Human-readable error shown at startup if `v` is missing.
 * @returns The value, narrowed to `T` (not `undefined`).
 */
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}

/** The route where Sanity Studio is mounted — used for embedded studio routing and Visual Editing. */
export const basePath = '/studio'
