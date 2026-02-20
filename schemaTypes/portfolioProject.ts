import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
    name: 'portfolioProject',
    title: 'Portfolio Project',
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
            name: 'client',
            title: 'Client',
            type: 'string',
        }),
        defineField({
            name: 'location',
            title: 'Location',
            type: 'string',
        }),
        defineField({
            name: 'date',
            title: 'Date',
            type: 'date',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array' as const,
            of: [defineArrayMember({ type: 'string' })],
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
            name: 'challenge',
            title: 'Challenge',
            type: 'text' as const,
            rows: 3,
        }),
        defineField({
            name: 'solution',
            title: 'Solution',
            type: 'text' as const,
            rows: 3,
        }),
        defineField({
            name: 'features',
            title: 'Feature List',
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
    ],
})
