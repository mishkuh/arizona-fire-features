import React from 'react';
import Link from 'next/link';
import { ArrowLeft, DollarSign } from 'lucide-react';
import { Button, Box, Section, Container, Grid, Flex, Heading, Text, Card, Avatar, Separator } from '@radix-ui/themes';
import Image from 'next/image';
import SectionWithBackground from '../../../../components/sections/SectionWithBackground';
import { sanityClient } from '@/lib/sanity.client';
import { getProductBySlugQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import { Product } from '@/sanity.types';
import { PortableText } from '@portabletext/react'

const ProductDetail = async (
    { params }: { params: Promise<{ slug: string }> }
) => {
    const { slug } = await params
    const product: Product = await sanityClient.fetch(getProductBySlugQuery, { slug })
    return (
        <Box>
            {/* Hero Section */}
            <SectionWithBackground
                height="60vh"
                imageUrl={urlForImage(product.coverImage)}
                alt={product.coverImage?.alt || ''}
                blurDataURL={''}
            >
                {/* Product Title */}
                <Card size="2">
                    <Flex direction="column" align="start">
                        <Link href="/store" className="flex items-center gap-2">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Store
                        </Link>
                        <Heading size="9">
                            {product.name || 'Product Name'}
                        </Heading>
                    </Flex>
                </Card>
            </SectionWithBackground>

            {/* Product Overview */}
            <Section size="3">
                <Container size="4" px="4">
                    <Grid columns={{ initial: '1', lg: '3' }} gap="9">
                        <Flex direction="column" gap="9" className="lg:col-span-2">
                            <Flex direction="column" gap="2">
                                <Heading size="6" color="orange" className="font-novecento-sans">Product Overview</Heading>
                                <Text size="4">
                                    <PortableText value={product.description ?? []} />
                                </Text>
                            </Flex>

                            <Flex direction="column" gap="2">
                                <Heading size="5" color="orange" className="font-novecento-sans">Product Features</Heading>
                                <ul className="list-disc list-inside">
                                    {product.features?.map((item, index) => (
                                        <li key={index}><Text size="2">{item}</Text></li>
                                    ))}
                                </ul>
                            </Flex>

                            <Flex direction="column" gap="2">
                                <Heading size="5" color="orange" className="mb-4 font-novecento-sans">Gallery</Heading>
                                {product.gallery && product.gallery.length > 0 ? (
                                    <Grid columns={{ initial: '1', md: '2' }} gap="4">
                                        {product.gallery.map((imageData) => (
                                            <Box key={imageData._key} className="relative h-64 rounded-lg overflow-hidden group">
                                                <Image
                                                    src={urlForImage(imageData)}
                                                    alt={imageData.alt || 'Gallery Image'}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                />
                                            </Box>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Text className=" italic">No images available for this product.</Text>
                                )}
                            </Flex>
                        </Flex>

                        {/* Sidebar */}
                        <Flex p="4" direction="column" className="relative rounded-lg sticky top-40 self-start shadow-lg lg:col-span-1">
                            <Card size="2">
                                <Flex direction="column" gap="4" pt="4">
                                    <Flex gap="3" align="start">
                                        <DollarSign color="orange" className="w-5 h-5 shrink-0 mt-0.5" />
                                        <Box>
                                            <Text size="2">{"Contact us for pricing"}</Text>
                                        </Box>
                                    </Flex>
                                </Flex>

                                <Flex direction="column" align="center" gap="3" px="6">
                                    <Separator size="4" my="5" />
                                    <Text size="2">
                                        Ready to order this product?
                                    </Text>
                                    <Button asChild size="4" variant="solid">
                                        <Link href="/contact">
                                            Connect with us
                                        </Link>
                                    </Button>
                                </Flex>
                            </Card>
                        </Flex>
                    </Grid>
                </Container>
            </Section>
        </Box>
    );
};

export default ProductDetail;
