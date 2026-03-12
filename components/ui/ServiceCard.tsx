/**
 * ServiceCard component.
 *
 * Renders a clickable card that links to a service detail page.
 * Displays the service cover image, title, short description, and the first
 * four feature bullet points alongside a "Learn More →" CTA button.
 *
 * Uses full card height (`style={{ height: '100%' }}`) so cards inside a
 * grid row all stretch to the same height regardless of content length.
 */
import Image from 'next/image';
import { Box, Button, Flex, Heading, Text, Card } from '@radix-ui/themes';
import { Slug } from '@/sanity.types';
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from 'sanity';
import { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from '@/lib/sanity.image';
import Link from 'next/link';

interface ServiceCardProps {
    /** Service title displayed prominently on the card. */
    title?: string;
    /** Sanity slug (or plain string) used to build the `/services/:slug` URL. */
    slug?: Slug | string;
    /** Plain-text short description shown beneath the title. */
    description?: string;
    /** Sanity image reference for the cover photo. */
    coverImage?: SanityImageSource;
    /** Up to four bullet-point features (remaining are truncated). */
    featureList?: string[];
    /** Accessible alt text for the cover image. */
    alt?: string;
}

const ServiceCard = ({ title, description, coverImage, alt, featureList, slug }: ServiceCardProps) => {
    return (
        <Card asChild style={{ height: '100%' }}>
            <Link href={`/services/${slug}`} style={{ height: '100%' }}>
                <Flex justify="between" direction="column" gap="2" p="4" style={{ height: '100%' }}>
                    {/* Cover image */}
                    <Box position="relative" className="aspect-16/9">
                        {coverImage && (
                            <Image
                                alt={alt || ""}
                                /** Support both resolved URL strings and raw Sanity asset references. */
                                src={typeof (coverImage) === 'string' ? coverImage : urlForImage(coverImage)}
                                fill
                                className="object-cover"
                            />
                        )}
                    </Box>

                    {/* Text content */}
                    <Flex direction="column" gap="2" p="4">
                        <Heading size="5">{title}</Heading>
                        <Text as="p" size="2" color='gray'>{description}</Text>

                        {/* Feature bullet points — capped at 4 to keep cards uniform */}
                        <Flex direction="column">
                            {featureList?.slice(0, 4).map((feature, idx) => (
                                <Flex key={idx} align="center" gap="2">
                                    <Box className="w-1.5 h-1.5 bg-[var(--orange-9)] rounded-full shrink-0" />
                                    <Text size="2">{feature}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>

                    {/* CTA */}
                    <Button>
                        Learn More →
                    </Button>
                </Flex>
            </Link>
        </Card>
    )
}

export default ServiceCard
