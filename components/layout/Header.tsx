"use client";

/**
 * Header component (client component).
 *
 * Sticky top navigation bar containing:
 * - Brand logo + site name linking to the homepage
 * - Desktop tab navigation (hidden on mobile) with active-state highlight
 * - "Get Started" CTA button (desktop only)
 * - Mobile hamburger menu via a Radix UI DropdownMenu
 *
 * The active route is derived from `usePathname()` so the correct tab is
 * highlighted on every page without any prop drilling.
 */
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { Flex, TabNav, Button, IconButton, Heading, Box, DropdownMenu } from '@radix-ui/themes';
import Image from 'next/image';
import logo from '@/public/images/logo.png';
import { usePathname } from 'next/navigation';

/** Top-level navigation items — order here determines render order. */
const navigation = [
    { href: '/', name: 'Home' },
    { href: '/store', name: 'Store' },
    { href: '/gallery', name: 'Gallery' },
    { href: '/about', name: 'About' },
    { href: '/contact', name: 'Contact' },
];

export default function Header() {
    /** Controls whether the mobile dropdown menu is open. */
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    /** Current pathname used to set the active tab indicator. */
    const pathname = usePathname();

    return (
        <header className="sticky top-0 backdrop-blur-md w-full shadow-sm z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Flex py="2" align="center" justify="between">
                    {/* ── Brand ────────────────────────────────────── */}
                    <Flex asChild align="center">
                        <Link href="/">
                            <Box className="flex-shrink-0 relative w-12 h-12 rounded-full overflow-hidden p-1 mr-3">
                                <Image src={logo}
                                    alt="Arizona Fire Features Logo"
                                    fill
                                    className="object-contain" />
                            </Box>
                            <Heading size={{ initial: "5", sm: "6" }}>Arizona Fire Features</Heading>
                        </Link>
                    </Flex>

                    {/* ── Desktop Navigation (md+) ──────────────────── */}
                    <div className="hidden md:flex md:items-center md:gap-4">
                        <TabNav.Root size="2" color="orange">
                            {navigation.map((item) => (
                                <TabNav.Link key={item.name} asChild active={pathname === item.href}>
                                    <Link href={item.href}>
                                        {item.name}
                                    </Link>
                                </TabNav.Link>
                            ))}
                        </TabNav.Root>

                        <Button asChild size="3" variant="solid" color="orange" className="ml-4 cursor-pointer">
                            <Link href="/contact">Get Started</Link>
                        </Button>
                    </div>

                    {/* ── Mobile Menu (< md) ────────────────────────── */}
                    <div className="md:hidden">
                        <DropdownMenu.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                            <DropdownMenu.Trigger>
                                <IconButton size="3">
                                    <Menu className="h-6 w-6" />
                                </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content>
                                {navigation.map((item) => (
                                    <DropdownMenu.Item asChild key={item.name}>
                                        <Link href={item.href}>
                                            {item.name}
                                        </Link>
                                    </DropdownMenu.Item>
                                ))}
                                <DropdownMenu.Item asChild>
                                    <Link href="/contact">Get Started</Link>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Root>
                    </div>
                </Flex>
            </nav>
        </header>
    );
}
