import Image from 'next/image';
import { Box, Button, Flex, Heading, Text, Card } from '@radix-ui/themes';
import Link from 'next/link';
import { Slug } from '@/sanity.types';
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from 'sanity';
import { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from '@/lib/sanity.image';

interface ProductCardProps {
    name?: string;
    slug?: Slug;
    description?: PortableTextBlock[];
    features?: string[];
    coverImage?: SanityImageSource;
    alt?: string;
    ctaText?: string;
}

const ProductCard = ({ name, slug, description, coverImage, alt, features, ctaText }: ProductCardProps) => {
    return (
        <Card asChild>
            <Link href={`/store/${slug}`}>
                <Flex direction="column" gap="2" p="4">
                    <Box position="relative" className="aspect-16/9">
                        <Image
                            alt={alt || ""}
                            src={urlForImage(coverImage) || ""}
                            fill
                            className="object-cover"
                        />
                    </Box>
                    <Flex direction="column" gap="2" p="4">
                        <Heading size="5">{name}</Heading>
                        <Text as="p" size="2"><PortableText value={description ?? []} /></Text>
                        <Flex direction="column">
                            {features?.slice(0, 4).map((feature, idx) => (
                                <Flex key={idx} align="center" gap="2">
                                    <Box className="w-1.5 h-1.5 bg-[var(--orange-9)] rounded-full shrink-0" />
                                    <Text size="2">{feature}</Text>
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                    <Button asChild>
                        <Link href={`/contact`}>
                            {ctaText}
                        </Link>
                    </Button>
                </Flex>
            </Link>
        </Card>
    )
}

export default ProductCard
