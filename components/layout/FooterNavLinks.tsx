"use client";

/**
 * FooterNavLinks component (client component).
 *
 * Renders the "Quick Links" column inside the footer. Kept as a separate
 * client component so `usePathname()` can highlight the currently-active
 * page without forcing the entire footer to become a client boundary.
 * Visual features:
 * - Horizontal divider between each item (matching the reference design)
 * - `>` chevron prefix on the active link, highlighted in orange
 * - Smooth colour transition on hover
 */

import { Flex, Separator, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navigation items shown in the Quick Links footer column.
 * @remarks Gallery is temporarily disabled until content is ready.
 */
const NAV_ITEMS = [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/terms', label: 'Terms & Conditions' },
] as const;

export default function FooterNavLinks() {
    /** Current pathname — used to determine which link is active. */
    const pathname = usePathname();

    return (
        <Flex direction="column" align={{ initial: 'center', sm: 'start' }} width="100%">
            {NAV_ITEMS.map(({ href, label }, index) => (
                <Flex direction="column" width="100%" align={{ initial: 'center', sm: 'start' }} key={href}>
                    {index > 0 && <Separator size="4" color="gray" />}
                    <Text className="w-full py-2 text-[var(--gray-10)] hover:text-[var(--orange-9)] transition-colors duration-200">
                        <Link href={href}>
                            {pathname === href &&
                                <Text> &gt; </Text>
                            }
                            {label}
                        </Link>
                    </Text>
                </Flex>
            ))}
        </Flex>
    );
}

