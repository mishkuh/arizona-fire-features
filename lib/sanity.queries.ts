/**
 * GROQ query definitions.
 *
 * Centralises all Sanity GROQ queries used by the application.
 * Queries are tagged with `groq` so that the Sanity VS Code extension
 * provides syntax highlighting and type generation.
 *
 * Query naming convention:
 *  - `get<All | Featured | Single>XQuery` — typed GROQ string constants
 */
import { groq } from 'next-sanity'

// ─── Legacy / CMS Page Queries ───────────────────────────────────────────────

/** Fetches the singleton home document with showcase project references. */
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

/** Fetches a single generic page document by its slug. */
export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

/** Fetches a single legacy `project` document by slug. */
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

// ─── Services ─────────────────────────────────────────────────────────────────

/**
 * Fetches all service documents with fields needed for listing cards.
 * Used in the footer and services overview page.
 */
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
/** Fetches "featured" services for footer and homepage — currently returns all services. */
export const getFeaturedServicesQuery = groq`
  *[_type == "service"] {
    _id,
    title,
    subtitle,
    "slug": slug.current,
    description,
    coverImage,
  }
`

/** Fetches the full detail view for a single service by slug. */
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

// ─── Portfolio Projects ───────────────────────────────────────────────────────

/**
 * Fetches all portfolio projects ordered by date (newest first).
 * Returns only the fields needed for listing cards — no heavy body content.
 */
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

/** Fetches the full detail view for a single portfolio project by slug. */
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

// ─── Products ────────────────────────────────────────────────────────────────

/**
 * Fetches all products for the store listing.
 * Featured products are ordered first, then alphabetically by name.
 */
export const getAllProductsQuery = groq`
  *[_type == "product"] | order(isFeatured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    features,
    coverImage,
    category,
    sku,
    price,
    availability,
    isFeatured,
  }
`

/**
 * Fetches only featured products, ordered by name.
 * Useful for homepage or hero sections.
 */
export const getFeaturedProductsQuery = groq`
  *[_type == "product" && isFeatured == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    description,
    features,
    coverImage,
    category,
    price,
    availability,
  }
`

/**
 * Fetches a single product by its slug for the detail page.
 * Includes all inventory fields such as `stockCount` and `sku`.
 */
export const getProductBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    description,
    features,
    coverImage,
    gallery,
    availableSizes,
    "brochureUrl": brochureFile.asset->url,
    "cadUrl": cadFile.asset->url,
    "specificationsUrl": specificationsFile.asset->url,
    ctaText,
    category,
    sku,
    price,
    availability,
    stockCount,
    isFeatured,
  }
`

// ─── Settings ─────────────────────────────────────────────────────────────────

/** Fetches the global site settings document including footer text and nav menu items. */
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

// ─── Gallery ──────────────────────────────────────────────────────────────────

/**
 * Fetches all gallery images ordered by date (newest first),
 * falling back to creation date when no date is set.
 */
export const getAllGalleryImagesQuery = groq`
  *[_type == "gallery"] {
    _id,
    title,
    images[]{
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions
        }
      },
      hotspot
    }
  }
`

// ─── Site Settings ────────────────────────────────────────────────────────────

/**
 * Fetches the singleton siteSettings document.
 * Includes the hero cover image used on the home page as a full-bleed
 * background, with its resolved asset URL, blur hash for placeholder
 * rendering, and custom alt text.
 */
export const getSiteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroCoverImage {
      asset-> {
        url,
        metadata {
          lqip,
          dimensions,
        },
      },
      alt,
      hotspot,
      crop,
    },
    heroCoverImageBlurUrl,
  }
`
