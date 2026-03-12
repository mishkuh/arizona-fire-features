/**
 * Service Sanity schema.
 *
 * Each document describes a service offered by Arizona Fire Features
 * (e.g. Fire Pit Installation, Outdoor Kitchen Design). Services are linked
 * from the navigation, the home page, and the footer.
 */
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        // ─── Core Info ────────────────────────────────────────────────────────
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            /** Displayed as a sub-heading beneath the title on the detail page. */
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),

        // ─── Descriptions ─────────────────────────────────────────────────────
        defineField({
            /** One- to two-sentence summary shown on listing cards. */
            name: 'description',
            title: 'Short Description',
            type: 'text' as const,
            rows: 3,
        }),
        defineField({
            /** Full rich-text body displayed on the service detail page. */
            name: 'detailedDescription',
            title: 'Detailed Description',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'block' })],
        }),

        // ─── Selling Points ───────────────────────────────────────────────────
        defineField({
            /** Bullet points highlighting what is included in this service. */
            name: 'features',
            title: 'Feature List',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
            /** Bullet points focusing on customer outcomes / value proposition. */
            name: 'benefits',
            title: 'Benefit List',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),

        // ─── Process Steps ────────────────────────────────────────────────────
        defineField({
            /**
             * Ordered list of process steps (e.g. Consultation → Design → Install).
             * Each step has a title and a plain-text description.
             */
            name: 'process',
            title: 'Process',
            type: 'array' as const,
            of: [
                defineArrayMember({
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Title', type: 'string' }),
                        defineField({ name: 'description', title: 'Description', type: 'text' }),
                    ],
                }),
            ],
        }),

        // ─── Pricing & Timeline ───────────────────────────────────────────────
        defineField({
            /** Plaintext pricing info (e.g. "Starting at $3,500"). */
            name: 'pricing',
            title: 'Pricing',
            type: 'string',
        }),
        defineField({
            /** Estimated project duration (e.g. "1–3 days"). */
            name: 'timeline',
            title: 'Timeline',
            type: 'string',
        }),

        // ─── Media ────────────────────────────────────────────────────────────
        defineField({
            /** Primary image shown on listing cards and the detail page hero. */
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
            /** Additional project photos displayed in the detail page gallery. */
            name: 'gallery',
            title: 'Image Gallery',
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
    ],
})
