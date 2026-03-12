/**
 * Gallery page (async server component).
 *
 * Fetches all gallery image documents from Sanity (ordered by date descending)
 * and renders them in an interactive {@link GalleryGrid} that supports
 * click-to-expand via {@link Lightbox}.
 *
 * Page structure:
 * 1. **Hero** — heading and brief description
 * 2. **Gallery Grid** — responsive image grid with lightbox (client component)
 * 3. **CTA** — "Ready for Your Own Fire Feature?" section with a quote link
 */
import { Box, Section, Container, Heading, Text, Flex } from '@radix-ui/themes';
import * as motion from 'motion/react-client'
import { sanityFetch } from '@/components/sanity/live';
import { getAllGalleryImagesQuery } from '@/lib/sanity.queries';
import { GalleryImage } from '@/sanity.types';
import GalleryGrid from '@/components/ui/GalleryGrid';

/** Next.js metadata for SEO — title and description appear in browser tab and search results. */
export const metadata = {
    title: 'Gallery | Arizona Fire Features',
    description: 'Browse our past fire feature installation projects across the Phoenix metro area.',
}

/**
 * Gallery page component.
 *
 * Marked `async` so the Sanity data fetch happens on the server before the
 * page HTML is streamed to the client.
 */
const Gallery = async () => {
    /** Fetch gallery images — newest first, falling back to _createdAt when no date is set. */
    const { data } = await sanityFetch({ query: getAllGalleryImagesQuery })
    const images = data as GalleryImage[]

    return (
        <Box>
            {/* ── 1. Hero Section ─────────────────────────────── */}
            <Section size="3">
                <Container size="3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Flex direction="column" align="center" className="text-center text-white max-w-3xl mx-auto">
                            <Heading size="8" mb="4">Our Work</Heading>
                            <Text size="5" className="block" color="gray">
                                A showcase of fire feature installations across the Phoenix metro area.
                                Click any image to view it full‑size.
                            </Text>
                        </Flex>
                    </motion.div>
                </Container>
            </Section>

            {/* ── 2. Gallery Grid (client component with lightbox) ── */}
            <Section size="3">
                <Container size="4" px="4">
                    <GalleryGrid images={images} />
                </Container>
            </Section>

            {/* ── 3. CTA Section ──────────────────────────────── */}
            <Section mt="3" size="3">
                <Container size="4" px="4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Flex direction="column" align="center" gap="4">
                            <Heading size="7">
                                Ready for Your Own Fire Feature?
                            </Heading>
                            <Text color="gray" size="5">
                                Let us bring the same quality craftsmanship to your outdoor space.
                            </Text>
                            {/* Plain anchor used here to allow inline style overrides on the button. */}
                            <a
                                href="/contact"
                                style={{
                                    display: 'inline-block',
                                    padding: '12px 32px',
                                    background: 'var(--orange-9)',
                                    color: 'white',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    fontSize: '1rem',
                                    transition: 'background 0.2s',
                                }}
                            >
                                Get a Free Quote
                            </a>
                        </Flex>
                    </motion.div>
                </Container>
            </Section>
        </Box>
    );
};

export default Gallery;
