import Link from 'next/link';
import { Button, Box, Section, Container, Heading, Text, Flex } from '@radix-ui/themes';
import * as motion from 'motion/react-client'
import AnimatedGrid from '../../../components/ui/AnimatedGrid';
import ServiceCard from '../../../components/ui/ServiceCard';
import { sanityClient } from 'lib/sanity.client';
import { getAllServicesQuery } from 'lib/sanity.queries';
import { urlForImage } from 'lib/sanity.image';
import { Service } from 'sanity.types';

const Services = async () => {
    const services: Service[] = await sanityClient.fetch(getAllServicesQuery)
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
                            <Heading size="8" mb="6">Our Services</Heading>
                            <Text size="5" className="block" color='gray'>
                                Comprehensive fire feature solutions to create and maintain beautiful outdoor spaces
                            </Text>
                        </Flex>
                    </motion.div>
                </Container>
            </Section>
            {/* Services Grid */}
            <Section size="3">
                <Container size="4" px="4">
                    <AnimatedGrid>
                        {services.map((service) => (
                            <ServiceCard key={service._id} {...{
                                title: service.title,
                                description: service.description,
                                coverImage: service.coverImage,
                                alt: service.coverImage?.alt,
                                featureList: service.features,
                                slug: service.slug
                            }} />
                        ))}
                    </AnimatedGrid>
                </Container>
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
        </Box >
    );
};

export default Services;
