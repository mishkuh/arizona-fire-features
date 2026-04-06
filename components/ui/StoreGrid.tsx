'use client'

import { useState, useMemo, useEffect } from 'react';
import { Box, Flex, Heading, Text, Button } from '@radix-ui/themes';
import ProductCard from '@/components/ui/ProductCard';
import AnimatedGrid from '@/components/ui/AnimatedGrid';
import { Product } from 'sanity.types';
import Link from 'next/link';

/** All available category filter options. */
const CATEGORY_FILTERS = [
    { label: 'All', value: 'all' },
    { label: 'Fire Pits', value: 'fire_pits' },
    { label: 'Fire Tables', value: 'fire_tables' },
    { label: 'Fire Bowls', value: 'fire_bowls' },
    { label: 'Burners & Components', value: 'burners' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Other', value: 'other' },
] as const;

const ITEMS_PER_PAGE = 12;

interface StoreGridProps {
    /** The full list of products to display. */
    products: Product[];
}

/**
 * StoreGrid (client component).
 *
 * Renders the category filter tabs and the filtered/animated product grid.
 * Separated from the parent server component so the filter state stays
 * client-side while the data fetch stays on the server.
 */
const StoreGrid = ({ products }: StoreGridProps) => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Reset to the first page when the active category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    /** Filtered product list — memoized to avoid recomputing on every render. */
    const filtered = useMemo(() => {
        if (activeCategory === 'all') return products;
        return products.filter((p) => p.category === activeCategory);
    }, [products, activeCategory]);

    /** Total number of pages for the current category */
    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

    /** The slice of products to show on the current page */
    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filtered, currentPage]);

    return (
        <Flex direction="column" gap="6">
            {/* Category filter tabs */}
            <Flex gap="2" wrap="wrap" justify="center">
                {CATEGORY_FILTERS.map((filter) => (
                    <Button
                        key={filter.value}
                        variant={activeCategory === filter.value ? 'solid' : 'outline'}
                        color="orange"
                        size="2"
                        onClick={() => setActiveCategory(filter.value)}
                    >
                        {filter.label}
                    </Button>
                ))}
            </Flex>

            {/* Product count */}
            <Text size="2" color="gray" align="center">
                {filtered.length === 0
                    ? 'No products found in this category.'
                    : `Showing ${paginatedProducts.length} of ${filtered.length} product${filtered.length === 1 ? '' : 's'}`}
            </Text>

            {/* Product grid */}
            {paginatedProducts.length > 0 && (
                <AnimatedGrid>
                    {paginatedProducts.map((product: Product) => (
                        <ProductCard
                            key={product._id}
                            name={product.name}
                            slug={product.slug}
                            description={product.description}
                            features={product.features}
                            coverImage={product.coverImage}
                            alt={product.coverImage?.alt}
                            ctaText="Contact for Pricing"
                            availability={product.availability}
                            category={product.category}
                            isFeatured={product.isFeatured}
                        />
                    ))}
                </AnimatedGrid>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Flex gap="4" justify="center" align="center" mt="4">
                    <Button
                        variant="soft"
                        color="gray"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    >
                        Previous
                    </Button>
                    <Text size="2" color="gray">
                        Page {currentPage} of {totalPages}
                    </Text>
                    <Button
                        variant="soft"
                        color="gray"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    >
                        Next
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};

export default StoreGrid;
