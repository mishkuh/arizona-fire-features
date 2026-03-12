import Image from 'next/image';
import { Box, Button, Flex, Heading, Text, Card, Badge } from '@radix-ui/themes';
import Link from 'next/link';
import { Slug } from '@/sanity.types';
import { PortableText } from '@portabletext/react'
import { PortableTextBlock } from 'sanity';
import { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from '@/lib/sanity.image';

/** Maps an availability value to a Radix UI badge color. */
const availabilityColor = (status?: string): 'green' | 'yellow' | 'red' | 'gray' => {
    switch (status) {
        case 'in_stock': return 'green';
        case 'call_for_availability': return 'yellow';
        case 'out_of_stock': return 'red';
        default: return 'gray';
    }
};

/** Returns a human-readable label for the availability status. */
const availabilityLabel = (status?: string): string => {
    switch (status) {
        case 'in_stock': return 'In Stock';
        case 'call_for_availability': return 'Call for Availability';
        case 'out_of_stock': return 'Out of Stock';
        default: return 'Contact Us';
    }
};

/** Returns a human-readable label for a category value. */
const categoryLabel = (category?: string): string => {
    switch (category) {
        case 'fire_pits': return 'Fire Pits';
        case 'fire_tables': return 'Fire Tables';
        case 'fire_bowls': return 'Fire Bowls';
        case 'burners': return 'Burners & Components';
        case 'accessories': return 'Accessories';
        case 'other': return 'Other';
        default: return category ?? '';
    }
};

interface ProductCardProps {
    /** Display name of the product. */
    name?: string;
    /** Sanity slug used to build the detail page URL. */
    slug?: Slug;
    /** Rich-text description as a Portable Text block array. */
    description?: PortableTextBlock[];
    /** Bullet-point feature list. */
    features?: string[];
    /** Cover image Sanity asset reference. */
    coverImage?: SanityImageSource;
    /** Alt text for the cover image. */
    alt?: string;
    /** CTA button label (e.g. "Contact for Pricing"). */
    ctaText?: string;
    /** Inventory availability status. Controls the badge color and label. */
    availability?: string;
    /** Product category slug (e.g. "fire_pits"). */
    category?: string;
    /** Whether this product is featured (used by parent for layout decisions). */
    isFeatured?: boolean;
}

/**
 * ProductCard component.
 *
 * Renders a clickable card linking to the product detail page.
 * Displays an availability badge and category label alongside
 * the product image, name, description excerpt, and feature list.
 */
const ProductCard = ({
    name,
    slug,
    description,
    coverImage,
    alt,
    features,
    ctaText,
    availability,
    category,
}: ProductCardProps) => {
    const isOutOfStock = availability === 'out_of_stock';

    return (
        <Card className={`relative overflow-hidden group flex flex-col h-full ${isOutOfStock ? 'opacity-80' : ''}`}>
            <Flex direction="column" gap="2" p="4" className="flex-1">
                {/* Cover image */}
                <Box position="relative" className="aspect-16/9 overflow-hidden rounded-md bg-[var(--gray-3)]">
                    <Image
                        alt={alt || ""}
                        src={urlForImage(coverImage) || ""}
                        fill
                        className={`object-cover transition-transform duration-300 ${!isOutOfStock ? 'group-hover:scale-105' : ''} ${isOutOfStock ? 'grayscale' : ''}`}
                    />
                    {isOutOfStock && (
                        <Box className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                            <Text size="3" weight="bold" style={{ color: 'white', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                                Out of Stock
                            </Text>
                        </Box>
                    )}
                </Box>

                <Flex direction="column" gap="2" p="4" className="flex-1">
                    {/* Category label + Featured badge row */}
                    <Flex align="center" gap="2" wrap="wrap">
                        {category && (
                            <Text size="1" color="gray" className="uppercase tracking-wide">
                                {categoryLabel(category)}
                            </Text>
                        )}
                        {/* Availability badge */}
                        {availability && (
                            <Badge color={availabilityColor(availability)} radius="full" size="1">
                                {availabilityLabel(availability)}
                            </Badge>
                        )}
                    </Flex>

                    <Heading size="5">
                        <Link href={`/store/${slug}`} className="before:absolute before:inset-0">
                            {name}
                        </Link>
                    </Heading>

                    <Text as="div" size="2">
                        <PortableText value={description ?? []} />
                    </Text>

                    {/* Feature bullet points (max 4) */}
                    <Flex direction="column">
                        {features?.slice(0, 4).map((feature, idx) => (
                            <Flex key={idx} align="center" gap="2">
                                <Box className="w-1.5 h-1.5 bg-[var(--orange-9)] rounded-full shrink-0" />
                                <Text size="2">{feature}</Text>
                            </Flex>
                        ))}
                    </Flex>
                </Flex>

                {/* CTA button */}
                <Box className="px-4 pb-4">
                    <Button asChild className="relative z-10 w-full cursor-pointer" color={isOutOfStock ? 'gray' : undefined}>
                        <Link href={`/contact`}>
                            {isOutOfStock ? 'Contact to Backorder' : ctaText}
                        </Link>
                    </Button>
                </Box>
            </Flex>
        </Card>
    );
}

export default ProductCard
