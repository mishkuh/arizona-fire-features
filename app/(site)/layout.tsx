import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Theme } from '@radix-ui/themes'
import { draftMode } from 'next/headers'
import { VisualEditing } from "next-sanity/visual-editing";

export default async function SiteLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { isEnabled } = await draftMode()
    return (
        <>
            <div className="flex min-h-screen flex-col">
                <Theme
                    accentColor="orange"
                    grayColor="gray"
                    panelBackground="translucent"
                    scaling="100%"
                    appearance="dark"
                >
                    <Header />
                    <main className="flex-1">
                        {children}
                    </main>
                    <Footer />
                </Theme>
            </div>
            {isEnabled && (
                <>
                    <VisualEditing />
                    <div className="fixed bottom-4 right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg">
                        Draft Mode Enabled
                    </div>
                </>
            )}
        </>
    )
}