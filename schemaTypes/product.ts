import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Product schema for the inventory management system.
 *
 * Products are displayed on the /store page. Customers call to place orders —
 * there is no checkout flow. Fields like `stockCount` are internal only and
 * are not surfaced to the public-facing site.
 *
 * Layout sections surfaced on the product detail page:
 *  1. Top    — cover image + name / description / sizes / CTA buttons
 *  2. Middle — features list alongside first two gallery thumbnails
 *  3. Bottom — full image gallery with lightbox
 */
export default defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        // ─── Core Product Info ────────────────────────────────────────────────
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'block' })],
        }),
        defineField({
            name: 'features',
            title: 'Features',
            description: 'Bullet-point feature list shown in the middle section of the product page.',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image' as const,
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                }),
            ],
        }),
        defineField({
            name: 'gallery',
            title: 'Image Gallery',
            description: 'Additional product images. The first two are also shown in the Features section.',
            type: 'array' as const,
            of: [
                defineArrayMember({
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            type: 'string',
                            title: 'Alternative text',
                        }),
                    ],
                }),
            ],
        }),

        // ─── Product Specs & Available Sizes ──────────────────────────────────
        defineField({
            name: 'availableSizes',
            title: 'Available Sizes',
            description: 'List of available sizes (e.g. 28, 36, 42, 48, 60, 72). Displayed inline on the product page as "28 • 36 • 42…".',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),

        // ─── Downloadable Documents ───────────────────────────────────────────
        defineField({
            name: 'brochureFile',
            title: 'Brochure (PDF)',
            description: 'Product brochure PDF. Powers the "Brochures" button on the product page.',
            type: 'file' as const,
            options: { accept: '.pdf' },
        }),
        defineField({
            name: 'cadFile',
            title: 'CAD File',
            description: 'CAD drawing file (PDF or DWG). Powers the "CAD Files" button on the product page.',
            type: 'file' as const,
            options: { accept: '.pdf,.dwg,.dxf' },
        }),
        defineField({
            name: 'specificationsFile',
            title: 'Specifications Sheet (PDF)',
            description: 'Product specifications PDF. Powers the "Specifications" button on the product page.',
            type: 'file' as const,
            options: { accept: '.pdf' },
        }),

        // ─── CTA ─────────────────────────────────────────────────────────────
        defineField({
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
            description: 'Text for the primary call to action button (e.g., "Contact for Pricing")',
            initialValue: 'Contact for Pricing',
        }),

        // ─── Inventory Fields ─────────────────────────────────────────────────
        defineField({
            name: 'isFeatured',
            title: 'Featured Product',
            type: 'boolean',
            description: 'Featured products are pinned to the top of the store listing.',
            initialValue: false,
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            description: 'Product category used for filtering in the store.',
            options: {
                list: [
                    { title: 'Fire Pits', value: 'fire_pits' },
                    { title: 'Fire Tables', value: 'fire_tables' },
                    { title: 'Fire Bowls', value: 'fire_bowls' },
                    { title: 'Burners & Components', value: 'burners' },
                    { title: 'Accessories', value: 'accessories' },
                    { title: 'Other', value: 'other' },
                ],
            },
        }),
        defineField({
            name: 'sku',
            title: 'SKU',
            type: 'string',
            description: 'Internal stock-keeping unit identifier (e.g. AFF-FP-001).',
        }),
        defineField({
            name: 'price',
            title: 'Price (USD)',
            type: 'number',
            description: 'Starting price in USD. Leave blank to show "Contact for Pricing" instead.',
            validation: (rule) => rule.min(0),
        }),
        defineField({
            name: 'availability',
            title: 'Availability',
            type: 'string',
            description: 'Current availability status displayed to customers.',
            options: {
                list: [
                    { title: '✅ In Stock', value: 'in_stock' },
                    { title: '📞 Call for Availability', value: 'call_for_availability' },
                    { title: '❌ Out of Stock', value: 'out_of_stock' },
                ],
                layout: 'radio',
            },
            initialValue: 'call_for_availability',
        }),
        defineField({
            name: 'stockCount',
            title: 'Stock Count (Internal)',
            type: 'number',
            description: 'Internal inventory count. Not displayed to customers on the site.',
            validation: (rule) => rule.min(0).integer(),
        }),
    ],
})
