"use client";

/**
 * FooterNavLinks component (client component).
 *
 * Renders the "Quick Links" column inside the footer. Kept as a separate
 * client component so `usePathname()` can highlight the currently-active
 * page without forcing the entire footer to become a client boundary.
 *
 * Visual features:
 * - Horizontal divider between each item (matching the reference design)
 * - `>` chevron prefix on the active link, highlighted in orange
 * - Smooth colour transition on hover
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navigation items shown in the Quick Links footer column.
 * @remarks Gallery is temporarily disabled until content is ready.
 */
const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/terms', label: 'Terms & Conditions' },
] as const;

export default function FooterNavLinks() {
    /** Current pathname — used to determine which link is active. */
    const pathname = usePathname();

    return (
        <ul className="w-full list-none p-0 m-0">
            {NAV_ITEMS.map(({ href, label }, index) => {
                const isActive = pathname === href;

                return (
                    <li key={href}>
                        {/* Divider above every item except the first */}
                        {index > 0 && (
                            <hr className="border-[var(--gray-5)] my-0" />
                        )}

                        <Link
                            href={href}
                            className={[
                                'flex items-center gap-1 py-2 transition-colors duration-200',
                                isActive
                                    ? 'text-[var(--orange-9)] font-semibold'
                                    : 'text-[var(--gray-10)] hover:text-[var(--orange-9)]',
                            ].join(' ')}
                        >
                            {/* Chevron — visible on active link, invisible (but space-preserving) otherwise */}
                            <span
                                aria-hidden="true"
                                className={[
                                    'text-xs leading-none transition-opacity duration-200',
                                    isActive ? 'opacity-100' : 'opacity-0',
                                ].join(' ')}
                            >
                                &gt;
                            </span>
                            {label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
