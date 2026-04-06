/**
 * Sanity image URL builder.
 *
 * Provides the `urlForImage` helper which converts a raw Sanity image object
 * (or asset reference) into a fully-qualified CDN URL. The builder is
 * configured with the project's `projectId` and `dataset` at module load time.
 *
 * @example
 * const url = urlForImage(doc.coverImage)
 * // → "https://cdn.sanity.io/images/<projectId>/<dataset>/..."
 */
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'
import { dataset, projectId } from 'lib/sanity.api'

/** Sanity image URL builder instance scoped to this project/dataset. */
const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

/**
 * Converts a Sanity image source to a formatted CDN URL.
 *
 * @param source - The raw Sanity image reference or asset object.
 * @returns A fully-qualified CDN URL string, or an empty string if no source is given.
 */
export const urlForImage = (source: SanityImageSource | undefined) => {
  if (!source) return ''
  return imageBuilder?.image(source).auto('format').fit('max').url()
}
