/**
 * GalleryImage Sanity schema.
 *
 * Each document represents a single photograph shown in the public gallery
 * at `/gallery`. Documents are ordered by `date` descending (newest first),
 * falling back to creation timestamp when no date is provided.
 */
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'galleryImage',
    title: 'Gallery Image',
    type: 'document',
    fields: [
        // ─── Required fields ──────────────────────────────────────────────────
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            /** Short title used as an accessible label and in the Studio list preview. */
            validation: (rule) => rule.required(),
        }),

        // ─── Optional metadata ────────────────────────────────────────────────
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'text',
            rows: 2,
            description: 'Short description shown in the image overlay',
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact / Attribution',
            type: 'string',
            description: 'Optional contact or attribution line, e.g. "Phoenix, AZ · (480) 555-0100"',
        }),

        // ─── Image asset ──────────────────────────────────────────────────────
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (rule) => rule.required(),
            fields: [
                defineField({
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative text',
                    description: 'Brief description of the image for accessibility',
                }),
            ],
        }),

        // ─── Taxonomy & ordering ──────────────────────────────────────────────
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
            description: 'Used for ordering (most recent first)',
        }),
    ],
    /** Studio list preview: shows title, thumbnail, and caption. */
    preview: {
        select: {
            title: 'title',
            media: 'image',
            subtitle: 'caption',
        },
    },
})
