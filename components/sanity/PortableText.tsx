/**
 * PortableText renderer.
 *
 * Wraps the `@portabletext/react` component with a bespoke set of
 * block-level, list, mark, and link components that are styled to match the
 * site's design system (Radix UI colors, orange accent, relaxed line heights).
 *
 * External links automatically receive `target="_blank" rel="noopener noreferrer"`.
 *
 * @example
 * <PortableText value={service.detailedDescription} className="prose" />
 */
import { PortableText as PortableTextComponent, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'

/** Custom renderers for every Portable Text node type used across the site. */
const components: PortableTextComponents = {
    block: {
        normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
        h1: ({ children }) => <h1 className="text-4xl font-bold mb-4">{children}</h1>,
        h2: ({ children }) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
        h3: ({ children }) => <h3 className="text-2xl font-semibold mb-3">{children}</h3>,
        h4: ({ children }) => <h4 className="text-xl font-semibold mb-2">{children}</h4>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[var(--orange-9)] pl-4 italic my-4 text-[var(--gray-11)]">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc list-outside ml-6 mb-4 space-y-1">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal list-outside ml-6 mb-4 space-y-1">{children}</ol>,
    },
    listItem: {
        bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
        number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    },
    marks: {
        strong: ({ children }) => <strong className="font-bold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        code: ({ children }) => (
            <code className="bg-[var(--gray-3)] rounded px-1 py-0.5 font-mono text-sm">{children}</code>
        ),
        link: ({ children, value }) => {
            const href: string = value?.href ?? '#'
            const isExternal = href.startsWith('http')
            return (
                <a
                    href={href}
                    className="text-[var(--orange-9)] underline underline-offset-2 hover:opacity-80 transition-opacity"
                    /** Open external links in a new tab with safe rel attributes. */
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                    {children}
                </a>
            )
        },
    },
}

interface PortableTextProps {
    /** The array of Portable Text blocks from the Sanity document. */
    value: PortableTextBlock[] | undefined | null
    /** Optional CSS class applied to the wrapper div. */
    className?: string
}

/**
 * PortableText component.
 *
 * Renders a Sanity Portable Text block array using the site-specific
 * component map defined above. Returns `null` when `value` is falsy.
 *
 * @param value - Portable Text block array from a Sanity document field.
 * @param className - Optional wrapper CSS class.
 */
export function PortableText({ value, className }: PortableTextProps) {
    if (!value) return null
    return (
        <div className={className}>
            <PortableTextComponent value={value} components={components} />
        </div>
    )
}
