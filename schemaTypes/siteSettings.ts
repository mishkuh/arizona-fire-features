/**
 * SiteSettings Sanity schema.
 *
 * A singleton document (one per dataset) that holds global site-wide
 * configuration such as the hero cover image shown on the home page.
 *
 * Only a single document of this type should ever be created; the Studio
 * structure can be configured to enforce this, but for now a runtime
 * `*[_type == "siteSettings"][0]` query is used on the front-end.
 */
import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        // ─── Hero Section ──────────────────────────────────────────────────────
        defineField({
            name: 'heroCoverImage',
            title: 'Hero Cover Image',
            type: 'image',
            description:
                'The full-bleed background photo shown in the hero / banner section of the home page.',
            options: { hotspot: true },
            fields: [
                defineField({
                    name: 'alt',
                    title: 'Alternative Text',
                    type: 'string',
                    description:
                        'A short description of the image for screen-readers and SEO (e.g. "Outdoor fireplace at sunset").',
                }),
            ],
        }),
    ],

    /** Studio list preview — shows the hero thumbnail. */
    preview: {
        select: {
            title: 'title',
            media: 'heroCoverImage',
        },
        prepare() {
            return { title: 'Site Settings' }
        },
    },
})
