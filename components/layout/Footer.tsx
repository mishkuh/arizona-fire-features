import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/public/images/logo.png';
import { Box, Flex, Heading, Text, AspectRatio, Container, Section, Separator } from '@radix-ui/themes';
import { sanityClient } from '@/lib/sanity.client';
import { Service } from '@/sanity.types';
import { getFeaturedServicesQuery } from '@/lib/sanity.queries';

const Footer = async () => {
    const featuredServices: Service[] = await sanityClient.fetch(getFeaturedServicesQuery)

    return (
        <Section className="px-2 text-[var(--gray-10)]">
            <Container className="pt-10">
                <Flex align={{ initial: 'center', sm: 'start' }} direction={{ initial: 'column', sm: 'row' }}>
                    {/* Brand Column */}
                    <Flex direction="column" className="flex-2 p-2 h-100%">
                        <Flex align="center" className="p-2">
                            <Box width="50px" height="50px" className="rounded-full overflow-hidden bg-white p-1 mr-3">
                                <AspectRatio ratio={1 / 1}>
                                    <Image src={logo} alt="Logo" fill className="object-contain" />
                                </AspectRatio>
                            </Box>
                            <Heading color="gray" as="h3" className=" font-novecento-sans">
                                Arizona Fire Features
                            </Heading>
                        </Flex>
                        <Text wrap="balance" as="p">
                            Expertly crafting custom fire features and outdoor living spaces that bring warmth, elegance, and ambiance to your Arizona home.
                        </Text>
                    </Flex>

                    {/* Quick Links Column */}
                    <Flex direction="column" justify="between" align={{ initial: 'center', sm: 'start' }} className="flex-1 p-2 h-100%">
                        <Heading color="gray" className=" font-novecento-sans p-1 mb-1 mr-1">
                            Quick Links
                        </Heading>
                        <Link className="hover:text-[var(--orange-9)] transition-all duration-200 p-1" href="/">Home</Link>
                        <Link className="hover:text-[var(--orange-9)] transition-all duration-200 p-1" href="/store">Store</Link>
                        <Link className="hover:text-[var(--orange-9)] transition-all duration-200 p-1" href="/about">About</Link>
                        <Link className="hover:text-[var(--orange-9)] transition-all duration-200 p-1" href="/contact">Contact</Link>
                    </Flex>

                    {/* Services Column */}
                    <Flex direction="column" justify="between" className="flex-1 p-2 h-100%" align={{ initial: 'center', sm: 'start' }}>
                        <Heading color="gray" className=" font-novecento-sans p-1 mb-1 mr-1">
                            Services
                        </Heading>
                        <Link className="hover:text-[var(--orange-9)] transition-all duration-200 p-1" href={`/services/${featuredServices[0]?.slug}`}>{featuredServices[0]?.title}</Link>
                        <Link className="hover:text-[var(--orange-9)] transition-all duration-200 p-1" href={`/services/${featuredServices[1]?.slug}`}>{featuredServices[1]?.title}</Link>
                        <Link className="hover:text-[var(--orange-9)] transition-all duration-200 p-1" href={`/services/${featuredServices[2]?.slug}`}>{featuredServices[2]?.title}</Link>
                    </Flex>

                    {/* Contact Info Column */}
                    <Flex direction="column" justify="between" className="flex-1 p-2 h-100%" align={{ initial: 'center', sm: 'start' }}>
                        <Heading color="gray" className=" font-novecento-sans p-1 mb-1 mr-1">
                            Contact Info
                        </Heading>
                        <Flex align="center" className="p-1">
                            <MapPin className="text-[var(--orange-9)] mr-2" />
                            <Text>
                                925 W. HATCHER RD PHOENIX AZ 85021
                            </Text>
                        </Flex>
                        <Flex align="center" className="p-1">
                            <Phone className="text-[var(--orange-9)] mr-2" />
                            <Text>
                                (602) 469-7266
                            </Text>
                        </Flex>
                        <Flex align="center" className="p-1">
                            <Mail className="text-[var(--orange-9)] mr-2" />
                            <Text>
                                arizonafirefeatures@gmail.com
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
            <Container>
                <Flex align="center" justify="center" className="w-full border-t py-2 my-2">
                    <Text>
                        © {new Date().getFullYear()} Arizona Fire Features. All rights reserved.
                    </Text>
                </Flex>
            </Container>
        </Section >
    );
};

export default Footer;