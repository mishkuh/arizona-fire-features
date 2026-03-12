/**
 * PortfolioProject Sanity schema.
 *
 * Each document represents a completed real-world project shown in the
 * portfolio section. Projects can optionally link to a service and include
 * before/after photography, client information, and a challenge/solution narrative.
 *
 * Ordering in queries uses the `date` field (newest first).
 */
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'portfolioProject',
    title: 'Portfolio Project',
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
            /** Secondary line shown beneath the title on listing cards. */
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

        // ─── Client & Location ────────────────────────────────────────────────
        defineField({
            /** Name of the client (can be anonymised, e.g. "Scottsdale Homeowner"). */
            name: 'client',
            title: 'Client',
            type: 'string',
        }),
        defineField({
            /** City/neighborhood displayed alongside the project headline. */
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            /** Completion date — used for sorting and display. */
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            /** Taxonomy tags for filtering (e.g. "fire pit", "outdoor kitchen"). */
            name: 'tags',
            title: 'Tags',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),

        // ─── Descriptions ─────────────────────────────────────────────────────
        defineField({
            /** One- to two-sentence blurb shown on listing cards. */
            name: 'description',
            title: 'Short Description',
            type: 'text' as const,
            rows: 3,
        }),
        defineField({
            /** Rich-text body displayed on the project detail page. */
            name: 'detailedDescription',
            title: 'Detailed Description',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'block' })],
        }),
        defineField({
            /** Plaintext description of the problem or design challenge faced. */
            name: 'challenge',
            title: 'Challenge',
            type: 'text' as const,
            rows: 3,
        }),
        defineField({
            /** Plaintext description of how the challenge was resolved. */
            name: 'solution',
            title: 'Solution',
            type: 'text' as const,
            rows: 3,
        }),
        defineField({
            /** Bullet-point highlights of deliverables or notable features. */
            name: 'features',
            title: 'Feature List',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),

        // ─── Media ────────────────────────────────────────────────────────────
        defineField({
            /** Hero image shown on listing cards and the detail page header. */
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
            /** Additional project photos in the detail page gallery. */
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
