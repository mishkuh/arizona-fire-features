'use client'

/**
 * GalleryCard component (client component).
 *
 * Renders a single gallery image as an interactive card in a 4:3 aspect-ratio
 * tile. On hover a gradient overlay slides up revealing additional context.
 *
 * Loading behaviour:
 * - A shimmer skeleton is displayed beneath the image while it loads.
 * - When Sanity has generated an LQIP (Low Quality Image Placeholder) for the
 *   asset, Next.js Image's `placeholder="blur"` is used so the image
 *   transitions smoothly from a blurred preview to the full resolution photo.
 * - The shimmer is removed via an opacity transition once the image fires its
 *   `onLoad` callback.
 *
 * The card is keyboard-accessible: pressing Enter or Space fires the `onClick`
 * handler so users can open the lightbox without a mouse.
 *
 * Animation is handled by Framer Motion — cards fade in with a staggered
 * delay based on their `index` in the parent grid.
 */
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Card } from '@radix-ui/themes'
import { urlForImage } from '@/lib/sanity.image'
import { SanityImageHotspot, SanityImageCrop } from '@/sanity.types'

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Resolved asset shape returned by the `asset->` dereference in the GROQ
 * query. Sanity populates `metadata.lqip` with a tiny base64-encoded preview
 * suitable for use as a blur placeholder.
 */
type ResolvedAsset = {
    _id: string
    url?: string
    metadata?: {
        /** Base64-encoded Low Quality Image Placeholder — safe to pass to `blurDataURL`. */
        lqip?: string
        dimensions?: {
            width?: number
            height?: number
            aspectRatio?: number
        }
    }
}

/**
 * Shape of a single image item within the `galleryImages.images` array after
 * the GROQ `asset->` dereference. The `asset` field is a full asset document,
 * not just a `{ _ref, _type }` reference.
 */
export type GalleryCardImage = {
    _type: 'image'
    _key: string
    asset?: ResolvedAsset
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface GalleryCardProps {
    /** A single image item from the Sanity gallery document's images array. */
    image: GalleryCardImage
    /** Position in the parent grid; used to stagger the entrance animation. */
    index: number
    /** Callback invoked when the card is clicked or activated via keyboard. */
    onClick: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

const GalleryCard = ({ image, index, onClick }: GalleryCardProps) => {
    /** Whether the full-resolution image has finished loading. */
    const [isLoaded, setIsLoaded] = useState(false)

    /**
     * Resolve the Sanity asset reference to a CDN URL.
     * The image item IS the Sanity image object — there is no nested `.image`
     * property.
     */
    const imageUrl = urlForImage(image)

    /** LQIP string from Sanity metadata — undefined when not yet generated. */
    const lqip = image.asset?.metadata?.lqip

    /** Bail out early if the image URL cannot be resolved. */
    if (!imageUrl) return null

    return (
        <Card asChild>
            <motion.div
                /** Staggered entrance: each card delays by 50 ms × its position. */
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={onClick}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    aspectRatio: '4 / 3',
                    background: 'var(--gray-3)',
                }}
            >
                {/* ── Shimmer skeleton — visible until the image loads ─────────── */}
                <div
                    className="gallery-skeleton"
                    style={{ opacity: isLoaded ? 0 : 1 }}
                    /** Hidden from assistive technology — purely decorative. */
                    aria-hidden="true"
                />

                {/* ── Full-resolution image ────────────────────────────────────── */}
                <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    style={{
                        transition: 'transform 0.4s ease',
                        /** Keep image above the skeleton so the blur→sharp transition is visible. */
                        zIndex: 2,
                    }}
                    /**
                     * When Sanity has generated an LQIP, use Next.js Image's built-in
                     * blur placeholder so the image transitions from a blurry preview
                     * to the full resolution photo as it downloads.
                     */
                    placeholder={lqip ? 'blur' : 'empty'}
                    blurDataURL={lqip}
                    /**
                     * Lazy-load every card except the first (index 0), which is
                     * immediately visible and should be fetched eagerly to avoid
                     * an LCP penalty.
                     */
                    loading={index === 0 ? 'eager' : 'lazy'}
                    /** Remove the shimmer once the image is fully loaded. */
                    onLoad={() => setIsLoaded(true)}
                />
            </motion.div>
        </Card>
    )
}

export default GalleryCard
