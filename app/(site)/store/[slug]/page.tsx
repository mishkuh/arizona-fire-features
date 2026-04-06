import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import {
    Button,
    Box,
    Section,
    Container,
    Flex,
    Heading,
    Text,
    Badge,
    Separator,
} from '@radix-ui/themes';
import { sanityFetch } from '@/components/sanity/live';
import { getProductBySlugQuery } from '@/lib/sanity.queries';
import { urlForImage } from '@/lib/sanity.image';
import { Product } from '@/sanity.types';
import { PortableText } from '@portabletext/react';
import ProductGallery from '@/components/ui/ProductGallery';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Returns a Radix UI badge color based on availability status. */
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

// ─── Shared style tokens ──────────────────────────────────────────────────────

/**
 * Dark pill button matching the reference image's action buttons.
 * Used for Brochures, CAD Files, Specifications, and Contact Us.
 */
const actionBtnStyle: React.CSSProperties = {
    background: 'var(--gray-12)',
    color: 'var(--gray-1)',
    border: 'none',
    borderRadius: '6px',
    padding: '10px 18px',
    fontSize: '0.8rem',
    fontWeight: 700,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '0.02em',
    transition: 'background 0.18s, color 0.18s',
    lineHeight: 1.2,
};

/** Orange underline accent beneath section headings (mirrors the reference). */
const headingAccentStyle: React.CSSProperties = {
    width: '56px',
    height: '4px',
    background: 'var(--orange-9)',
    borderRadius: '2px',
    marginTop: '6px',
    marginBottom: '24px',
};

// ─── Page component ───────────────────────────────────────────────────────────

/**
 * ProductDetail page (server component).
 *
 * Layout (mirrors the Isokern product page reference):
 *  1. Top 2-column section — cover image left, product info + CTA buttons right.
 *  2. Middle section — product features list with gallery thumbnail grid.
 *  3. Bottom section — full product image gallery with lightbox support.
 */
