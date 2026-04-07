/**
 * Footer component (async server component).
 *
 * Renders the site-wide footer with four columns:
 * 1. Brand — logo word mark + tagline
 * 2. Quick Links — primary navigation links, rendered via `FooterNavLinks`
 *    (a client component) so the active page can be highlighted.
 * 3. Services — first three featured services fetched from Sanity
 * 4. Contact Info — address, phone, and email
 *
 * Featured services are fetched at render time via `sanityFetch` so the footer
 * stays up to date with the Sanity dataset without a redeploy.
 */
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Flex, Heading, Text, Container, Section, Separator } from '@radix-ui/themes';
import { sanityFetch } from '@/components/sanity/live';
import FooterNavLinks from '@/components/layout/FooterNavLinks';

import { Service } from '@/sanity.types';
import { getFeaturedServicesQuery } from '@/lib/sanity.queries';

const Footer = async () => {
    /** Fetch the first few featured services to populate the Services column. */
    const { data } = await sanityFetch({ query: getFeaturedServicesQuery })
    const featuredServices = data as Service[]

    return (
        <Section className="px-2 text-[var(--gray-10)] bg-[#0d0d0d]">
            <Container className="pt-10">
                <Flex gap="4" justify="between" height="100%" align={{ initial: 'center', sm: 'stretch' }} direction={{ initial: 'column', sm: 'row' }}>
                    {/* ── 1. Brand Column ─────────────────────────── */}
                    <Flex flexGrow="1" flexShrink="1" flexBasis="0" direction="column" justify="start" align={{ initial: 'center', sm: 'start' }} gap="2">
                        <Heading color="gray" as="h3" className=" font-novecento-sans">
                            Arizona Fire Features
                        </Heading>
                        <Text wrap="balance" as="p" align={{ initial: 'center', sm: 'left' }}>
                            Expertly crafting custom fire features and outdoor living spaces that bring warmth, elegance, and ambiance to your Arizona home.
                        </Text>
                    </Flex>

                    {/* ── 2. Quick Links Column ───────────────────── */}
                    {/*
                     * FooterNavLinks is a "use client" sub-component so it can
                     * call usePathname() to highlight the active page link.
                     */}
                    <Flex flexGrow="1" flexShrink="1" flexBasis="0" direction="column" align={{ initial: 'center', sm: 'start' }}>
                        <Heading color="gray" className="font-novecento-sans mb-3">
                            Quick Links
                        </Heading>
                        <FooterNavLinks />
                    </Flex>

                    {/* ── 3. Services Column (dynamic from Sanity) ── */}
                    <Flex flexGrow="1" flexShrink="1" flexBasis="0" direction="column" align={{ initial: 'center', sm: 'start' }}>
                        <Heading color="gray" className="font-novecento-sans mb-3">
                            Services
                        </Heading>
                        {/* Show up to the first three featured services with dividers */}
                        <Flex direction="column" align="center" justify="center">
                            {featuredServices.slice(0, 3).map((service, index) => (
                                <Flex direction="column" key={index} width="100%">
                                    {index > 0 && <Separator size="4" color="gray" />}
                                    <Link href={`/services/${service.slug}`} className="py-2 text-[var(--gray-10)] hover:text-[var(--orange-9)] transition-colors duration-200">
                                        {service.title}
                                    </Link>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>

                    {/* ── 4. Contact Info Column ───────────────────── */}
                    <Flex flexGrow="1" flexShrink="1" flexBasis="0" direction="column" justify="between" align={{ initial: 'center', sm: 'start' }}>
                        <Heading color="gray" className=" font-novecento-sans p-1 mb-1 mr-1">
                            Contact Info
                        </Heading>
                        {/* Physical address — links to Google Maps */}
                        <Flex align="center" className="p-1">
                            <MapPin className="text-[var(--orange-9)] mr-2" />
                            <Text>
                                <Link href="https://www.google.com/maps/search/?api=1&query=925+W+Hatcher+Rd,+Phoenix,+AZ+85021" target="_blank">
                                    925 W. HATCHER RD PHOENIX AZ 85021
                                </Link>
                            </Text>
                        </Flex>
                        {/* Phone number — uses tel: scheme for mobile tap-to-call */}
                        <Flex align="center" className="p-1">
                            <Phone className="text-[var(--orange-9)] mr-2" />
                            <Text>
                                <Link href="tel:6024697266">
                                    (602) 469-7266
                                </Link>
                            </Text>
                        </Flex>
                        {/* Email address */}
                        <Flex align="center" className="p-1">
                            <Mail className="text-[var(--orange-9)] mr-2" />
                            <Text>
                                <Link href="mailto:arizonafirefeatures@gmail.com">
                                    arizonafirefeatures@gmail.com
                                </Link>
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>

            {/* ── Copyright bar ───────────────────────────────────── */}
            <Container>
                <Flex align="center" justify="center" className="w-full border-t py-2 my-2">
                    <Text>
                        © {new Date().getFullYear()} Arizona Fire Features. All rights reserved.
                    </Text>
                </Flex>
            </Container>
        </Section>
    );
};

export default Footer;