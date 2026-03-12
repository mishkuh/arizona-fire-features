/**
 * Standalone layout for the invoice payment pages.
 *
 * Intentionally excludes the site Header and Footer — the payment page is a
 * hidden, link-only page and should feel clean and distraction-free. It uses
 * the global dark background from `globals.css` with a minimal branded shell.
 */
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Pay Invoice | Arizona Fire Features',
    description: 'Securely pay your Arizona Fire Features invoice online.',
    /** Prevent search engines from indexing standalone payment pages. */
    robots: { index: false, follow: false },
}

export default function PayLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pay-layout">
            {children}
        </div>
    )
}
