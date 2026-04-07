/**
 * Gallery Sanity schema.
 *
 * Represents a named gallery collection that holds an ordered array of images.
 * Images can be reordered via drag-and-drop in the Studio.
 */
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'galleryImages',
    title: 'Gallery Images',
    type: 'document',
    fields: [
        // ─── Identity ─────────────────────────────────────────────────────────
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            /** Human-readable label shown in the Studio list preview. */
            validation: (rule) => rule.required(),
        }),

        // ─── Images array ─────────────────────────────────────────────────────
        defineField({
            name: 'images',
            title: 'Images',
            type: 'array',
            description: 'Add and reorder photos using drag-and-drop in the Studio.',
            of: [
                defineArrayMember({
                    /** Plain image with hotspot support — no extra metadata. */
                    type: 'image',
                    options: { hotspot: true },
                }),
            ],
        }),
    ],

    /** Studio list preview: shows the gallery title and a thumbnail of the first image. */
    preview: {
        select: {
            title: 'title',
            media: 'images.0',
        },
    },
})

