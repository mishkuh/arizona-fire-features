/**
 * Store page (async server component).
 *
 * Fetches all product documents from Sanity (featured first, then alphabetically
 * by name) and passes them to the client-side {@link StoreGrid} component for
 * category filtering and animated display.
 *
 * Page structure:
 * 1. **Hero** — heading and sub-text explaining the product catalogue
 * 2. **Product Grid** — filterable, animated product card grid (client component)
 * 3. **CTA** — "Need Multiple Services?" section with a contact link
 *
 * There is no checkout flow — customers phone or email to place orders.
 */
import { Box, Section, Container, Flex, Heading, Text, Button } from '@radix-ui/themes';
import { sanityFetch } from '@/components/sanity/live';
import { getAllProductsQuery } from 'lib/sanity.queries';
import { Product } from 'sanity.types';
import * as motion from 'motion/react-client'
import Link from 'next/link';
import StoreGrid from '@/components/ui/StoreGrid';

/**
 * Store page component.
 *
 * Marked `async` so the Sanity data fetch happens on the server before the
 * page HTML is streamed to the client.
 */
const Store = async () => {
    /** Fetch all products — featured ones are sorted first by the GROQ query. */
    const { data } = await sanityFetch({ query: getAllProductsQuery })
    const products = data as Product[]

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
                            <Heading size="8" mb="6">Our Products</Heading>
                            <Text size="5" className="block" color='gray'>
                                Browse our selection of high-quality fire features. Contact us to order and schedule installation.
                            </Text>
                        </Flex>
                    </motion.div>
                </Container>
            </Section>

            {/* ── 2. Product Grid with Category Filters (client component) ── */}
            <Section size="3" px="4">
                <Container size="4">
                    <StoreGrid products={products} />
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
                            <Heading size="8" className="font-novecento-sans">
                                Need Multiple Services?
                            </Heading>
                            <Text color="gray" size="5">
                                We offer customized packages that combine services to meet your specific needs and budget
                            </Text>
                            <Button asChild size="4">
                                <Link href="/contact">
                                    Request a Quote
                                </Link>
                            </Button>
                        </Flex>
                    </motion.div>
                </Container>
            </Section>
        </Box>
    );
};

export default Store;
