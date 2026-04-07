# Arizona Fire Features — Website

Business website for **Arizona Fire Features**, a family-owned fire feature installation company based in Phoenix, AZ. Built with Next.js 16, Sanity CMS, Tailwind CSS v4, and Radix UI.

🌐 **Live site:** [arizonafirefeatures.com](https://arizonafirefeatures.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| CMS | [Sanity v3](https://www.sanity.io/) with Live Preview |
| Styling | Tailwind CSS v4 + [Radix UI Themes](https://www.radix-ui.com/themes) (dark, orange accent) |
| Animations | [Framer Motion](https://www.framer.com/motion/) / `motion/react-client` |
| Email | [Resend](https://resend.com/) via React Email |
| Payments | [Stripe](https://stripe.com) (Payment Intents + Webhooks) |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | Vercel (primary), Netlify config included |
| Package Manager | pnpm |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser / Client                        │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  ┌────────────┐   │
│  │  Header  │  │  Pages   │  │  Components  │  │   Footer   │   │
│  │(client)  │  │(RSC/SSR) │  │ (Radix UI,   │  │(async RSC) │   │
│  └──────────┘  └────┬─────┘  │  Framer      │  └────┬───────┘   │
│                     │        │  Motion)     │       │           │
└─────────────────────┼────────┴──────────────┴───────┼───────────┘
                      │                               │
         ┌────────────▼───────────────────────────────▼───────────┐
         │                  Next.js App Router (Server)           │
         │                                                        │
         │   app/                                                 │
         │   ├── layout.tsx          ← Root (metadata, SanityLive)│
         │   ├── actions.ts          ← Server Actions             │
         │   └── (site)/                                          │
         │       ├── layout.tsx      ← Site shell (Header/Footer) │
         │       ├── page.tsx        ← Home                       │
         │       ├── about/          ← About                      │
         │       ├── services/       ← Services (+ [slug])        │
         │       ├── store/          ← Store (+ [slug])           │
         │       ├── contact/        ← Contact form               │
         │       ├── gallery/        ← (Under construction)       │
         │       └── terms/          ← Terms & Conditions         │
         │                                                        │
         │   app/studio/             ← Embedded Sanity Studio     │
         │   app/api/                ← API routes                 │
         └────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────▼──────────────┐      ┌───────────────────┐
        │       Sanity CMS           │      │      Resend       │
        │                            │      │   (Email API)     │
        │  Schemas:                  │      │                   │
        │  • service                 │      │  /app/actions.ts  │
        │  • product                 │      │  sendEmail()      │
        │  • portfolioProject        │      │  → InquiryTemplate│
        │                            │      │  → Gmail inbox    │
        │  Queried via GROQ          │      └───────────────────┘
        │  (lib/sanity.queries.ts)   │
        │  Draft Mode / Visual Edit  │
        └────────────────────────────┘
```

---

## Page Map

| Route | Type | Data Source | Status |
|---|---|---|---|
| `/` | Server Component | Sanity (`getFeaturedServicesQuery`, `getSiteSettingsQuery`) | ✅ Live |
| `/about` | Server Component | Hardcoded | ✅ Live |
| `/services` | Server Component | Sanity (`getAllServicesQuery`) | ✅ Live |
| `/services/[slug]` | Server Component | Sanity (`getServiceBySlugQuery`) | ✅ Live |
| `/store` | Server Component | Sanity (`getAllProductsQuery`) | ✅ Live |
| `/store/[slug]` | Server Component | Sanity (`getProductBySlugQuery`) | ✅ Live |
| `/contact` | Client Component | Form → Server Action → Resend | ✅ Live |
| `/gallery` | Server Component | Sanity (`getAllGalleryImagesQuery`) | ✅ Live |
| `/terms` | Static | Hardcoded | ✅ Live |
| `/pay/[token]` | Server + Client Component | Sanity + Stripe | ✅ Live (hidden) |
| `/studio` | — | Sanity Studio (embedded) | ✅ Internal |

---

## Data Flow

### CMS Content (Services, Products, Portfolio)

```
Sanity Studio (editor)
      │
      ▼ Publish content
Sanity Content Lake
      │
      ├──► lib/sanity.client.ts  (createClient, stega, SANITY_VIEWER_TOKEN)
      │
      ├──► lib/sanity.queries.ts (GROQ query definitions)
      │
      └──► Page Server Components
              │  sanityFetch({ query })  ← from components/sanity/live.ts
              │  (wraps SanityLive, handles draft/published perspective)
              ▼
           Page renders with live CMS data
           Visual Editing overlays (stega-encoded, click-to-edit)
```

**Draft Mode (Preview):**
- Enabled via Sanity Presentation Tool in the Studio (`/studio`)
- `sanityFetch` automatically switches to `perspective: "drafts"` with stega encoding when draft mode is active — pages need no extra configuration
- `SanityLive` (mounted in root `app/layout.tsx`) subscribes to Sanity Live Events so pages revalidate in real time as content changes
- `VisualEditing` (mounted in `app/(site)/layout.tsx`) renders green overlay handles on stega-encoded fields, clicking them focuses the correct field in the Studio
- `DisableDraftMode` component and `/app/actions.ts → disableDraftMode()` let editors exit preview

### Contact Form (Email)

```
User fills /contact form
      │
      ▼ handleSubmit()
sendEmail() server action (app/actions.ts)
      │
      ▼ resend.emails.send()
InquiryTemplate (React Email component)
      │
      ▼
arizonafirefeatures@gmail.com inbox
```

---

## Project Structure

```
arizona-fire-features/
├── app/
│   ├── (site)/              # Public site routes
│   │   ├── layout.tsx       # Header + Footer shell
│   │   ├── page.tsx         # Home page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── gallery/
│   │   ├── services/[slug]/
│   │   ├── store/[slug]/
│   │   └── terms/
│   ├── studio/              # Embedded Sanity Studio
│   ├── api/                 # API routes
│   ├── actions.ts           # Server actions (email, draft mode)
│   ├── globals.css          # Global styles + Tailwind
│   └── layout.tsx           # Root layout (metadata, SanityLive)
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Sticky nav (desktop tabs + mobile dropdown)
│   │   └── Footer.tsx       # Footer with dynamic service links
│   ├── ui/
│   │   ├── AnimatedGrid.tsx      # Framer Motion staggered grid
│   │   ├── ServiceCard.tsx       # Card for services list
│   │   ├── ProductCard.tsx       # Card for store products (availability badge, category)
│   │   ├── StoreGrid.tsx         # Client component: category filter + product grid
│   │   ├── GalleryCard.tsx       # Card for gallery images
│   │   ├── GalleryGrid.tsx       # Gallery grid with lightbox
│   │   ├── Lightbox.tsx          # Full-screen image lightbox
│   │   ├── InquiryTemplate.tsx   # React Email template
│   │   └── TermsAndConditions.tsx
│   ├── sanity/
│   │   ├── SanityImage.tsx       # next/image wrapper for Sanity assets
│   │   ├── PortableText.tsx      # Portable text renderer
│   │   ├── DisableDraftMode.tsx  # Preview exit button
│   │   └── live.ts              # SanityLive component config
│   └── sections/
│       └── SectionWithBackground.tsx
│
├── lib/
│   ├── sanity.api.ts        # Env var exports (projectId, dataset, apiVersion)
│   ├── sanity.client.ts     # Configured Sanity client
│   ├── sanity.queries.ts    # All GROQ query definitions
│   ├── sanity.image.ts      # Image URL builder helper
│   └── resend.client.ts     # Resend client singleton
│
├── schemaTypes/             # Sanity document type definitions
│   ├── service.ts
│   ├── product.ts           # Product + inventory fields
│   ├── portfolioProject.ts
│   ├── galleryImage.ts
│   └── siteSettings.ts      # Singleton: global settings (hero image, etc.)
│
├── public/images/           # Static assets (logo, hero image)
├── sanity.config.ts         # Sanity Studio configuration
├── sanity.types.ts          # Auto-generated TypeScript types from schema
└── next.config.mjs          # Next.js configuration
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Sanity project (see `.env.local.example`)

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=   # Your Sanity project ID
NEXT_PUBLIC_SANITY_DATASET=      # e.g. "production"
SANITY_API_READ_TOKEN=           # Sanity API token (viewer role)
NEXT_PUBLIC_SANITY_STUDIO_URL=   # URL where the Studio is hosted
RESEND_API_KEY=                  # Resend API key for email
```

### Development

```bash
pnpm install
pnpm dev
```

### Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start the development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Run Prettier |
| `pnpm type-check` | Run TypeScript type checking |

---

## Inventory Management

Products are managed through [Sanity Studio](https://arizonafirefeatures.com/studio) — no third-party e-commerce platform. Customers call to place orders; there is no checkout flow on the site.

### Product Schema Fields

| Field | Type | Description |
|---|---|---|
| `name` | `string` | Product display name |
| `slug` | `slug` | URL-safe identifier (auto-generated from name) |
| `description` | `block[]` | Rich text description (Portable Text) |
| `features` | `string[]` | Bullet-point feature list |
| `coverImage` | `image` | Primary product image with alt text |
| `gallery` | `image[]` | Additional product images |
| `availableSizes` | `string[]` | Available sizes (e.g. `['28', '36', '42']`). Rendered as "28 • 36 • 42…" on the product page |
| `brochureFile` | `file` | Brochure PDF — powers the "Brochures" download button |
| `cadFile` | `file` | CAD/DWG file — powers the "CAD Files" download button |
| `specificationsFile` | `file` | Specifications PDF — powers the "Specifications" download button |
| `ctaText` | `string` | CTA button label (default: "Contact for Pricing") |
| `isFeatured` | `boolean` | Pins product to top of store listing |
| `category` | `string` | Category for filtering (Fire Pits, Fire Tables, Fire Bowls, Burners & Components, Accessories, Other) |
| `sku` | `string` | Internal stock-keeping unit identifier (e.g. `AFF-FP-001`) |
| `price` | `number` | Starting price in USD. Leave blank to show "Contact for Pricing" |
| `availability` | `string` | `in_stock` / `call_for_availability` / `out_of_stock` |
| `stockCount` | `number` | Internal inventory count — **not shown to customers** |

### Sanity Studio Workflow

1. Go to `/studio` → **Products**
2. Create or edit a product — fill in all fields
3. Set **Availability** using the radio buttons (defaults to *Call for Availability*)
4. Check **Featured Product** to pin it to the top of the `/store` listing
5. Publish — changes appear on the live site immediately via Sanity Live

### Store Architecture

The `/store` page is split across two components to keep data fetching on the server while enabling client-side category filtering:

- **`app/(site)/store/page.tsx`** — Server component. Fetches all products via `getAllProductsQuery` (featured first, then A–Z)
- **`components/ui/StoreGrid.tsx`** — Client component. Renders category filter tabs and the animated product grid

#### Product Detail Page Layout (`/store/[slug]`)

The product detail page uses a three-section layout (no full-width hero banner):

1. **Top — 2-column** — Cover image on the left; product name, description, availability badge, pricing, SKU, and action buttons (Brochures / CAD Files / Specifications / Contact Us) on the right. Stacks to a single column on mobile.
2. **Middle — Features** — Section heading with orange underline accent; first two gallery thumbnails in a side-by-side grid on the left, bullet list of `features` strings on the right.
3. **Bottom — Project Gallery** — Full product gallery rendered by `ProductGallery` (supports lightbox, keyboard navigation, and swipe gestures). Rendered only when gallery images exist.

### GROQ Queries

| Query | Purpose |
|---|---|
| `getAllProductsQuery` | All products for the store listing (featured first) |
| `getFeaturedProductsQuery` | Featured products only (for homepage/hero use) |
| `getProductBySlugQuery` | Single product for the detail page |
| `getSiteSettingsQuery` | Singleton site settings inc. hero cover image |

---

## Online Invoice Payment

Customers can pay invoices online through a unique, private link. The page (`/pay/<token>`) is not linked in the site navigation — it's only accessible to someone who has been given the URL.

### How It Works

```
Business owner creates invoice in Studio
      │  Fill in: customer name, email, line items, due date
      │  Set status → "Sent"
      │  Copy the Token field value
      ▼
Share payment URL with customer:
  https://arizonafirefeatures.com/pay/<token>
      │
      ▼
Customer visits the page
      │  Sees invoice summary + Stripe payment form
      ▼
Customer enters card details + submits
      │  Stripe PaymentIntent confirmed
      │  Stripe redirects → /pay/<token>?success=true
      ▼
Stripe Webhook fires → POST /api/stripe/webhook
      │  Verifies signature
      │  Patches Sanity invoice: status → "paid"
      │  Sends confirmation email (Resend)
            → Customer inbox
            → Business inbox
```

### Creating an Invoice (Sanity Studio)

1. Go to `/studio` → **Invoice** in the left sidebar
2. Click **+ New Invoice** and fill in:
   - **Invoice Number** — e.g. `INV-2024-001`
   - **Customer Name** and **Customer Email**
   - **Line Items** — description, quantity, unit price per item
   - **Due Date** and optional **Notes to Customer**
   - **Payment Token** — paste a UUID (generate one at [uuidgenerator.net](https://www.uuidgenerator.net))
   - **Status** → `Sent`
3. **Publish** the document
4. Copy the payment URL: `https://arizonafirefeatures.com/pay/<TOKEN>`
5. Send the link to the customer via email or any other channel

### Payment Page States

| Condition | What the customer sees |
|---|---|
| Invoice status is `sent` | Invoice summary + Stripe payment form |
| Invoice status is `paid` | Payment already received confirmation |
| Invoice status is `cancelled` | Cancelled message |
| Invoice status is `draft` | Not ready message |
| Invalid/unknown token | Invoice not found message |
| After successful payment | Animated checkmark success screen |

## TODO — Improvements

### 🟥 Functionality

- [ ] **Featured services filter** — `getFeaturedServicesQuery` currently returns ALL services. Implement a `featured: boolean` field in the `service` schema and filter with `&& featured == true` (see the TODO comment in `lib/sanity.queries.ts`)
- [ ] **Contact form validation** — Add client-side validation feedback (field-level error messages, not just silent `return`)
- [ ] **Contact form: `console.log` left in** — Remove `console.log('Sending email...')` in `contact/page.tsx` before production
- [ ] **Map integration** — The "Service Area" section in Contact is a placeholder. Embed a real map (Google Maps iframe or Mapbox)
- [X] **Testimonials** — Testimonials on the Home page are hardcoded placeholders (`Customer 1`, `Customer 2`, etc.). Move to Sanity or replace with real reviews
- [ ] **About page team section** — Team bios are placeholder text. Add real bios and photos (ideally from Sanity)

### 🟨 Code Quality

- [ ] **Duplicate CTA section** — The store's `page.tsx` CTA section says "Need Multiple Services?" — copy-pasted from services. Update the text for the store context
- [ ] **`Footer.tsx` hardcoded service index** — Footer accesses `featuredServices[0]`, `[1]`, `[2]` by index. If fewer than 3 services exist this can render empty links. Map over results dynamically instead
- [ ] **Import path consistency** — Some files use relative imports (`../../components/...`) and others use the `@/` alias (`@/components/...`). Standardize on `@/` alias throughout
- [ ] **`gallery/page.tsx` dead imports** — Imports `AnimatedGrid`, `ServiceCard`, `urlForImage`, `getAllServicesQuery` that are never used. Remove them
- [ ] **`services/page.tsx` unused import** — `urlForImage` is imported but unused. Remove it
- [ ] **Component prop types** — `ServiceCard` and `ProductCard` spread props inline or use `any`-adjacent patterns. Define explicit TypeScript interfaces for all component props
- [ ] **`about/page.tsx`** — The story image src is hardcoded to `/images/logo.png` as a placeholder. Replace with a real team photo (from Sanity or public folder)
- [ ] **`(site)/layout.tsx` duplicate Visual Editing** — `VisualEditing` is rendered in both the root `app/layout.tsx` and `app/(site)/layout.tsx`. Consolidate to one location

### 🟦 Performance

- [ ] **Sanity client `useCdn: false`** — The main `sanityClient` has `useCdn: false` globally. Enable the CDN for published production fetches to improve page load times; only disable it for draft mode
- [ ] **No `next/image` on `SectionWithBackground`** — The hero image is passed via a CSS `backgroundImage` style. Using `<Image>` with `priority` would improve LCP
- [ ] **`AnimatedGrid` children type** — The component accepts `children` but doesn't enforce that they are valid cards. A typed slot or render prop pattern would be safer
- [ ] **Shared `draftMode()` check** — Several pages each call `await draftMode()` independently. Consider a shared HOC or helper to reduce boilerplate and ensure consistent behavior across all pages
- [ ] **No `loading.tsx` or `error.tsx` files** — Adding these in the `(site)` route group would improve UX during data fetches and gracefully handle Sanity fetch failures

### 🟩 Readability

- [ ] **`TermsAndConditions.tsx`** — At 26 KB this is the largest single file. The text content is hardcoded in JSX. Move content to a Sanity document with PortableText for easier updates
- [ ] **Inline hardcoded data** — Values like `benefitsList`, `team`, and `testimonials` arrays defined inside page components are hard to manage. Centralize them in a `constants.ts` or move to CMS
- [ ] **Inconsistent spacing in JSX** — Some `<Section>` tags have stray leading/trailing spaces (e.g. `< Section size="3" >`, `</Section >`). Clean these up for consistency
- [ ] **`next.config.mjs`** — Review and document any non-obvious config

---

*Last updated: April 2026*
