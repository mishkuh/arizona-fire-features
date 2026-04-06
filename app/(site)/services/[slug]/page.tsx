import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';
import { Button, Box, Section, Container, Grid, Flex, Heading, Text, Card, Separator } from '@radix-ui/themes';
import SectionWithBackground from '../../../../components/sections/SectionWithBackground';
import { sanityFetch } from '@/components/sanity/live';
import { getServiceBySlugQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import { Service } from '@/sanity.types';
import { PortableText } from '@/components/sanity/PortableText';

const ServiceDetail = async (
    { params }: { params: Promise<{ slug: string }> }
) => {
    const { slug } = await params
    const { data } = await sanityFetch({ query: getServiceBySlugQuery, params: { slug } })
    const service = data as Service
    return (
        <Box>
            {/* Hero Section */}
            <SectionWithBackground
                height="60vh"
                imageUrl={urlForImage(service.coverImage)}
                alt={service.coverImage?.alt || ''}
                blurDataURL={''}
            >
                {/* Service Title */}
                <Card size="2" className='max-w-[500px]'>
                    <Flex p="4" direction="column" align="start">
                        <Heading
                            size="9"
                            my="3"
                        >
                            {service.title}
                        </Heading>
                        <Text
                            size="4"
                            color="gray"
                        >
                            {service.subtitle}
                        </Text>
                    </Flex>
                </Card>
            </SectionWithBackground>

            {/* Service Overview */}
            <Section size="3">
                <Container size="4" px="4">
                    <Grid columns={{ initial: '1', lg: '3' }} gap="9">
                        <Flex direction="column" gap="9" className="lg:col-span-2">
                            <Flex direction="column" gap="2">
                                <Heading size="6" color="orange" className="font-novecento-sans">Service Overview</Heading>
                                <Text size="4">{service.description}</Text>
                                {service.detailedDescription && (
                                    <PortableText
                                        value={service.detailedDescription as Parameters<typeof PortableText>[0]['value']}
                                        className="mt-2 text-sm text-[var(--gray-12)]"
                                    />
                                )}
                            </Flex>

                            <Flex direction="column" gap="2">
                                <Heading size="5" color="orange" className="font-novecento-sans">Our Process</Heading>
                                <Flex direction="column" gap="4">
                                    {service.process?.map((item, index) => (
                                        <Card key={index} size="2">
                                            <Flex gap="4">
                                                <Flex justify="center" align="center" className="w-8 h-8 bg-[var(--orange-9)] text-white rounded-full font-bold shrink-0">
                                                    {index + 1}
                                                </Flex>
                                                <Box>
                                                    <Heading as="h4" size="3" weight="bold" className=" mb-1 font-novecento-sans">{item.title}</Heading>
                                                    <Text size="2">{item.description}</Text>
                                                </Box>
                                            </Flex>
                                        </Card>
                                    ))}
                                </Flex>
                            </Flex>
                        </Flex>

                        <Flex p="4" direction="column" className="relative rounded-lg sticky top-40 self-start lg:col-span-1">
                            <Card>
                                <Heading size="4" color="orange" className="font-novecento-sans">Service Benefits</Heading>
                                <Flex pt="4" direction="column" gap="3">
                                    {service.benefits && service.benefits.map((benefit, index) => (
                                        <Flex direction="row" key={index} gap="2" align="center">
                                            <Check color="orange" className="w-5 h-5 shrink-0" />
                                            <Text>{benefit}</Text>
                                        </Flex>
                                    ))}
                                </Flex>



                                <Flex direction="column" align="center" gap="2" px="6">
                                    <Separator size="4" my="5" />
                                    <Text size="2">
                                        Ready to get started?
                                    </Text>
                                    <Button asChild size="4" variant="solid">
                                        <Link href="/contact">
                                            Contact Us
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

export default ServiceDetail;
