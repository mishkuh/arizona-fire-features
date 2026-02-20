import React from 'react';
import * as motion from 'motion/react-client'
import { Award, Users, User, Flame, Heart } from 'lucide-react';
import Image from 'next/image';
import { Box, Container, Section, Grid, Flex, Heading, Text, Card, Avatar } from '@radix-ui/themes';

const About = () => {
    const values = [
        {
            icon: Heart,
            title: 'Customer Care',
            description: 'Your satisfaction is our priority. We build lasting relationships with our clients.'
        },
        {
            icon: Award,
            title: 'Quality',
            description: 'We deliver exceptional craftsmanship in every project, big or small.'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'We\'re proud to serve our local community.'
        },
        {
            icon: Flame,
            title: 'Attention to Detail',
            description: 'We pay close attention to detail to deliver clean, beautiful work every time.'
        }
    ];

    const team = [
        {
            name: 'Greg Barton',
            role: 'Founder & Lead',
            bio: 'This is where the bio will go'
        },
        {
            name: 'Robin Barton',
            role: 'Role',
            bio: 'This is where the bio will go'
        },
        {
            name: 'Team Member 1',
            role: 'Role',
            bio: 'This is where the bio will go'
        }
    ];

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
                        <Flex direction="column" align="center" className="text-center  max-w-3xl mx-auto">
                            <Heading size="8" mb="6" className="font-novecento-sans ">About Arizona Fire Features</Heading>
                            <Text color="gray" size="5" className="block">
                                Crafting custom fireplaces and premium fire features for over 20 years.
                            </Text>
                        </Flex>
                    </motion.div>
                </Container>
            </Section>

            {/* Story Section */}
            <Section size="3" className="">
                <Container size="4" px="4">
                    <Grid columns={{ initial: '1', md: '2' }} gap="9" align="center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Heading size="8" className=" mb-6 font-novecento-sans">Our Story</Heading>
                            <Flex direction="column" gap="4">
                                <Text color="gray" as="p" size="3" className="leading-relaxed">
                                    Founded in the heart of the desert, Arizona Fire Features began with a simple vision: to transform outdoor living spaces into warm, inviting sanctuaries. For over two decades, we have specialized in designing and installing custom fire pits, outdoor fireplaces, and unique fire elements that capture the spirit of the Southwest.
                                </Text>
                                <Text color="gray" as="p" size="3" className="leading-relaxed">
                                    What began as a small family venture has grown into a trusted name across the Phoenix Valley. As a family-owned and operated business, our success is built on a foundation of quality craftsmanship and the genuine care we bring to every neighbor's home.
                                </Text>
                                <Text color="gray" as="p" size="3" className="leading-relaxed">
                                    Today, we continue to serve residential clients throughout the region, driven by an uncompromising commitment to quality and the superior craftsmanship that has been our signature since day one.
                                </Text>
                            </Flex>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Box className="rounded-2xl overflow-hidden shadow-2xl h-96 relative">
                                <Image
                                    alt="Picture of Arizona Fire Features team"
                                    className="object-cover"
                                    src="/images/logo.png"
                                    fill
                                />
                            </Box>
                        </motion.div>
                    </Grid>
                </Container>
            </Section>

            {/* Values Section */}
            <Section size="3">
                <Container size="4" px="4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center  mb-12"
                    >
                        <Heading size="8" mb="4" className=" font-novecento-sans">Our Values</Heading>
                        <Text color="gray" size="5" className="/90 max-w-2xl mx-auto">
                            These core principles guide everything we do
                        </Text>
                    </motion.div>

                    <Grid columns={{ initial: '1', md: '2', lg: '4' }} gap="6" className="max-w-6xl mx-auto">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Flex direction="column" gap="3" className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-colors h-full">
                                        <Flex justify="center">
                                            <Flex justify="center" align="center" className="bg-[var(--orange-9)] w-16 h-16 rounded-full">
                                                <Icon className="w-8 h-8 " />
                                            </Flex>
                                        </Flex>
                                        <Heading size="4" weight="bold" className=" mb-2 font-novecento-sans">{value.title}</Heading>
                                        <Text color="gray" size="2" className="block">{value.description}</Text>
                                    </Flex>
                                </motion.div>
                            );
                        })}
                    </Grid>
                </Container>
            </Section>

            {/* Team Section */}
            <Section size="3" className="">
                <Container size="4" px="4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <Heading size="8" className=" mb-4 font-novecento-sans">Meet Our Team</Heading>
                        <Text color="gray" size="5" className=" max-w-2xl mx-auto">
                            The experienced professionals behind every beautiful fire feature
                        </Text>
                    </motion.div>

                    <Grid columns={{ initial: '1', md: '3' }} gap="8" className="max-w-5xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow h-full" size="2">
                                    <Flex direction="column">
                                        <Flex justify="center" align="center" className="h-64 ">
                                            <User className="w-24 h-24 " />
                                        </Flex>
                                        <Flex direction="column" gap="2" p="4">
                                            <Heading size="5" className=" mb-1 font-novecento-sans">{member.name}</Heading>
                                            <Text size="2" weight="bold" color='orange' className="mb-3 block">{member.role}</Text>
                                            <Text size="2" color="gray" className=" leading-relaxed block">{member.bio}</Text>
                                        </Flex>
                                    </Flex>
                                </Card>
                            </motion.div>
                        ))}
                    </Grid>
                </Container>
            </Section>

            {/* Stats Section */}
            <Section size="3" className="">
                <Container size="4" px="4">
                    <Grid columns={{ initial: '2', md: '4' }} gap="8" className="max-w-4xl mx-auto">
                        {[
                            { number: '20+', label: 'Years Experience' },
                            { number: '500+', label: 'Projects Completed' },
                            { number: '200+', label: 'Happy Clients' },
                            { number: '10+', label: 'Team Members' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <Text size="8" weight="bold" color="orange">
                                    {stat.number}
                                </Text>
                                <Text color="gray" size="3" weight="medium" className=" block">{stat.label}</Text>
                            </motion.div>
                        ))}
                    </Grid>
                </Container>
            </Section>
        </Box>
    );
};

export default About;
