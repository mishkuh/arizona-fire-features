'use client'

/**
 * GalleryCard component (client component).
 *
 * Renders a single gallery image as an interactive card in a 4:3 aspect-ratio
 * tile. On hover a gradient overlay slides up revealing the image title,
 * caption, and optional contact/attribution line.
 *
 * The card is keyboard-accessible: pressing Enter or Space fires the `onClick`
 * handler so users can open the lightbox without a mouse.
 *
 * Animation is handled by Framer Motion — cards fade in with a staggered
 * delay based on their `index` in the parent grid.
 */
import Image from 'next/image'
import { motion } from 'motion/react'
import { GalleryImage } from '@/sanity.types'
import { urlForImage } from '@/lib/sanity.image'

interface GalleryCardProps {
    /** The Sanity gallery image document with resolved asset data. */
    image: GalleryImage
    /** Position in the parent grid; used to stagger the entrance animation. */
    index: number
    /** Callback invoked when the card is clicked or activated via keyboard. */
    onClick: () => void
}

const GalleryCard = ({ image, index, onClick }: GalleryCardProps) => {
    /** Resolve the Sanity image reference to a CDN URL. */
    const imageUrl = urlForImage(image.image)

    /** Bail out early if the image URL cannot be resolved. */
    if (!imageUrl) return null

    return (
        <motion.div
            /** Staggered entrance: each card delays by 50 ms × its position. */
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="gallery-card"
            onClick={onClick}
            role="button"
            tabIndex={0}
            aria-label={`View ${image.title}`}
            /** Allow keyboard activation via Enter or Space bar. */
            onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
            style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                cursor: 'pointer',
                aspectRatio: '4 / 3',
                background: 'var(--gray-3)',
            }}
        >
            <Image
                src={imageUrl}
                alt={image.image?.alt || image.title || ''}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                style={{ transition: 'transform 0.4s ease' }}
            />

            {/* Hover overlay — gradient slides up from the bottom revealing metadata */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '16px',
                    gap: '4px',
                }}
            >
                {/* Title */}
                {image.title && (
                    <p style={{
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        margin: 0,
                        lineHeight: 1.3,
                    }}>
                        {image.title}
                    </p>
                )}

                {/* Caption */}
                {image.caption && (
                    <p style={{
                        color: 'orange',
                        fontSize: '0.8rem',
                        margin: 0,
                        lineHeight: 1.4,
                    }}>
                        {image.caption}
                    </p>
                )}

                {/* Contact / attribution line — orange to stand out */}
                {image.contactInfo && (
                    <p style={{
                        color: 'var(--orange-9)',
                        fontSize: '0.75rem',
                        margin: 0,
                        fontWeight: 500,
                    }}>
                        {image.contactInfo}
                    </p>
                )}
            </motion.div>
        </motion.div>
    )
}

export default GalleryCard
