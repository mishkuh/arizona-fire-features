import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
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
        defineField({
            name: 'ctaText',
            title: 'CTA Text',
            type: 'string',
            description: 'Text for the call to action button (e.g., "Contact for Pricing")',
            initialValue: 'Contact for Pricing',
        }),
    ],
})
