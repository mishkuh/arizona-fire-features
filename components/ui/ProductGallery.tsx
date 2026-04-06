'use client'

/**
 * ProductGallery component (client component).
 *
 * Displays the product image gallery as a responsive grid where each image
 * can be clicked to open a full-screen lightbox overlay.
 *
 * Supported navigation methods:
 * - **Click** — click an image tile to open it; click the backdrop or X to close
 * - **Keyboard** — Escape closes; ArrowLeft / ArrowRight navigates
 * - **Touch** — swipe left / right to navigate (threshold: 50 px)
 * - **Buttons** — prev / next chevron buttons (only when > 1 image)
 *
 * Product gallery images are plain Sanity image objects (no title / caption),
 * so the `alt` text is shown as the caption when available.
 */

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlForImage } from '@/lib/sanity.image'
import { SanityImageAssetReference, SanityImageCrop, SanityImageHotspot } from '@/sanity.types'

/** Shape of a product gallery image as returned by the Sanity GROQ query. */
type ProductGalleryImage = {
    asset?: SanityImageAssetReference
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    alt?: string
    _type: 'image'
    _key: string
}

interface ProductGalleryProps {
    /** Array of product gallery images from the Sanity product document. */
    images: ProductGalleryImage[]
}

/** Shared button style used by the close, prev, and next controls. */
const iconButtonStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white',
    transition: 'background 0.2s',
    zIndex: 1010,
}

const INITIAL_VISIBLE_COUNT = 8;

const ProductGallery = ({ images }: ProductGalleryProps) => {
    // Pre-filter valid images to ensure indexes match correctly
    const validImages = images.filter((img) => urlForImage(img) !== null);

    const [showAll, setShowAll] = useState(false);

    /** Index of the currently-open lightbox image; null means closed. */
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    /** Opens the lightbox to the image at the given grid index. */
    const openLightbox = useCallback((index: number) => setLightboxIndex(index), [])

    /** Closes the lightbox by resetting the index to null. */
    const closeLightbox = useCallback(() => setLightboxIndex(null), [])

    /** Navigates to the previous image, wrapping around to the last image. */
    const goPrev = useCallback(() => {
        setLightboxIndex((prev) =>
            prev === null ? null : (prev - 1 + validImages.length) % validImages.length
        )
    }, [validImages.length])

    /** Navigates to the next image, wrapping around to the first image. */
    const goNext = useCallback(() => {
        setLightboxIndex((prev) =>
            prev === null ? null : (prev + 1) % validImages.length
        )
    }, [validImages.length])

    // ─── Keyboard navigation & body-scroll lock ───────────────────────────────
    useEffect(() => {
        if (lightboxIndex === null) return

        /** Handles Escape / ArrowLeft / ArrowRight key events. */
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeLightbox()
            if (e.key === 'ArrowLeft') goPrev()
            if (e.key === 'ArrowRight') goNext()
        }

        document.addEventListener('keydown', handleKey)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKey)
            document.body.style.overflow = ''
        }
    }, [lightboxIndex, closeLightbox, goPrev, goNext])

    // ─── Touch / swipe state ──────────────────────────────────────────────────

    /** X coordinate recorded at the start of a touch gesture. */
    let touchStartX = 0

    /** Records the starting X position of a touch. */
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX = e.touches[0].clientX
    }

    /**
     * Fires when the touch ends. Navigates if the swipe distance exceeds 50 px.
     */
    const handleTouchEnd = (e: React.TouchEvent) => {
        const delta = touchStartX - e.changedTouches[0].clientX
        if (Math.abs(delta) > 50) {
            delta > 0 ? goNext() : goPrev()
        }
    }

    if (validImages.length === 0) {
        return <p style={{ fontStyle: 'italic' }}>No images available for this product.</p>
    }

    const currentImage = lightboxIndex !== null ? validImages[lightboxIndex] : null
    const currentUrl = currentImage ? urlForImage(currentImage) : null

    return (
        <>
            {/* ── Responsive image grid ──────────────────────────────────────── */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '16px',
                }}
            >
                {(showAll ? validImages : validImages.slice(0, INITIAL_VISIBLE_COUNT)).map((img, index) => {
                    const url = urlForImage(img)
                    if (!url) return null

                    return (
                        <motion.div
                            key={img._key}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => openLightbox(index)}
                            role="button"
                            tabIndex={0}
                            aria-label={`View image ${index + 1} of ${validImages.length}`}
                            onKeyDown={(e: React.KeyboardEvent) => {
                                if (e.key === 'Enter' || e.key === ' ') openLightbox(index)
                            }}
                            style={{
                                position: 'relative',
                                height: '256px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                background: 'var(--gray-3)',
                            }}
                        >
                            <Image
                                src={url}
                                alt={img.alt || `Product image ${index + 1}`}
                                fill
                                sizes="(max-width: 640px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </motion.div>
                    )
                })}
            </div>

            {validImages.length > INITIAL_VISIBLE_COUNT && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
                    <button
                        onClick={() => setShowAll(!showAll)}
                        style={{
                            padding: '10px 24px',
                            background: 'var(--orange-9, #e05e1f)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--orange-10, #c04e17)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--orange-9, #e05e1f)')}
                    >
                        {showAll ? 'Show Less' : 'Show More'}
                    </button>
                </div>
            )}

            {/* ── Lightbox overlay ───────────────────────────────────────────── */}
            <AnimatePresence>
                {lightboxIndex !== null && currentImage && currentUrl && (
                    <motion.div
                        key="product-lightbox-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={closeLightbox}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 1000,
                            background: 'rgba(0, 0, 0, 0.92)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* ── Image container — stops backdrop click from closing ── */}
                        <motion.div
                            key={lightboxIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                            style={{
                                position: 'relative',
                                maxWidth: '90vw',
                                maxHeight: '85vh',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            {/* Image */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxHeight: '75vh',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    aspectRatio: '16 / 10',
                                }}
                            >
                                <Image
                                    src={currentUrl}
                                    alt={currentImage.alt || ''}
                                    fill
                                    sizes="90vw"
                                    className="object-contain"
                                    /** priority prevents layout shift on first open. */
                                    priority
                                />
                            </div>

                            {/* Alt text as caption */}
                            {currentImage.alt && (
                                <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>
                                    {currentImage.alt}
                                </p>
                            )}

                            {/* "X / N" counter */}
                            <p style={{ color: '#555', fontSize: '0.75rem', margin: 0 }}>
                                {lightboxIndex + 1} / {validImages.length}
                            </p>
                        </motion.div>

                        {/* ── Close button ───────────────────────────────────── */}
                        <button
                            onClick={closeLightbox}
                            aria-label="Close image viewer"
                            style={{ ...iconButtonStyle, position: 'fixed', top: '20px', right: '20px', width: '44px', height: '44px' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                        >
                            <X size={20} />
                        </button>

                        {/* ── Prev button (only shown when > 1 image) ─────────── */}
                        {validImages.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goPrev() }}
                                aria-label="Previous image"
                                style={{ ...iconButtonStyle, position: 'fixed', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px' }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        {/* ── Next button (only shown when > 1 image) ─────────── */}
                        {validImages.length > 1 && (
                            <button
                                onClick={(e) => { e.stopPropagation(); goNext() }}
                                aria-label="Next image"
                                style={{ ...iconButtonStyle, position: 'fixed', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '48px', height: '48px' }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
                                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default ProductGallery
