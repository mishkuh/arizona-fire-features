import type { PortableTextBlock } from 'sanity'

export interface PagePayload {
  _id: string
  body?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  title?: string
  slug?: { current: string }
}
