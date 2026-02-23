import Link from 'next/link';
import * as motion from 'motion/react-client'
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button, Flex, Box, Heading, Text, Grid, Container, Section, Em, Card } from '@radix-ui/themes';
import AnimatedGrid from '../../components/ui/AnimatedGrid';
import SectionWithBackground from '../../components/sections/SectionWithBackground';
import ServiceCard from '../../components/ui/ServiceCard';
import { Service } from 'sanity.types';
import heroImage from '@/public/images/fireplace.webp'
import { getFeaturedServicesQuery } from '@/lib/sanity.queries';
import { sanityClient } from '@/lib/sanity.client';
import { draftMode } from 'next/headers'

const Home = async () => {
    const { isEnabled } = await draftMode()
    const featuredServices: Service[] = await sanityClient.fetch(
        getFeaturedServicesQuery,
        {},
        isEnabled
            ? {
                perspective: "drafts",
                useCdn: false,
                stega: true,
            }
            : undefined
    )

    const benefitsList = [
        'Isokern Fireplaces',
        'Licensed & Insured',
        'Free Consultations',
        'Satisfaction Guaranteed',
        '20+ Years Experience',
        'Competitive Pricing'
    ];

    return (
        <Box>
            {/* Hero Section with Animated Background */}
            <SectionWithBackground imageUrl={heroImage.src} alt="alt" blurDataURL=''>
                {/* Hero Content */}
                <Card size="2" className='max-w-[900px] absolute mx-10 items-center justify-center'>
                    <Flex m="8px" p="8" gap="4" direction="column" justify="center">
                        <Heading
                            asChild
                            size={{ initial: "8", sm: "9" }}
                        >
                            <motion.header
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                Arizona Fire Features
                            </motion.header>
                        </Heading>
                        <Text
                            asChild
                            color='orange'
                            size="6"
                        >
                            <motion.text
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Link href="https://earthcore.com/">
                                    ISOKERN FIREPLACE SPECIALISTS
                                </Link>
                            </motion.text>
                        </Text>
                        <Text
                            asChild
                            size={{ initial: "5", sm: "6" }}
                            color="gray"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                We specialize in creating premium fireplaces, fire features, and firepits in homes all over The Valley.
                            </motion.div>
                        </Text>
                        <Flex asChild gap="4" direction={{ initial: 'column', sm: 'row' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Button asChild size={{ initial: "3", sm: "4" }} variant="solid" color='gray'>
                                    <Link href="/contact">
                                        Get Free Consultation
                                        <ArrowRight />
                                    </Link>
                                </Button>
                            </motion.div>
                        </Flex>
                    </Flex>
                </Card>
            </SectionWithBackground>

            {/* Services Section */}
            <Section size="3">
                <Container asChild size="3" px="4" mb="6">
                    {/* Heading and text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Heading size="8">Featured Services</Heading>
                        <Text size="5" color='gray'>
                            Comprehensive fire feature solutions for residential properties
                        </Text>
                    </motion.div>
                </Container>

                {/* Grid of services */}
                <Container size="4" px="6">
                    <AnimatedGrid>
                        {featuredServices.map((service) => (
                            <ServiceCard
                                key={service._id}
                                title={service.title}
                                description={service.description}
                                coverImage={service.coverImage}
                                alt={service.coverImage?.alt}
                                featureList={service.features}
                                slug={service.slug}
                            />
                        ))
                            .concat(
                                // Add a card to view all services
                                <ServiceCard key={featuredServices.length} {...{
                                    title: 'View All Services',
                                    description: 'From custom fire pits to elegant outdoor fireplaces, our team provides expert fire feature solutions. We specialize in creating functional, beautiful environments tailored to your home, ensuring every outdoor space becomes a lasting, high-quality sanctuary.',
                                    coverImage: '/images/fireplace.webp',
                                    alt: 'outdoor fire feature',
                                    featureList: [],
                                    slug: '/services/'
                                }} />
                            )}
                    </AnimatedGrid>
                </Container>
            </Section>

            {/* Why Choose Us Section */}
            <Section size="3">
                <Container px="4" size="3" mb="6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Flex gap="4" direction="column">
                            <Heading size="8">Why Choose Arizona Fire Features?</Heading>
                            <Text size="5" color='gray'>
                                We're committed to excellence in every project we undertake
                            </Text>
                        </Flex>
                    </motion.div>
                </Container>
                <Container p="3" size="3">
                    <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
                        {benefitsList.map((benefit, index) => (
                            <Card asChild key={index}>
                                <Flex asChild justify="center" key={index} className="bg-[var(--orange-1)]/90 h-[100%] p-2">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Flex direction="row" align="center" gap="2">
                                            <CheckCircle color='orange' />
                                            <Text>{benefit}</Text>
                                        </Flex>
                                    </motion.div>
                                </Flex>
                            </Card>
                        ))}
                    </Grid>
                </Container>
            </Section >

            {/* Testimonials Section */}
            < Section size="3" >
                <Container size="3" px="4">
                    <Flex gap="4" direction="column" justify="center" align="center">
                        <Heading asChild size="8">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                What Our Clients Say
                            </motion.div>
                        </Heading>

                        <Grid columns={{ initial: '1', sm: '3', md: '3' }} gap="6">
                            {[
                                {
                                    name: 'Customer 1',
                                    text: 'Arizona Fire Features continues to be my go-to fire feature company. The attention to detail is incredible!',
                                    rating: 5
                                },
                                {
                                    name: 'Customer 2',
                                    text: 'Professional and reliable. They exceeded our expectations on our residential fire feature.',
                                    rating: 5
                                },
                                {
                                    name: 'Customer 3',
                                    text: 'Best fire feature company we\'ve worked with. They maintain our property beautifully and are always responsive.',
                                    rating: 5
                                }
                            ].map((testimonial, index) => (
                                <Card asChild size="3" variant="surface" key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Flex direction="column" gap="4">
                                            <Flex gap="1">
                                                {[...Array(testimonial.rating)].map((_, i) => (
                                                    <Star color="var(--yellow-8)" fill="var(--yellow-8)" key={i} />
                                                ))}
                                            </Flex>
                                            <Text as="p" mb="4"><Em>"{testimonial.text}"</Em></Text>
                                            <Text color='gray'>{testimonial.name}</Text>
                                        </Flex>
                                    </motion.div>
                                </Card>
                            ))}
                        </Grid>
                    </Flex>
                </Container>
            </Section >

            {/* CTA Section */}
            < Section size="3">
                <Container size="3" px="4">
                    <Flex asChild direction="column" gap="4" justify="center" align="center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Heading size="8">
                                Ready to Transform Your Outdoor Space?
                            </Heading>
                            <Text size="5" color='gray'>
                                Get started with a free consultation and let us bring your outdoor vision to life
                            </Text>
                            <Button asChild size="4">
                                <Link href="/contact">
                                    Schedule Free Consultation
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </motion.div>
                    </Flex>
                </Container>
            </Section >
        </Box >
    );
};

export default Home;
