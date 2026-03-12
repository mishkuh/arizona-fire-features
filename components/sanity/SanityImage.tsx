/**
 * SanityImage component.
 *
 * A thin wrapper around Next.js `<Image>` that resolves a raw Sanity image
 * reference (or asset object) to a CDN URL via `urlForImage`, then forwards
 * all remaining props (className, priority, sizes, etc.) to Next.js.
 *
 * Returns `null` when the Sanity image cannot be resolved to a valid URL,
 * so callers do not need to guard against missing images.
 *
 * @example
 * <SanityImage image={product.coverImage} alt="Product photo" className="object-cover" fill />
 */
import Image, { type ImageProps } from 'next/image'
import { urlForImage } from '@/lib/sanity.image'
import type { SanityImageSource } from '@sanity/image-url'

/** Props accepted by SanityImage. Omits `src` and `alt` from ImageProps since we derive `src` internally. */
interface SanityImageProps extends Omit<ImageProps, 'src' | 'alt'> {
    /** Raw Sanity image reference or asset object. */
    image: SanityImageSource | undefined | null
    /** Accessible alt text for the rendered `<img>`. */
    alt?: string
    /** Intrinsic width in pixels (used when `fill` is not set). Defaults to 1200. */
    width?: number
    /** Intrinsic height in pixels (used when `fill` is not set). Defaults to 800. */
    height?: number
}

/**
 * SanityImage component.
 *
 * @param image - Sanity image reference to resolve.
 * @param alt - Accessible alt text (defaults to empty string).
 * @param width - Pixel width passed to `<Image>` (default 1200).
 * @param height - Pixel height passed to `<Image>` (default 800).
 * @param props - Any additional `next/image` props.
 */
export function SanityImage({
    image,
    alt = '',
    width = 1200,
    height = 800,
    ...props
}: SanityImageProps) {
    /** Resolve the Sanity reference to a CDN URL; bail out if no URL is available. */
    const src = urlForImage(image ?? undefined)
    if (!src) return null

    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            {...props}
        />
    )
}
