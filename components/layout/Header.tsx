"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { Flex, TabNav, Button, IconButton, Heading, Box, DropdownMenu, AspectRatio } from '@radix-ui/themes';
import Image from 'next/image';
import logo from '@/public/images/logo.png';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navigation = [
        { href: '/', name: 'Home' },
        { href: '/services', name: 'Services' },
        { href: '/store', name: 'Store' },
        { href: '/about', name: 'About' },
        { href: '/contact', name: 'Contact' }
    ];

    return (
        <header className="sticky top-0 backdrop-blur-md w-full shadow-sm z-50">
            <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-24 items-center justify-between">
                    {/* Logo */}
                    <Flex align="center">
                        <Box width="50px" height="50px" className="rounded-full overflow-hidden bg-white p-1 mr-3">
                            <Flex align="center" asChild direction="column" gap="2">
                                <Link href="/">
                                    <AspectRatio ratio={1 / 1}>
                                        <Image src={logo} alt="Arizona Fire Features Logo" fill className="object-contain" />
                                    </AspectRatio>
                                </Link>
                            </Flex>
                        </Box>
                        <Heading size="7">Arizona Fire Features</Heading>
                    </Flex>

                    {/* Desktop Navigation */}
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

                    {/* Mobile menu button */}
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
                </div>
            </nav>
        </header>
    );
}
