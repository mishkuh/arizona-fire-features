'use client'

/**
 * GalleryGrid component (client component).
 *
 * Renders the public-facing gallery as a responsive auto-fill CSS grid of
 * {@link GalleryCard} thumbnails. Clicking any card opens a {@link Lightbox}
 * overlay positioned at that image's index.
 *
 * Navigation state (which image is open) lives here so the Lightbox can
 * be unmounted entirely when closed, freeing the keyboard-listener effect.
 *
 * Keyboard and touch navigation is handled inside the Lightbox itself;
 * this component only manages the open/close and prev/next index updates.
 */
import { useState, useCallback } from 'react'
import { GalleryImage } from '@/sanity.types'
import { urlForImage } from '@/lib/sanity.image'
import GalleryCard from './GalleryCard'
import Lightbox from './Lightbox'

const INITIAL_VISIBLE_COUNT = 8;

interface GalleryGridProps {
    /** Full list of gallery image documents fetched from Sanity. */
    images: GalleryImage[]
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
    // Pre-filter valid images to ensure indexes match correctly
    const validImages = images.filter((img) => img.image ? urlForImage(img.image) !== null : false);

    const [showAll, setShowAll] = useState(false);

    /**
     * Index of the currently-open lightbox image.
     * `null` means the lightbox is closed.
     */
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

    /** Empty-state message shown when no gallery documents exist in Sanity. */
    if (validImages.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '80px 24px',
                color: 'var(--gray-9)',
            }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '8px' }}>
                    No gallery images yet.
                </p>
                <p style={{ fontSize: '0.9rem' }}>
                    Add images in the Sanity Studio to populate this gallery.
                </p>
            </div>
        )
    }

    return (
        <>
            {/* Responsive auto-fill grid — each cell is at least 280 px wide. */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '12px',
                }}
            >
                {(showAll ? validImages : validImages.slice(0, INITIAL_VISIBLE_COUNT)).map((image, index) => (
                    <GalleryCard
                        key={image._id}
                        image={image}
                        index={index}
                        onClick={() => openLightbox(index)}
                    />
                ))}
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

            {/* Render the lightbox only when an image is selected. */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={validImages}
                    currentIndex={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={goPrev}
                    onNext={goNext}
                />
            )}
        </>
    )
}

export default GalleryGrid
