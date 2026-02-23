import "@radix-ui/themes/styles.css";
import './globals.css'
import type { Metadata } from 'next'
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/sanity/DisableDraftMode";
import { SanityLive } from "@/components/sanity/live";


export const metadata: Metadata = {
  metadataBase: new URL('https://arizonafirefeatures.com'),

  // ─── Core ───────────────────────────────────────────────────────────────────
  title: {
    default: 'Arizona Fire Features',
    template: '%s | Arizona Fire Features',
  },
  description:
    'Arizona Fire Features is a family-owned business based in Phoenix, Arizona, specializing in Isokern Fireplaces. Services include consultation, installation, repair and maintenance. Custom fire features for residential properties. With over 20 years of experience, we create unique, handcrafted fire pits, fire tables, and outdoor fireplaces that transform outdoor spaces into stunning gathering areas. Our products are made from durable materials like corten steel, stainless steel, and natural stone, ensuring long-lasting beauty and performance. We serve the entire Phoenix metropolitan area, including Scottsdale, Paradise Valley, Gilbert, Chandler, and Tempe. Contact us today for a free consultation and let us help you create the perfect fire feature for your home or business.',
  keywords: [
    'Arizona Fire Features',
    'Isokern Fireplaces',
    'Fire Features',
    'Custom Fire Features',
    'Outdoor Fire Features',
    'Fire Pits',
    'Fire Tables',
    'Outdoor Fireplaces',
    'Corten Steel',
    'Stainless Steel',
    'Natural Stone',
    'Phoenix Fire Features',
    'Scottsdale Fire Features',
    'Paradise Valley Fire Features',
    'Gilbert Fire Features',
    'Chandler Fire Features',
    'Tempe Fire Features',
  ],
  authors: [{ name: 'Arizona Fire Features', url: 'https://arizonafirefeatures.com' }],
  creator: 'Arizona Fire Features',
  publisher: 'Arizona Fire Features',

  // ─── Canonical & Alternates ─────────────────────────────────────────────────
  alternates: {
    canonical: '/',
  },

  // ─── Robots ─────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ─── Open Graph ─────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arizonafirefeatures.com',
    siteName: 'Arizona Fire Features',
    title: 'Arizona Fire Features | Custom Fire Pits, Tables & Fireplaces',
    description:
      'Family-owned in Phoenix, AZ. We design, fabricate, and install handcrafted fire pits, fire tables, and outdoor fireplaces for the Phoenix metro area. 20+ years of experience.',
  },

  // ─── Icons ──────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/images/logo.png' }
    ]
  },

  // ─── PWA / Browser ──────────────────────────────────────────────────────────
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Arizona Fire Features',
  },

  // ─── Category ───────────────────────────────────────────────────────────────
  category: 'Home & Garden',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <VisualEditing />
            <DisableDraftMode />
          </>
        )}
      </body>
    </html>
  );
}
