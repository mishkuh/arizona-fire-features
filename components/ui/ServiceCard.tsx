import Image from 'next/image';
import { Box, Button, Flex, Heading, Text, Card } from '@radix-ui/themes';
import { Slug } from '@/sanity.types';
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from 'sanity';
import { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from '@/lib/sanity.image';
import Link from 'next/link';

interface ServiceCardProps {
    title?: string;
    slug?: Slug | string;
    description?: string;
    coverImage?: SanityImageSource;
    featureList?: string[];
    alt?: string;
}

const ServiceCard = ({ title, description, coverImage, alt, featureList, slug }: ServiceCardProps) => {
    return (
        <Card asChild style={{ height: '100%' }}>
            <Link href={`/services/${slug}`} style={{ height: '100%' }}>
                <Flex justify="between" direction="column" gap="2" p="4" style={{ height: '100%' }}>
                    <Box position="relative" className="aspect-16/9">
                        {coverImage && (
                            <Image
                                alt={alt || ""}
                                src={typeof (coverImage) === 'string' ? coverImage : urlForImage(coverImage)}
                                fill
                                className="object-cover"
                            />
                        )}
                    </Box>
                    <Flex direction="column" gap="2" p="4">
                        <Heading size="5">{title}</Heading>
                        <Text as="p" size="2" color='gray'>{description}</Text>
                        <Flex direction="column">
                            {featureList?.slice(0, 4).map((feature, idx) => (
                                <Flex key={idx} align="center" gap="2">
                                    <Box className="w-1.5 h-1.5 bg-[var(--orange-9)] rounded-full shrink-0" />
                                    <Text size="2">{feature}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                    <Button>
                        Learn More →
                    </Button>
                </Flex>
            </Link>
        </Card>
    )
}

export default ServiceCard
