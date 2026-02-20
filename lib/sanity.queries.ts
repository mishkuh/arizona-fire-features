import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    footer,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

// Services
export const getAllServicesQuery = groq`
  *[_type == "service"] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description,
    coverImage,
  }
`
// TODO: Add featured services
// *[_type == "service" && _id in ['', '1234', 'abcd']] {
export const getFeaturedServicesQuery = groq`
  *[_type == "service" && title in ["Another Service", "Service Title", "Demo service"]] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description,
    coverImage,
  }
`

export const getServiceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description,
    detailedDescription,
    features,
    benefits,
    process,
    pricing,
    timeline,
    coverImage,
    gallery,
  }
`

// Portfolio Projects
export const getAllPortfolioProjectsQuery = groq`
  *[_type == "portfolioProject"] | order(date desc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description,
    coverImage,
    tags,
    date,
  }
`

export const getPortfolioProjectBySlugQuery = groq`
  *[_type == "portfolioProject" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    client,
    location,
    date,
    tags,
    description,
    detailedDescription,
    challenge,
    solution,
    features,
    coverImage,
    gallery,
  }
`

// Products
export const getAllProductsQuery = groq`
  *[_type == "product"] | order(title asc) {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description, // Note: description is a block array in the product schema, might want to just fetch it all or project a summary
    coverImage,
  }
`

export const getProductBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description,
    features,
    coverImage,
    gallery,
    ctaText,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
