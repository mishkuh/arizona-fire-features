import Link from 'next/link';
import * as motion from 'motion/react-client'
import { ArrowRight, CheckCircle, Star } from 'lucide-react';
import { Button, Flex, Box, Heading, Text, Grid, Container, Section, Em, Card } from '@radix-ui/themes';
import AnimatedGrid from '../../components/ui/AnimatedGrid';
import SectionWithBackground from '../../components/sections/SectionWithBackground';
import ServiceCard from '../../components/ui/ServiceCard';
import { Service, SiteSettings } from 'sanity.types';
import { getFeaturedServicesQuery, getSiteSettingsQuery } from '@/lib/sanity.queries';
import { sanityFetch } from '@/components/sanity/live'

const Home = async () => {
    const { data: featuredServices } = await sanityFetch({ query: getFeaturedServicesQuery })
    const { data: siteSettings } = await sanityFetch({ query: getSiteSettingsQuery })
    const services = featuredServices as Service[]
    const settings = siteSettings as SiteSettings | null

    /**
     * Use the Sanity-managed hero image URL when available;
     * fall back to the static local file so the page always renders.
     */
    const heroImageUrl: string =
        (settings?.heroCoverImage as { asset?: { url?: string } } | undefined)?.asset?.url
        ?? ''

    const heroAlt: string =
        (settings?.heroCoverImage?.alt) ?? 'Arizona Fire Features hero image'

    const benefitsList = [
        'Isokern Fireplace Specialists',
        'Licensed, Bonded & Insured',
        '20+ Years Experience',
        'Competitive Pricing',
        'ROC#290918',
        'Commitment to Quality'
    ];

    return (
        <Box>
            {/* Hero Section with Animated Background */}
            <SectionWithBackground imageUrl={heroImageUrl} alt={heroAlt} blurDataURL=''>
                {/* Hero Content */}
                <Card size={{ initial: "1", sm: "2" }} className='max-w-[900px] absolute mx-10 items-center justify-center bg-black/40'>
                    <Flex m="8px" p={{ initial: "2", md: "8" }} gap="4" direction="column" justify="center">
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
                            size={{ initial: "4", sm: "5" }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <Link href="https://earthcore.com/">
                                    ISOKERN FIREPLACE SPECIALISTS
                                </Link>
                            </motion.div>
                        </Text>
                        <Text
                            asChild
                            size={{ initial: "4", sm: "5" }}
                            color="gray"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                {"We partner with builders and contractors throughout The Valley to deliver premium fire features, on schedule and on spec."}
                            </motion.div>
                        </Text>
                        <Flex asChild gap="4" justify="between" align={{ initial: 'start', sm: 'end' }} direction={{ initial: 'column-reverse', sm: 'row' }}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Button asChild size={{ initial: "2", sm: "3" }} variant="solid" color='gray'>
                                    <Link href="/contact">
                                        Contact Us
                                        <ArrowRight />
                                    </Link>
                                </Button>
                                <Text color='gray' style={{ fontStyle: 'italic' }} size={{ initial: "1", sm: "2" }}>{"ROC#290918"}</Text>
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
                            Trusted by builders and developers across The Valley
                        </Text>
                    </motion.div>
                </Container>

                {/* Grid of services */}
                <Container size="4" px="6">
                    <AnimatedGrid>
                        {services.map((service: Service) => (
                            <ServiceCard
                                key={service._id}
                                title={service.title}
                                description={service.description}
                                coverImage={service.coverImage}
                                alt={service.coverImage?.alt}
                                featureList={service.features}
                                slug={service.slug}
                            />
                        ))}
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
                                Reliable trade partner for builders, GCs, and developers
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
                                    name: 'Michael W., General Contractor',
                                    text: 'Arizona Fire Features is our go-to sub for every new build. They show up on time, hit every deadline, and the quality is always top notch.',
                                    rating: 5
                                },
                                {
                                    name: 'Sarah J., Custom Home Builder',
                                    text: 'We have used them on dozens of projects and they never miss. Competitive pricing, easy to work with, and clients love the results.',
                                    rating: 5
                                },
                                {
                                    name: 'David L., Developer',
                                    text: 'Best fire feature sub in The Valley. Their scheduling is flexible and they know how to work within a build timeline without slowing anyone down.',
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
                                Ready to Work With Us?
                            </Heading>
                            <Text size="5" color='gray'>
                                Partner with Arizona's trusted fire feature experts for your next project
                            </Text>
                            <Button asChild size="4">
                                <Link href="/contact">
                                    Get In Touch
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
