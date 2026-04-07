'use client'

/**
 * Lightbox component (client component).
 *
 * Full-screen image viewer rendered as a fixed overlay above all other content.
 * Supports three navigation input methods:
 * - **Keyboard** — Escape closes, ArrowLeft/ArrowRight navigates
 * - **Touch** — swipe left/right to navigate (threshold: 50 px)
 * - **Click** — prev/next chevron buttons or backdrop click to close
 *
 * Body scroll is locked while the lightbox is open to prevent background
 * content from scrolling behind the overlay.
 *
 * Prev/Next buttons are only rendered when there is more than one image in
 * the gallery.
 */
import { useEffect, useCallback, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { urlForImage } from '@/lib/sanity.image'
import { GalleryCardImage } from './GalleryCard'

interface LightboxProps {
    /** The full gallery image array (needed for navigation and the counter). */
    images: GalleryCardImage[]
    /** Zero-based index of the image currently displayed. */
    currentIndex: number
    /** Callback to close the lightbox. */
    onClose: () => void
    /** Callback to navigate to the previous image. */
    onPrev: () => void
    /** Callback to navigate to the next image. */
    onNext: () => void
}

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) => {
    /** The currently displayed gallery image document. */
    const current = images[currentIndex]

    /** Whether the full-resolution lightbox image has finished loading. */
    const [isLoaded, setIsLoaded] = useState(false)

    /** Reset loaded state whenever the active image changes. */
    useEffect(() => { setIsLoaded(false) }, [currentIndex])

    /**
     * Resolved CDN URL for the current image.
     * `current` is the plain Sanity image object — no nested `.image` property.
     */
    const imageUrl = urlForImage(current)

    /** LQIP base64 string from Sanity — used as the blur placeholder. */
    const lqip = current?.asset?.metadata?.lqip

    // ─── Keyboard Navigation ──────────────────────────────────────────────────

    /** Handles Escape / ArrowLeft / ArrowRight key events. */
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowLeft') onPrev()
        if (e.key === 'ArrowRight') onNext()
    }, [onClose, onPrev, onNext])

    useEffect(() => {
        /** Attach keyboard listener and lock body scroll on mount. */
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            /** Remove listener and restore scroll on unmount. */
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [handleKeyDown])

    // ─── Touch / Swipe Navigation ─────────────────────────────────────────────

    /** X coordinate recorded at the start of a touch gesture. */
    let touchStartX = 0

    /** Records the starting X position of a touch. */
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX = e.touches[0].clientX
    }

    /**
     * Fires when the touch ends. If the swipe distance exceeds 50 px,
     * navigate in the corresponding direction.
     */
    const handleTouchEnd = (e: React.TouchEvent) => {
        const delta = touchStartX - e.changedTouches[0].clientX
        if (Math.abs(delta) > 50) {
            delta > 0 ? onNext() : onPrev()
        }
    }

    /** Do not render if the current image or its URL are unavailable. */
    if (!current || !imageUrl) return null

    return (
        <AnimatePresence>
            {/* ── Backdrop ─────────────────────────────────────── */}
            <motion.div
                key="lightbox-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                /** Clicking the backdrop closes the lightbox. */
                onClick={onClose}
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
                {/* ── Main Image Container ──────────────────────── */}
                {/* Stop propagation so clicking the image itself doesn't close the lightbox. */}
                <motion.div
                    key={currentIndex}
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
                        gap: '16px',
                    }}
                >
                    {/* Image */}
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxHeight: '75vh',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        aspectRatio: '16 / 10',
                    }}>
                        {/* Shimmer skeleton — fades out once the image loads */}
                        <div
                            className="gallery-skeleton"
                            style={{ opacity: isLoaded ? 0 : 1, borderRadius: '10px' }}
                            aria-hidden="true"
                        />
                        <Image
                            src={imageUrl}
                            alt={`Gallery image ${currentIndex + 1}`}
                            fill
                            sizes="90vw"
                            className="object-contain"
                            style={{ zIndex: 2 }}
                            /** Use the LQIP as a blur placeholder when available. */
                            placeholder={lqip ? 'blur' : 'empty'}
                            blurDataURL={lqip}
                            /** `priority` prevents a layout shift on the first load. */
                            priority
                            onLoad={() => setIsLoaded(true)}
                        />
                    </div>

                    {/* "X / N" image counter */}
                    <p style={{
                        color: '#666',
                        fontSize: '0.75rem',
                        margin: 0,
                    }}>
                        {currentIndex + 1} / {images.length}
                    </p>
                </motion.div>

                {/* ── Close Button ──────────────────────────────── */}
                <button
                    onClick={onClose}
                    aria-label="Close lightbox"
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(255,255,255,0.1)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '44px',
                        height: '44px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: 'white',
                        transition: 'background 0.2s',
                        zIndex: 1010,
                    }}
                    onMouseEnter={(e) => ((e.currentTarget.style.background = 'rgba(255,255,255,0.2)'))}
                    onMouseLeave={(e) => ((e.currentTarget.style.background = 'rgba(255,255,255,0.1)'))}
                >
                    <X size={20} />
                </button>

                {/* ── Prev Button — only shown when there are multiple images ── */}
                {images.length > 1 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onPrev() }}
                        aria-label="Previous image"
                        style={{
                            position: 'fixed',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            transition: 'background 0.2s',
                            zIndex: 1010,
                        }}
                        onMouseEnter={(e) => ((e.currentTarget.style.background = 'rgba(255,255,255,0.2)'))}
                        onMouseLeave={(e) => ((e.currentTarget.style.background = 'rgba(255,255,255,0.1)'))}
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                {/* ── Next Button — only shown when there are multiple images ── */}
                {images.length > 1 && (
                    <button
                        onClick={(e) => { e.stopPropagation(); onNext() }}
                        aria-label="Next image"
                        style={{
                            position: 'fixed',
                            right: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '50%',
                            width: '48px',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'white',
                            transition: 'background 0.2s',
                            zIndex: 1010,
                        }}
                        onMouseEnter={(e) => ((e.currentTarget.style.background = 'rgba(255,255,255,0.2)'))}
                        onMouseLeave={(e) => ((e.currentTarget.style.background = 'rgba(255,255,255,0.1)'))}
                    >
                        <ChevronRight size={24} />
                    </button>
                )}
            </motion.div>
        </AnimatePresence>
    )
}

export default Lightbox