const ProductDetail = async (
    { params }: { params: Promise<{ slug: string }> }
) => {
    /**
     * Temporarily return a 404 while the store is being prepared.
     * Remove this call when the store is ready to launch.
     */
    notFound();

    const { slug } = await params;
    const { data } = await sanityFetch({ query: getProductBySlugQuery, params: { slug } });
    const product = data as Product;

    const coverUrl = urlForImage(product.coverImage);

    /** Gallery images sliced to the first two for the feature-section thumbnails. */
    const featuredThumbs = (product.gallery ?? []).slice(0, 2);

    /**
     * Narrowed alias for availableSizes — resolves the TS "possibly undefined"
     * error that occurs when calling .join() inside JSX conditional expressions.
     */
    const sizes: string[] = product.availableSizes ?? [];

    return (
        <Box>
            {/* ── 1. Hero strip — image LEFT · product info RIGHT ──────────────── */}
            <Section size="3" style={{ paddingTop: '48px', paddingBottom: '40px' }}>
                <Container size="4" px="4">

                    {/* Back link */}
                    <Link
                        href="/store"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: 'var(--gray-11)',
                            fontSize: '0.875rem',
                            textDecoration: 'none',
                            marginBottom: '24px',
                        }}
                    >
                        <ArrowLeft size={16} />
                        Back to Store
                    </Link>

                    {/* 2-up grid */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '48px',
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* ── LEFT: cover image ─────────────────────────────── */}
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '4 / 3',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                background: 'var(--gray-3)',
                            }}
                        >
                            {coverUrl ? (
                                <Image
                                    src={coverUrl}
                                    alt={product.coverImage?.alt || product.name || 'Product image'}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                    style={{ objectFit: 'cover' }}
                                    priority
                                />
                            ) : (
                                /* Placeholder when no cover image is set */
                                <Flex
                                    align="center"
                                    justify="center"
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <Text size="2" color="gray">No image</Text>
                                </Flex>
                            )}
                        </div>

                        {/* ── RIGHT: product info ───────────────────────────── */}
                        <Flex direction="column" gap="4">

                            {/* Product name */}
                            <Heading
                                size="7"
                                style={{ color: 'var(--orange-9)', lineHeight: 1.2 }}
                            >
                                {product.name || 'Product Name'}
                            </Heading>

                            {/* Category sub-label */}
                            {product.category && (
                                <Text size="1" color="gray" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                                    {categoryLabel(product.category)}
                                </Text>
                            )}

                            {/* Description (Portable Text) */}
                            <Text size="2" as="div" style={{ lineHeight: 1.7, color: 'var(--gray-11)' }}>
                                <PortableText value={product.description ?? []} />
                            </Text>

                            {/* Available sizes — shown as "28 • 36 • 42 • 48…" */}
                            {sizes.length > 0 && (
                                <Text size="2" style={{ fontWeight: 600 }}>
                                    <span style={{ color: 'var(--gray-11)' }}>Available Sizes: </span>
                                    {sizes.join(' • ')}
                                </Text>
                            )}

                            {/* Availability badge */}
                            {product.availability && (
                                <Badge
                                    color={availabilityColor(product.availability)}
                                    radius="full"
                                    size="2"
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    {availabilityLabel(product.availability)}
                                </Badge>
                            )}

                            {/* Pricing */}
                            <Text size="2" style={{ fontWeight: 600 }}>
                                {product.price
                                    ? <>Starting at <strong>${product.price?.toLocaleString()}</strong></>
                                    : 'Contact us for pricing'}
                            </Text>

                            {/* SKU */}
                            {product.sku && (
                                <Text size="1" color="gray">SKU: {product.sku}</Text>
                            )}

                            <Separator size="4" my="1" />

                            {/* ── Action buttons ──────────────────────────────── */}
                            <Flex gap="3" wrap="wrap">
                                {/* Brochures — only shown when a file has been uploaded */}
                                {product.brochureUrl && (
                                    <a
                                        href={product.brochureUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={actionBtnStyle}
                                        aria-label="Download product brochure (PDF)"
                                    >
                                        Brochures
                                    </a>
                                )}

                                {/* CAD Files — only shown when a file has been uploaded */}
                                {product.cadUrl && (
                                    <a
                                        href={product.cadUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={actionBtnStyle}
                                        aria-label="Download CAD file"
                                    >
                                        CAD Files
                                    </a>
                                )}

                                {/* Specifications — only shown when a file has been uploaded */}
                                {product.specificationsUrl && (
                                    <a
                                        href={product.specificationsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={actionBtnStyle}
                                        aria-label="Download specifications sheet (PDF)"
                                    >
                                        Specifications
                                    </a>
                                )}

                                {/* Primary CTA */}
                                <Button asChild size="3" variant="solid" color="orange">
                                    <Link href="/contact">
                                        {product.ctaText || 'Contact Us'}
                                    </Link>
                                </Button>
                            </Flex>
                        </Flex>
                    </div>
                </Container>
            </Section>

            {/* ── 2. Features section ───────────────────────────────────────────── */}
            {(product.features?.length || featuredThumbs.length > 0) && (
                <Section
                    size="3"
                    style={{
                        paddingTop: '48px',
                        paddingBottom: '48px',
                        borderTop: '1px solid var(--gray-4)',
                    }}
                >
                    <Container size="4" px="4">
                        {/* Section heading with orange accent underline */}
                        <div>
                            <Heading size="6" style={{ fontWeight: 700 }}>
                                Product Features
                            </Heading>
                            <div style={headingAccentStyle} />
                        </div>

                        {/* 2-column: gallery thumbs LEFT · feature list RIGHT */}
                        <div>
                            {/* Feature bullet list */}
                            {(product.features?.length ?? 0) > 0 && (
                                <Flex direction="column" gap="3">
                                    <ul
                                        style={{
                                            listStyle: 'none',
                                            padding: 0,
                                            margin: 0,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '10px',
                                        }}
                                    >
                                        {(product.features ?? []).map((item, index) => (
                                            <li
                                                key={index}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start',
                                                    gap: '10px',
                                                }}
                                            >
                                                {/* Orange bullet dot */}
                                                <span
                                                    style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: 'var(--orange-9)',
                                                        flexShrink: 0,
                                                        marginTop: '6px',
                                                    }}
                                                />
                                                <Text size="2" style={{ lineHeight: 1.6 }}>{item}</Text>
                                            </li>
                                        ))}
                                    </ul>
                                </Flex>
                            )}
                        </div>
                    </Container>
                </Section>
            )}

            {/* ── 3. Project gallery ────────────────────────────────────────────── */}
            {(product.gallery?.length ?? 0) > 0 && (
                <Section
                    size="3"
                    style={{
                        paddingTop: '48px',
                        paddingBottom: '64px',
                        borderTop: '1px solid var(--gray-4)',
                    }}
                >
                    <Container size="4" px="4">
                        {/* Centered heading with accent underline */}
                        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                            <Heading size="6" style={{ fontWeight: 700 }}>
                                {product.name} Project Gallery
                            </Heading>
                            <div
                                style={{
                                    ...headingAccentStyle,
                                    margin: '8px auto 0',
                                }}
                            />
                        </div>

                        {/* Gallery grid with lightbox */}
                        <ProductGallery images={product.gallery ?? []} />
                    </Container>
                </Section>
            )}
        </Box>
    );
};

export default ProductDetail;
