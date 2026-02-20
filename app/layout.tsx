import "@radix-ui/themes/styles.css";
import './globals.css'
import type { Metadata } from 'next'
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import { DisableDraftMode } from "@/components/sanity/DisableDraftMode";
import { SanityLive } from "@/components/sanity/live";


export const metadata: Metadata = {
  title: {
    default: 'Arizona Fire Features',
    template: '%s | Arizona Fire Features'
  },
  description: 'Arizona Fire Features is a family-owned business based in Mesa, Arizona, specializing in the design, fabrication, and installation of high-quality custom fire features for residential properties. With over 20 years of experience, we create unique, handcrafted fire pits, fire tables, and outdoor fireplaces that transform outdoor spaces into stunning gathering areas. Our products are made from durable materials like corten steel, stainless steel, and natural stone, ensuring long-lasting beauty and performance. We serve the entire Phoenix metropolitan area, including Scottsdale, Paradise Valley, Gilbert, Chandler, and Tempe. Contact us today for a free consultation and let us help you create the perfect fire feature for your home or business.',
  metadataBase: new URL('https://arizonafirefeatures.com'),
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
