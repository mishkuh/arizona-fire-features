import { readToken } from 'lib/sanity.api'
import { getClient } from 'lib/sanity.client'
import { groq } from 'next-sanity'
import { GetStaticProps, GetStaticPaths } from 'next'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

interface Page {
  _id: string
  title: string
  body: any[]
}

interface PageProps {
  page: Page
  draftMode: boolean
}

export default function Page(props: PageProps) {
  const { page } = props

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-bold mb-6">{page.title}</h1>
      {page.body && (
        <div className="prose">
          <PortableText value={page.body} />
        </div>
      )}
    </div>
  )
}

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    body
  }
`

export const getStaticProps: GetStaticProps<PageProps> = async (ctx) => {
  const { params, draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const page = await client.fetch<Page>(pageQuery, {
    slug: params?.slug,
  })

  // If no page found, return notFound: true
  if (!page) {
    return { notFound: true }
  }

  return {
    props: {
      page,
      draftMode,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const paths = await client.fetch<string[]>(
    groq`*[_type == "page" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}
