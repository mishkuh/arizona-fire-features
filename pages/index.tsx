import { indexQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import Link from 'next/link'

interface Page {
  _id: string
  title: string
  slug: { current: string }
  overview: any[]
}

interface PageProps {
  pages: Page[]
  draftMode: boolean
}

export default function IndexPage(props: PageProps) {
  const { pages, draftMode } = props

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Arizona Fire Features</h1>
      <p className="mb-8">Project reset to basics.</p>

      <h2 className="text-xl font-semibold mb-2">Pages</h2>
      {pages && pages.length > 0 ? (
        <ul className="list-disc pl-5">
          {pages.map((page) => (
            <li key={page._id}>
              {page.slug?.current ? (
                <Link href={`/${page.slug.current}`} className="text-blue-600 hover:underline">
                  {page.title}
                </Link>
              ) : (
                <span>{page.title}</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No pages found.</p>
      )}

      {draftMode && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 p-2 rounded border border-yellow-300">
          Draft Mode Active
        </div>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const pages = await client.fetch<Page[]>(indexQuery)

  return {
    props: {
      pages,
      draftMode,
    },
  }
}
