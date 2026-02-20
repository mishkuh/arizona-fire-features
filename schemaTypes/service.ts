import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
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
        defineField({
            name: 'description',
            title: 'Short Description',
            type: 'text' as const,
            rows: 3,
        }),
        defineField({
            name: 'detailedDescription',
            title: 'Detailed Description',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'block' })],
        }),
        defineField({
            name: 'features',
            title: 'Feature List',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
            name: 'benefits',
            title: 'Benefit List',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
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
        defineField({
            name: 'pricing',
            title: 'Pricing',
            type: 'string',
        }),
        defineField({
            name: 'timeline',
            title: 'Timeline',
            type: 'string',
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
    ],
})
