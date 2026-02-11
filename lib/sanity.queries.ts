import { groq } from 'next-sanity'

export const indexQuery = groq`
  *[_type == "page"] | order(title asc) {
    _id,
    title,
    slug,
    overview,
  }
`
