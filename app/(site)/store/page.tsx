import { Box, Section, Container, Flex, Heading, Text, Button } from '@radix-ui/themes';
import { sanityClient } from 'lib/sanity.client';
import { getAllProductsQuery } from 'lib/sanity.queries';
import { Product } from 'sanity.types';
import ProductCard from '@/components/ui/ProductCard';
import * as motion from 'motion/react-client'
import Link from 'next/link';
import AnimatedGrid from '@/components/ui/AnimatedGrid';

const Store = async () => {
    const products: Product[] = await sanityClient.fetch(getAllProductsQuery)
    return (
        <Box>
            {/* Hero Section */}
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
            <Section size="3" px="4">
                <AnimatedGrid>
                    {products.map((product) => (
                        <ProductCard
                            name={product.name}
                            slug={product.slug}
                            description={product.description}
                            features={product.features}
                            coverImage={product.coverImage}
                            alt={product.coverImage?.alt}
                            ctaText="Contact for Pricing"
                        />
                    ))}
                </AnimatedGrid>
            </Section>
            {/* CTA Section */}
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
