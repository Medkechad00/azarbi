# AZARBI — Product Requirements Document
## Premium Moroccan Berber Rug E-Commerce Platform

**Version:** 1.0  
**Brand:** Azarbi (ⴰⵣⴰⵔⴱⵉ — "rugs" in Tamazight / Amazigh language)  
**Date:** March 2026  
**Stack:** Next.js 14+ (App Router) · Supabase (PostgreSQL) · Tailwind CSS · TypeScript

---

## TABLE OF CONTENTS

1. [Project Overview](#1-project-overview)
2. [Technical Stack](#2-technical-stack)
3. [Design System](#3-design-system)
4. [Site Architecture & Pages](#4-site-architecture--pages)
5. [Database Schema](#5-database-schema)
6. [API Routes](#6-api-routes)
7. [Component Library](#7-component-library)
8. [Authentication & User System](#8-authentication--user-system)
9. [E-Commerce Logic](#9-e-commerce-logic)
10. [SEO Architecture](#10-seo-architecture)
11. [Performance Requirements](#11-performance-requirements)
12. [Internationalization](#12-internationalization)
13. [AI Agent Build Prompt](#13-ai-agent-build-prompt)

---

## 1. PROJECT OVERVIEW

### 1.1 Brand Identity

**Name:** Azarbi (ⴰⵣⴰⵔⴱⵉ)  
**Meaning:** "Rugs" in Tamazight (Amazigh), the language of the Berber people of North Africa  
**Tagline:** *One Rug. One Weaver. Yours Forever.*  
**Mission:** Connect design-conscious buyers directly with women weaver cooperatives in the Atlas Mountains, eliminating middlemen and ensuring fair trade.

### 1.2 Product Categories

| Category | Description | Price Range |
|----------|-------------|-------------|
| Beni Ourain | High-Atlas white/ivory wool, minimalist geometric diamond motifs | $600–$5,000 |
| Azilal | Colorful abstract patterns, High Atlas region | $400–$2,500 |
| Kilim | Flat-weave, geometric bands, Ouarzazate & Draa Valley | $300–$1,800 |
| Boucherouite | Recycled textile, vibrant upcycled patterns | $300–$1,200 |
| Bespoke | Custom orders, made-to-measure | $800–$8,000+ |

### 1.3 Target Audience

- **Primary:** Design-conscious women, ages 28–50
- **Markets:** United States, United Kingdom, UAE, Western Europe (France, Germany, Netherlands)
- **Profile:** Reads Architectural Digest, follows interior designers on Instagram, comfortable with $800–$5,000 rug purchase
- **Device split:** 72% mobile-first browsing, 28% desktop purchase completion

### 1.4 Business Model

- Direct-to-consumer (DTC) from Atlas Mountain cooperatives
- Each rug is unique (one-of-one), never reprinted
- Bespoke orders placed via WhatsApp concierge + on-site form
- Interior designer trade program (15% discount, dedicated portal)
- Cooperative profit-sharing: 65% to weaver, 35% brand/operations

---

## 2. TECHNICAL STACK

### 2.1 Core Framework

```
Framework:        Next.js 14+ with App Router
Language:         TypeScript (strict mode)
Styling:          Tailwind CSS v3 (custom config)
Database:         Supabase (PostgreSQL 15)
ORM:              Drizzle ORM (type-safe, works with Supabase)
Auth:             Supabase Auth (email + Google OAuth)
Storage:          Supabase Storage (rug photography)
Deployment:       Vercel (Edge Functions)
```

### 2.2 Key Libraries

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "typescript": "^5.4.0",
    "@supabase/supabase-js": "^2.43.0",
    "@supabase/ssr": "^0.3.0",
    "drizzle-orm": "^0.30.0",
    "drizzle-kit": "^0.20.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "phosphor-react": "^1.4.1",
    "next-seo": "^6.5.0",
    "next-sitemap": "^4.2.3",
    "stripe": "^15.0.0",
    "@stripe/stripe-js": "^3.0.0",
    "resend": "^3.2.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.0",
    "zustand": "^4.5.0",
    "sharp": "^0.33.0",
    "embla-carousel-react": "^8.1.0",
    "react-intersection-observer": "^9.10.0",
    "next-themes": "^0.3.0",
    "sonner": "^1.4.0"
  }
}
```

### 2.3 Icon Library — Phosphor Icons

**Why Phosphor:** Phosphor React is chosen over Lucide or Heroicons for Azarbi because it includes rare icons relevant to artisan craft (e.g., `Needle`, `Thread`, `Mountains`, `Compass`, `Package`, `ArrowsCounterClockwise`) and its line-weight system (thin/light/regular/bold/fill/duotone) matches the 1px fine-line icon style required by the design system.

```tsx
// Usage
import { ShoppingCart, Mountains, Needle, Heart, MagnifyingGlass } from 'phosphor-react'

// Always use weight="light" at 18px for brand consistency
<Mountains weight="light" size={18} color="var(--color-smoke)" />
```

**Key icons used:**
- `ShoppingCart` — cart
- `Mountains` — hero section, origin story
- `Needle` — craft / weaving pages
- `MapPin` — origin / cooperative location
- `Heart` — wishlist
- `MagnifyingGlass` — search
- `ArrowRight` / `ArrowUpRight` — CTAs
- `WhatsappLogo` — WhatsApp CTA
- `Ruler` — dimensions / specs
- `Certificate` — fair trade badge
- `Users` — cooperative / weaver count
- `Star` — reviews
- `X` — close / dismiss

### 2.4 Typography — Google Fonts

**Font 1 — Display: Fraunces (Variable)**
```
Source: Google Fonts
Weights: 300, 400, 500 (Light, Regular, Medium)
Axes: Softness (SOFT), Wonkiness (WONK), Optical size (opsz)
Use: Hero headlines, product names, collection titles, pull quotes
Mountain/nature connection: Organic variable letterforms with soft, 
handcrafted quality. The "SOFT" axis adds a slightly rounded, 
hand-chiseled quality — referencing carved stone, natural materials.
CSS: font-family: 'Fraunces', serif; font-optical-sizing: auto;
```

**Font 2 — Interface: Josefin Sans**
```
Source: Google Fonts
Weights: 300, 400
Use: Navigation labels, category tags, ALL CAPS UI elements, 
     metadata (weaver name, region, size specs)
Mountain/nature connection: Clean geometric sans with an art-deco 
precision that echoes mountain lodge signage and topographic maps.
Note: Used ALWAYS in uppercase for labels (letter-spacing: 0.16em)
CSS: font-family: 'Josefin Sans', sans-serif;
```

**Font 3 — Mono/Data: DM Mono**
```
Source: Google Fonts
Weights: 400
Use: Rug dimensions, SKU references, price display, material specs
Note: Gives technical measurements a handwritten-notebook quality
CSS: font-family: 'DM Mono', monospace;
```

```html
<!-- Add to app/layout.tsx <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Josefin+Sans:wght@300;400&family=DM+Mono&display=swap" rel="stylesheet" />
```

---

## 3. DESIGN SYSTEM

### 3.1 Colour Tokens — tailwind.config.ts

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette
        clay:    '#8C4A30',  // Primary brand — Atlas terracotta clay
        saffron: '#C17A2C',  // Secondary accent — saffron dye, prices, hover
        linen:   '#F4EFE5',  // Background — raw undyed wool canvas
        night:   '#1C1815',  // Text dark — warm near-black
        smoke:   '#9B8F85',  // Text light — metadata, captions
        argane:  '#3C5D4E',  // CTA / Highlight — Atlas argan forest green
        bone:    '#E6DDD1',  // Surface — cards, dividers, UI shells
        bone2:   '#D9CFBF',  // Border — card edges, separators
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans:    ['Josefin Sans', 'system-ui', 'sans-serif'],
        mono:    ['DM Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '0.005em' }],
        'display-lg': ['clamp(2rem, 4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.1', letterSpacing: '0.015em' }],
        'label':      ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'label-sm':   ['0.5625rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      borderRadius: {
        'brand': '1px',     // Sharp — used on all cards, buttons, badges
        'brand-sm': '2px',  // Slightly soft — input fields only
      },
      spacing: {
        'section': '80px',   // Min section padding
        'section-sm': '48px',
      },
      aspectRatio: {
        'rug': '3 / 4',     // Portrait — all product card images
        'hero': '16 / 7',   // Wide — homepage hero
        'story': '4 / 5',   // Editorial — weaver story images
      },
      boxShadow: {
        'none': 'none',     // No shadows in this design system
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease forwards',
        'slide-up': 'slideUp 0.6s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(1.03)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### 3.2 Global CSS — app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --color-clay:    #8C4A30;
    --color-saffron: #C17A2C;
    --color-linen:   #F4EFE5;
    --color-night:   #1C1815;
    --color-smoke:   #9B8F85;
    --color-argane:  #3C5D4E;
    --color-bone:    #E6DDD1;
    --color-bone2:   #D9CFBF;
  }

  html { background-color: var(--color-linen); }

  body {
    font-family: 'Josefin Sans', system-ui, sans-serif;
    color: var(--color-night);
    background-color: var(--color-linen);
    -webkit-font-smoothing: antialiased;
    font-weight: 300;
  }

  h1, h2, h3, h4 {
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 400;
    font-optical-sizing: auto;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--color-linen); }
  ::-webkit-scrollbar-thumb { background: var(--color-bone2); }
}

@layer components {
  /* Button — Primary */
  .btn-primary {
    @apply inline-flex items-center gap-2 bg-argane text-bone px-6 py-3 
           text-label uppercase tracking-widest rounded-brand
           transition-colors duration-200 hover:bg-clay;
  }
  
  /* Button — Secondary */
  .btn-secondary {
    @apply inline-flex items-center gap-2 bg-transparent text-night 
           border border-night/40 px-6 py-3 text-label uppercase tracking-widest 
           rounded-brand transition-colors duration-200 hover:border-night/80;
  }
  
  /* Button — Ghost */
  .btn-ghost {
    @apply inline-flex items-center gap-1 text-smoke text-label uppercase 
           tracking-wider underline underline-offset-4 
           transition-colors duration-200 hover:text-night;
  }

  /* Tag / Badge */
  .tag {
    @apply inline-block bg-bone text-clay/80 text-label-sm uppercase 
           tracking-widest px-2.5 py-1 rounded-brand;
  }
  
  .tag-cta {
    @apply inline-block bg-clay text-linen text-label-sm uppercase 
           tracking-widest px-2.5 py-1 rounded-brand;
  }
  
  .tag-fair-trade {
    @apply inline-block bg-argane text-bone/90 text-label-sm uppercase 
           tracking-widest px-2.5 py-1 rounded-brand;
  }

  /* Product card */
  .product-card {
    @apply bg-linen/60 border border-bone2 rounded-brand overflow-hidden 
           transition-all duration-200 hover:border-clay/60;
  }
  
  /* Section divider with diamond motif */
  .divider-motif {
    @apply flex items-center gap-4 text-bone2;
  }
  
  /* Input field */
  .input-brand {
    @apply w-full bg-bone border border-bone2 rounded-brand-sm px-4 py-3 
           text-sm text-night placeholder:text-smoke 
           focus:outline-none focus:border-clay/60 transition-colors;
  }
}
```

---

## 4. SITE ARCHITECTURE & PAGES

### 4.1 URL Structure

```
/ ................................................ Homepage
/collections ..................................... All collections
/collections/[category] .......................... e.g. /collections/beni-ourain
/products/[slug] ................................. Individual product page
/weavers ......................................... All weavers listing
/weavers/[slug] .................................. Individual weaver profile
/journal ......................................... Editorial blog
/journal/[slug] .................................. Single journal post
/about ........................................... Brand story
/cooperatives ................................... Atlas cooperatives
/bespoke ......................................... Custom order enquiry
/care-guide ..................................... Rug care & maintenance
/trade ........................................... Interior designer program
/cart ............................................ Shopping cart
/checkout ........................................ Checkout flow
/account ......................................... User account
/account/orders ................................. Order history
/account/wishlist ............................... Saved rugs
/search .......................................... Search results
/size-guide ..................................... Size reference + room calculator
/sitemap.xml .................................... Auto-generated
/robots.txt ..................................... Auto-generated
```

### 4.2 Page Specifications

#### `/` — Homepage

**Sections (in order):**
1. **Hero** — Full-screen split: rug photo (left 58%) + dark panel with headline (right 42%)
2. **Category Pills** — Horizontal scroll on mobile: Beni Ourain · Azilal · Kilim · Boucherouite · Bespoke
3. **New Arrivals Grid** — 3-col desktop / 1-col mobile, 6 cards, "View All" CTA
4. **Origin Story** — Full-width editorial section: map of Atlas Mountains + cooperative stats (200 weavers, 4 cooperatives, 20+ years avg. experience)
5. **Featured Weaver** — Full-bleed image, weaver portrait, 3-sentence story, link to profile
6. **Craft Process** — 3-step editorial: Shearing → Spinning → Weaving (with process photos)
7. **Press / As Seen In** — Logo bar: Architectural Digest, Vogue Living, Dezeen, Financial Times
8. **Instagram Grid** — Last 6 posts, pulled via API
9. **Newsletter** — Minimal single-field form: "Join the Collective"

#### `/products/[slug]` — Product Detail Page

**Layout:** Two-column on desktop (image 55% / info 45%), full-width stacked on mobile

**Left column — Image gallery:**
- Primary image (3:4 portrait, full-width)
- 4 additional images: hanging shot, flat lay overhead, close-up weave detail, in-room lifestyle
- Swipeable on mobile, thumbnail strip on desktop (hidden on mobile)
- Zoom on hover (desktop)

**Right column — Product info:**
```
BENI OURAIN · HIGH ATLAS                    [region tag]
N°114 — Diamond Lattice                    [Fraunces 28px]
Woven by Fatima Ait Brahim  →              [link to weaver profile]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$1,240                                     [DM Mono 24px]
                                    
[Add to Cart — Argane filled button]
[Save to Wishlist — ghost button]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DIMENSIONS    200 × 290 cm / 6'7" × 9'6"
PILE DEPTH    3.5 cm
MATERIAL      Beni Ourain Merino wool, natural dye
WARP          Undyed cotton, hand-spun
REGION        Aït Benhaddou, High Atlas
WEAVE TIME    11 weeks
REF           BO-2024-1147
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Expandable accordion sections:]
  About this rug        [product story]
  About the weaver      [mini bio]
  Care instructions     [care guide link]
  Shipping & Returns    [policy]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[WhatsApp CTA — "Ask about this rug"]
```

**Below fold:**
- "You May Also Love" — 4 related products by same category or cooperative
- "See this rug in context" — 3 lifestyle/room images

#### `/weavers/[slug]` — Weaver Profile

```
Hero portrait (full-bleed, 16:9 on desktop)
Name (Fraunces display)
Cooperative + Village
Years weaving
Specialties (tags)

Editorial paragraph about her craft lineage

Gallery of her rugs (2-col grid, links to product pages)
```

#### `/bespoke` — Custom Order Page

Form fields:
- Rug category preference
- Approximate dimensions
- Color palette preference (visual swatches)
- Pattern style (Geometric / Abstract / Traditional / Minimal)
- Budget range
- Timeline
- Name, email, Instagram/Pinterest board URL
- "How did you hear about us?"

Submit → triggers email to team + WhatsApp notification + Supabase record

---

## 5. DATABASE SCHEMA

### 5.1 Supabase / PostgreSQL Schema

```sql
-- ════════════════════════════════════════════════
-- COOPERATIVES
-- ════════════════════════════════════════════════
CREATE TABLE cooperatives (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  region        TEXT NOT NULL,          -- e.g. "High Atlas"
  village       TEXT NOT NULL,
  coordinates   POINT,                  -- lat/lng for map
  founded_year  INTEGER,
  weaver_count  INTEGER DEFAULT 0,
  description   TEXT,
  image_url     TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════════════
-- WEAVERS
-- ════════════════════════════════════════════════
CREATE TABLE weavers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cooperative_id  UUID REFERENCES cooperatives(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  bio             TEXT,
  years_weaving   INTEGER,
  specialties     TEXT[],               -- e.g. ['beni_ourain', 'kilim']
  portrait_url    TEXT,
  gallery_urls    TEXT[],
  featured        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════════════
-- PRODUCTS (RUGS)
-- ════════════════════════════════════════════════
CREATE TABLE products (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku               TEXT UNIQUE NOT NULL,    -- e.g. "BO-2024-1147"
  slug              TEXT UNIQUE NOT NULL,
  title             TEXT NOT NULL,
  category          TEXT NOT NULL CHECK (category IN 
                    ('beni_ourain','azilal','kilim','boucherouite','bespoke')),
  weaver_id         UUID REFERENCES weavers(id),
  cooperative_id    UUID REFERENCES cooperatives(id),
  
  -- Pricing
  price_usd         DECIMAL(10,2) NOT NULL,
  price_gbp         DECIMAL(10,2),
  price_eur         DECIMAL(10,2),
  price_aed         DECIMAL(10,2),
  
  -- Physical attributes
  width_cm          DECIMAL(6,1),
  length_cm         DECIMAL(6,1),
  pile_depth_cm     DECIMAL(4,1),
  weight_kg         DECIMAL(5,2),
  
  -- Materials
  material_pile     TEXT,              -- e.g. "Beni Ourain Merino wool"
  material_warp     TEXT,              -- e.g. "Undyed cotton, hand-spun"
  dye_type          TEXT CHECK (dye_type IN ('natural','mineral','synthetic','undyed')),
  
  -- Origin
  region            TEXT NOT NULL,
  village           TEXT,
  weave_weeks       INTEGER,          -- How many weeks to produce
  
  -- Status
  status            TEXT DEFAULT 'available' CHECK 
                    (status IN ('available','reserved','sold','coming_soon')),
  is_one_of_one     BOOLEAN DEFAULT TRUE,
  is_new_arrival    BOOLEAN DEFAULT FALSE,
  is_featured       BOOLEAN DEFAULT FALSE,
  
  -- Content
  description       TEXT,             -- Craft story
  care_notes        TEXT,
  
  -- SEO
  meta_title        TEXT,
  meta_description  TEXT,
  
  -- Images (Supabase Storage paths)
  primary_image_url   TEXT NOT NULL,
  gallery_image_urls  TEXT[],
  
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_slug ON products(slug);

-- Full-text search vector
ALTER TABLE products 
ADD COLUMN search_vector TSVECTOR GENERATED ALWAYS AS (
  to_tsvector('english', coalesce(title,'') || ' ' || 
              coalesce(description,'') || ' ' || 
              coalesce(category,'') || ' ' || 
              coalesce(region,''))
) STORED;
CREATE INDEX idx_products_search ON products USING GIN(search_vector);

-- ════════════════════════════════════════════════
-- USERS / ACCOUNTS
-- ════════════════════════════════════════════════
-- Note: auth.users is managed by Supabase Auth
-- This extends it with profile data
CREATE TABLE profiles (
  id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,
  full_name       TEXT,
  phone           TEXT,
  address_line1   TEXT,
  address_line2   TEXT,
  city            TEXT,
  state           TEXT,
  postal_code     TEXT,
  country         TEXT DEFAULT 'US',
  is_trade        BOOLEAN DEFAULT FALSE,   -- Interior designer flag
  trade_company   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════════════
-- WISHLIST
-- ════════════════════════════════════════════════
CREATE TABLE wishlists (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- ════════════════════════════════════════════════
-- ORDERS
-- ════════════════════════════════════════════════
CREATE TABLE orders (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        TEXT UNIQUE NOT NULL,  -- e.g. "AZR-2024-00142"
  user_id             UUID REFERENCES profiles(id),
  guest_email         TEXT,                  -- For guest checkout
  
  status              TEXT DEFAULT 'pending' CHECK 
                      (status IN ('pending','confirmed','processing',
                                  'shipped','delivered','cancelled','refunded')),
  
  -- Pricing
  subtotal_usd        DECIMAL(10,2) NOT NULL,
  shipping_usd        DECIMAL(10,2) DEFAULT 0,
  tax_usd             DECIMAL(10,2) DEFAULT 0,
  total_usd           DECIMAL(10,2) NOT NULL,
  currency            TEXT DEFAULT 'USD',
  
  -- Payment
  stripe_payment_id   TEXT,
  payment_status      TEXT DEFAULT 'pending',
  
  -- Shipping address
  ship_name           TEXT,
  ship_address_line1  TEXT,
  ship_address_line2  TEXT,
  ship_city           TEXT,
  ship_state          TEXT,
  ship_postal_code    TEXT,
  ship_country        TEXT,
  
  -- Tracking
  tracking_number     TEXT,
  carrier             TEXT,
  shipped_at          TIMESTAMPTZ,
  delivered_at        TIMESTAMPTZ,
  
  -- Notes
  customer_notes      TEXT,
  internal_notes      TEXT,
  
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════════════
-- ORDER ITEMS
-- ════════════════════════════════════════════════
CREATE TABLE order_items (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id   UUID REFERENCES products(id),
  product_sku  TEXT NOT NULL,
  product_name TEXT NOT NULL,
  price_usd    DECIMAL(10,2) NOT NULL,
  quantity     INTEGER DEFAULT 1,       -- Always 1 for one-of-one rugs
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════════════
-- BESPOKE ENQUIRIES
-- ════════════════════════════════════════════════
CREATE TABLE bespoke_enquiries (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  category_pref   TEXT,
  width_cm        DECIMAL(6,1),
  length_cm       DECIMAL(6,1),
  color_palette   TEXT,
  pattern_style   TEXT,
  budget_min_usd  INTEGER,
  budget_max_usd  INTEGER,
  timeline_weeks  INTEGER,
  inspiration_url TEXT,        -- Pinterest/Instagram link
  message         TEXT,
  source          TEXT,        -- How did you hear about us
  status          TEXT DEFAULT 'new' CHECK 
                  (status IN ('new','contacted','quoted','confirmed','declined')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════════════
-- JOURNAL (BLOG)
-- ════════════════════════════════════════════════
CREATE TABLE journal_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT,
  body            TEXT NOT NULL,        -- Markdown or HTML
  cover_image_url TEXT,
  author          TEXT DEFAULT 'Azarbi Editorial',
  tags            TEXT[],
  published       BOOLEAN DEFAULT FALSE,
  published_at    TIMESTAMPTZ,
  
  -- SEO
  meta_title        TEXT,
  meta_description  TEXT,
  
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════════════
-- NEWSLETTER SUBSCRIBERS
-- ════════════════════════════════════════════════
CREATE TABLE newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  source      TEXT,              -- 'footer', 'popup', 'checkout'
  subscribed  BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ════════════════════════════════════════════════
-- PRODUCT VIEWS (Analytics)
-- ════════════════════════════════════════════════
CREATE TABLE product_views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  session_id  TEXT,
  country     TEXT,
  viewed_at   TIMESTAMPTZ DEFAULT NOW()
);
```

### 5.2 Row Level Security (RLS) Policies

```sql
-- Products: public read, admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "products_admin_write" ON products FOR ALL TO authenticated 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Wishlists: users can only see their own
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wishlists_own" ON wishlists FOR ALL TO authenticated 
  USING (user_id = auth.uid());

-- Orders: users see their own, admins see all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders_own" ON orders FOR SELECT TO authenticated 
  USING (user_id = auth.uid());
CREATE POLICY "orders_admin" ON orders FOR ALL TO authenticated 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Profiles: users see their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_own" ON profiles FOR ALL TO authenticated 
  USING (id = auth.uid());
```

---

## 6. API ROUTES

### 6.1 Next.js App Router API Structure

```
app/
  api/
    products/
      route.ts               GET /api/products (list with filters)
      [slug]/
        route.ts             GET /api/products/[slug]
      search/
        route.ts             GET /api/products/search?q=...
    
    collections/
      [category]/
        route.ts             GET /api/collections/[category]
    
    weavers/
      route.ts               GET /api/weavers
      [slug]/
        route.ts             GET /api/weavers/[slug]
    
    cart/
      route.ts               GET/POST /api/cart
      [itemId]/
        route.ts             DELETE /api/cart/[itemId]
    
    wishlist/
      route.ts               GET/POST /api/wishlist
      [productId]/
        route.ts             DELETE /api/wishlist/[productId]
    
    checkout/
      create-intent/
        route.ts             POST /api/checkout/create-intent
      confirm/
        route.ts             POST /api/checkout/confirm
      webhook/
        route.ts             POST /api/checkout/webhook (Stripe)
    
    orders/
      route.ts               GET /api/orders (user's orders)
      [id]/
        route.ts             GET /api/orders/[id]
    
    bespoke/
      route.ts               POST /api/bespoke
    
    newsletter/
      route.ts               POST /api/newsletter
    
    journal/
      route.ts               GET /api/journal
      [slug]/
        route.ts             GET /api/journal/[slug]
    
    sitemap/
      route.ts               GET /api/sitemap (dynamic sitemap data)
```

### 6.2 Key API Implementations

#### GET /api/products

```typescript
// app/api/products/route.ts
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const status = searchParams.get('status') || 'available'
  const sort = searchParams.get('sort') || 'created_at'
  const order = searchParams.get('order') || 'desc'
  const limit = parseInt(searchParams.get('limit') || '24')
  const offset = parseInt(searchParams.get('offset') || '0')
  const min_price = searchParams.get('min_price')
  const max_price = searchParams.get('max_price')
  
  const supabase = createClient()
  
  let query = supabase
    .from('products')
    .select(`
      id, sku, slug, title, category, 
      price_usd, price_gbp, price_eur,
      width_cm, length_cm,
      region, status,
      is_one_of_one, is_new_arrival, is_featured,
      primary_image_url,
      weavers(id, name, slug),
      cooperatives(id, name, region)
    `)
    .eq('status', status)
    .order(sort, { ascending: order === 'asc' })
    .range(offset, offset + limit - 1)
  
  if (category) query = query.eq('category', category)
  if (min_price) query = query.gte('price_usd', min_price)
  if (max_price) query = query.lte('price_usd', max_price)
  
  const { data, error, count } = await query
  
  if (error) return NextResponse.json({ error }, { status: 500 })
  
  return NextResponse.json({ 
    data, 
    total: count,
    limit,
    offset 
  }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  })
}
```

---

## 7. COMPONENT LIBRARY

### 7.1 File Structure

```
src/
  components/
    layout/
      Navbar.tsx           Top navigation (transparent → solid on scroll)
      NavMobile.tsx        Hamburger drawer
      Footer.tsx           Dark footer with motif pattern
      CartDrawer.tsx       Right-side cart drawer
    
    product/
      ProductCard.tsx      Grid card (3:4, hover states)
      ProductGrid.tsx      Responsive grid with filters
      ProductFilters.tsx   Category + price range + region filters
      ProductGallery.tsx   Image swiper with zoom
      ProductInfo.tsx      Right-column product details
      ProductSpecs.tsx     DM Mono spec table
      ProductBadge.tsx     "Only 1 Left" / "New Arrival" badges
      QuickView.tsx        Modal quick view
      RelatedProducts.tsx  "You May Also Love" section
      WishlistButton.tsx   Heart toggle
    
    weaver/
      WeaverCard.tsx       Weaver portrait card
      WeaverHero.tsx       Full-bleed profile hero
      WeaverStory.tsx      Editorial bio section
    
    cart/
      CartItem.tsx
      CartSummary.tsx
      CartEmpty.tsx
    
    checkout/
      CheckoutForm.tsx
      AddressForm.tsx
      PaymentForm.tsx      Stripe Elements
      OrderConfirmation.tsx
    
    ui/
      Button.tsx           Primary / Secondary / Ghost variants
      Tag.tsx              Category / status badges
      Input.tsx
      Textarea.tsx
      Select.tsx
      Modal.tsx
      Accordion.tsx        Product detail accordions
      DiamondDivider.tsx   Tifinagh-inspired section divider
      MotifBackground.tsx  Geometric watermark SVG
      LoadingSpinner.tsx
      Toast.tsx            via Sonner
    
    homepage/
      HeroSplit.tsx        Split-screen hero
      CategoryPills.tsx    Horizontal scroll chips
      OriginSection.tsx    Atlas map + stats
      FeaturedWeaver.tsx
      CraftProcess.tsx     3-step process
      PressLogos.tsx
      Newsletter.tsx
    
    seo/
      JsonLd.tsx           Structured data injection
      Breadcrumbs.tsx
      ProductSchema.tsx
      OrganizationSchema.tsx
```

### 7.2 ProductCard Component

```tsx
// components/product/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, ArrowRight } from 'phosphor-react'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product: {
    id: string
    slug: string
    title: string
    sku: string
    category: string
    price_usd: number
    width_cm: number
    length_cm: number
    region: string
    status: string
    is_one_of_one: boolean
    is_new_arrival: boolean
    primary_image_url: string
    weavers?: { name: string; slug: string } | null
  }
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const categoryLabel: Record<string, string> = {
    beni_ourain: 'Beni Ourain',
    azilal: 'Azilal',
    kilim: 'Kilim',
    boucherouite: 'Boucherouite',
    bespoke: 'Bespoke',
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-rug overflow-hidden bg-bone">
        <Image
          src={product.primary_image_url}
          alt={`${product.title} — ${categoryLabel[product.category]} rug woven by ${product.weavers?.name}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-700",
            isHovered && "scale-105"
          )}
          priority={priority}
        />

        {/* Only 1 Left badge */}
        {product.is_one_of_one && product.status === 'available' && (
          <span className="absolute top-3 left-3 tag-cta text-[8px]">
            Only 1 Left
          </span>
        )}

        {/* New arrival */}
        {product.is_new_arrival && (
          <span className="absolute top-3 right-3 tag text-[8px]">
            New
          </span>
        )}

        {/* Hover overlay */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 bg-night/88 py-3 px-4",
          "transition-transform duration-200",
          isHovered ? "translate-y-0" : "translate-y-full"
        )}>
          <span className="text-label-sm text-bone/80 uppercase tracking-widest">
            Quick View · See in Room
          </span>
        </div>

        {/* Wishlist button */}
        <button
          className="absolute top-3 right-3 p-1.5 rounded-full transition-colors"
          onClick={(e) => {
            e.preventDefault()
            setIsWishlisted(!isWishlisted)
          }}
          aria-label="Add to wishlist"
        >
          <Heart
            weight={isWishlisted ? "fill" : "light"}
            size={18}
            className={isWishlisted ? "text-clay" : "text-smoke"}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Category + region */}
        <p className="text-label-sm text-smoke uppercase tracking-widest mb-1.5">
          {categoryLabel[product.category]} · {product.region}
        </p>

        {/* Title */}
        <h3 className="font-display text-[17px] text-night leading-tight mb-1">
          {product.title}
        </h3>

        {/* Weaver credit */}
        {product.weavers && (
          <p className="text-[11px] text-smoke italic mb-4">
            Woven by {product.weavers.name}
          </p>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[17px] text-night">
            ${product.price_usd.toLocaleString()}
          </span>
          <span className={cn(
            "text-label-sm uppercase tracking-wider transition-all duration-200",
            isHovered
              ? "bg-argane text-bone px-3 py-1.5 rounded-brand"
              : "text-argane border-b border-argane/60"
          )}>
            Add to Cart
          </span>
        </div>
      </div>
    </Link>
  )
}
```

### 7.3 DiamondDivider Component

```tsx
// components/ui/DiamondDivider.tsx
export function DiamondDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-bone2" />
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="1"
          y="7"
          width="8.485"
          height="8.485"
          rx="0.5"
          transform="rotate(-45 1 7)"
          stroke="#8C4A30"
          strokeWidth="0.8"
        />
        <rect
          x="3.5"
          y="7"
          width="4.95"
          height="4.95"
          transform="rotate(-45 3.5 7)"
          fill="#8C4A30"
          fillOpacity="0.2"
        />
      </svg>
      <div className="flex-1 h-px bg-bone2" />
    </div>
  )
}
```

---

## 8. AUTHENTICATION & USER SYSTEM

### 8.1 Supabase Auth Setup

```typescript
// lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set(name, value, options) { cookieStore.set({ name, value, ...options }) },
        remove(name, options) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )
}
```

### 8.2 Auth Flow

```
Sign Up → Email verification → Profile creation (trigger via DB function)
Sign In → Email + Password OR Google OAuth
Reset Password → Email link
Guest Checkout → Email capture only, no account required
Account creation offered post-purchase
```

### 8.3 Auth Middleware

```typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } })
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { /* ... */ } }
  )
  await supabase.auth.getSession()
  
  // Protect /account routes
  if (request.nextUrl.pathname.startsWith('/account')) {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }
  return response
}

export const config = {
  matcher: ['/account/:path*', '/checkout/:path*'],
}
```

---

## 9. E-COMMERCE LOGIC

### 9.1 Cart (Zustand + localStorage)

```typescript
// store/cart.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  productId: string
  sku: string
  title: string
  price_usd: number
  image_url: string
  weaverName?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Each rug is unique — prevent duplicates
        if (state.items.find(i => i.productId === item.productId)) return state
        return { items: [...state.items, item] }
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.price_usd, 0),
      count: () => get().items.length,
    }),
    { name: 'azarbi-cart' }
  )
)
```

### 9.2 Checkout Flow

```
1. Cart review (/cart)
      ↓
2. Contact info (email, name)
      ↓
3. Shipping address (with country selector — multi-currency)
      ↓
4. Shipping method (DHL Express / Standard)
      ↓
5. Payment (Stripe Elements — card + Apple Pay + Google Pay)
      ↓
6. Order confirmation (email via Resend + /checkout/success)
      ↓
7. Mark products as 'reserved' in DB immediately on intent creation
   Mark 'sold' on Stripe webhook confirmation
```

### 9.3 Inventory Logic

```typescript
// lib/inventory.ts
// Since all rugs are one-of-one, we manage status strictly

export async function reserveProduct(productId: string, orderId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('products')
    .update({ status: 'reserved', updated_at: new Date().toISOString() })
    .eq('id', productId)
    .eq('status', 'available')  // Only reserve if still available
  
  if (error) throw new Error('Product no longer available')
}

export async function markAsSold(productId: string) {
  const supabase = createClient()
  await supabase
    .from('products')
    .update({ status: 'sold', updated_at: new Date().toISOString() })
    .eq('id', productId)
}
```

### 9.4 Pricing & Currency

```typescript
// lib/pricing.ts
export const CURRENCY_CONFIG = {
  USD: { symbol: '$', locale: 'en-US' },
  GBP: { symbol: '£', locale: 'en-GB' },
  EUR: { symbol: '€', locale: 'de-DE' },
  AED: { symbol: 'AED', locale: 'ar-AE' },
}

// Detect currency from Vercel geo headers
export function getCurrencyFromCountry(country: string): string {
  const map: Record<string, string> = {
    US: 'USD', CA: 'USD',
    GB: 'GBP',
    AE: 'AED', SA: 'AED', QA: 'AED',
    DE: 'EUR', FR: 'EUR', NL: 'EUR', IT: 'EUR', ES: 'EUR',
  }
  return map[country] || 'USD'
}
```

---

## 10. SEO ARCHITECTURE

### 10.1 SEO Strategy Summary

Based on research into luxury handmade rug SEO and e-commerce best practices:

**Core SEO Pillars:**
1. **Product schema markup** drives 20–30% higher CTR via rich results
2. **Long-tail keyword targeting** for specific rug types outperforms generic terms
3. **Editorial content** (journal) builds topical authority and backlinks
4. **Page speed** is a direct ranking signal — target Core Web Vitals: LCP < 2.5s, CLS < 0.1
5. **International hreflang** for US, UK, UAE, and EU markets

### 10.2 Keyword Strategy

**Tier 1 — High Intent (Product Pages):**
```
"beni ourain rug"                  ~8,100/mo
"moroccan berber rug"              ~6,600/mo
"handmade moroccan rug"            ~5,400/mo
"azilal rug"                       ~1,900/mo
"kilim rug authentic"              ~2,400/mo
"boucherouite rug"                 ~880/mo
"authentic moroccan rug buy"       ~720/mo
"handwoven wool rug luxury"        ~590/mo
```

**Tier 2 — Consideration (Collection + Category Pages):**
```
"moroccan rug living room"         ~4,400/mo
"berber rug white wool"            ~3,600/mo
"atlas mountains rug"              ~1,200/mo
"fair trade moroccan rug"          ~590/mo
"wool rug handmade atlas"          ~480/mo
```

**Tier 3 — Discovery (Journal / Editorial):**
```
"how to style a moroccan rug"
"beni ourain vs azilal rug"
"moroccan rug care guide"
"what is a berber rug"
"amazigh weaving tradition"
"atlas mountains cooperative"
```

**Tier 4 — Long-tail (High conversion):**
```
"large beni ourain rug 8x10"
"authentic kilim rug from morocco"
"hand-spun wool berber rug"
"fair trade rug atlas mountains morocco"
"buy beni ourain rug direct from morocco"
```

### 10.3 Meta Tags — next-seo Configuration

```typescript
// app/layout.tsx — Default SEO
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://azarbi.com'),
  title: {
    template: '%s | Azarbi — Handwoven Berber Rugs from Morocco',
    default: 'Azarbi — Authentic Handwoven Moroccan Berber Rugs | Direct from Atlas Mountains',
  },
  description: 'Authentic handwoven Berber rugs from Atlas Mountains cooperatives. Beni Ourain, Azilal, Kilim, and Boucherouite — each rug unique, fair trade, woven by Amazigh women. Free shipping to US, UK, EU.',
  keywords: [
    'berber rugs', 'moroccan rug', 'beni ourain rug', 'azilal rug',
    'handwoven rug', 'atlas mountains', 'fair trade rug', 'amazigh weaving',
    'kilim rug', 'boucherouite rug', 'authentic moroccan rug', 'wool rug'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://azarbi.com',
    siteName: 'Azarbi',
    images: [{
      url: '/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'Azarbi — Handwoven Berber Rugs from the Atlas Mountains',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@azarbi',
    creator: '@azarbi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://azarbi.com',
    languages: {
      'en-US': 'https://azarbi.com',
      'en-GB': 'https://azarbi.co.uk',
      'fr': 'https://azarbi.com/fr',
    },
  },
  verification: {
    google: 'GOOGLE_SEARCH_CONSOLE_TOKEN',
  },
}
```

```typescript
// app/products/[slug]/page.tsx — Product Page SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  
  return {
    title: `${product.title} — ${product.category_label} Rug from ${product.region}`,
    description: `Authentic ${product.category_label} rug (${product.width_cm}×${product.length_cm}cm). ${product.material_pile}. Woven by ${product.weavers?.name} in ${product.region}, Morocco. One of a kind. Fair trade. $${product.price_usd.toLocaleString()}.`,
    openGraph: {
      images: [{ url: product.primary_image_url, width: 1200, height: 900 }],
      type: 'og:product',
    },
  }
}
```

### 10.4 Structured Data (JSON-LD Schema Markup)

```tsx
// components/seo/ProductSchema.tsx
// Implements Product + Offer + Organization schema
// JSON-LD via next/head — Google's preferred format

interface ProductSchemaProps {
  product: {
    id: string
    slug: string
    title: string
    description: string
    sku: string
    price_usd: number
    status: string
    primary_image_url: string
    gallery_image_urls: string[]
    material_pile: string
    width_cm: number
    length_cm: number
    weavers?: { name: string }
    cooperatives?: { name: string; region: string }
  }
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "sku": product.sku,
    "mpn": product.sku,
    "image": [product.primary_image_url, ...(product.gallery_image_urls || [])],
    "url": `https://azarbi.com/products/${product.slug}`,
    "brand": {
      "@type": "Brand",
      "name": "Azarbi"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.cooperatives?.name || "Atlas Mountains Cooperative",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MA",
        "addressRegion": product.cooperatives?.region || "High Atlas"
      }
    },
    "material": product.material_pile,
    "countryOfOrigin": "Morocco",
    "isSimilarTo": {
      "@type": "Product",
      "name": "Handwoven Moroccan Berber Rug"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://azarbi.com/products/${product.slug}`,
      "priceCurrency": "USD",
      "price": product.price_usd,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": product.status === 'available'
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Azarbi"
      },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": 0
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "businessDays": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"]
          },
          "cutoffTime": "17:00:00+01:00",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 5,
            "maxValue": 14,
            "unitCode": "DAY"
          }
        }
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

```tsx
// components/seo/OrganizationSchema.tsx
// Used in app/layout.tsx — sitewide
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Azarbi",
    "alternateName": "Azarbi — Handwoven Berber Rugs",
    "url": "https://azarbi.com",
    "logo": "https://azarbi.com/logo.png",
    "description": "Authentic handwoven Berber rugs from Atlas Mountains cooperatives, directly from Amazigh women weavers in Morocco.",
    "foundingDate": "2022",
    "foundingLocation": {
      "@type": "Place",
      "name": "Marrakech, Morocco"
    },
    "areaServed": ["US","GB","AE","DE","FR","NL"],
    "contactPoint": [{
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English","French","Arabic"],
      "contactOption": "TollFree"
    }],
    "sameAs": [
      "https://www.instagram.com/azarbi",
      "https://www.pinterest.com/azarbi",
      "https://www.tiktok.com/@azarbi"
    ]
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

```tsx
// components/seo/BreadcrumbSchema.tsx
interface BreadcrumbItem {
  name: string
  url: string
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### 10.5 Sitemap Generation

```typescript
// next-sitemap.config.js
module.exports = {
  siteUrl: 'https://azarbi.com',
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ['/account', '/checkout', '/cart', '/api/*'],
  additionalPaths: async (config) => {
    // Dynamically add all product + weaver + journal slugs from Supabase
    const products = await fetchAllProductSlugs()
    const weavers = await fetchAllWeaverSlugs()
    const posts = await fetchAllPostSlugs()
    
    return [
      ...products.map(s => ({ loc: `/products/${s}`, priority: 0.9 })),
      ...weavers.map(s => ({ loc: `/weavers/${s}`, priority: 0.7 })),
      ...posts.map(s => ({ loc: `/journal/${s}`, priority: 0.6 })),
    ]
  },
  robotsTxtOptions: {
    additionalSitemaps: ['https://azarbi.com/sitemap-products.xml'],
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/account', '/checkout', '/api'] },
    ],
  },
}
```

### 10.6 URL Slugs — SEO-Optimised Pattern

```
Product slugs:
  /products/beni-ourain-diamond-lattice-no114-high-atlas
  /products/kilim-saffron-horizon-no078-ouarzazate

Collection slugs:
  /collections/beni-ourain-rugs           (NOT /collections/beni_ourain)
  /collections/handmade-kilim-rugs
  /collections/azilal-berber-rugs

Journal slugs:
  /journal/how-to-style-a-moroccan-rug-in-a-modern-interior
  /journal/beni-ourain-vs-azilal-rug-guide
  /journal/atlas-mountains-weaving-cooperatives
```

### 10.7 Core Web Vitals Optimisation

```typescript
// Performance rules for the build:

// 1. Images — always use next/image with correct sizing
<Image
  src={url}
  alt="Descriptive alt with rug type and weaver name"
  width={800}
  height={1067}         // 3:4 ratio
  sizes="(max-width: 768px) 100vw, 33vw"
  quality={85}
  placeholder="blur"
  blurDataURL={blurHash} // Generate on upload via sharp
  priority={isAboveFold}
/>

// 2. Fonts — preconnect + display:swap
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
// Use font-display: swap in @font-face

// 3. LCP target: Hero image must be < 2.5s
// Add priority={true} to hero image — disables lazy loading

// 4. Static generation for all product pages
export async function generateStaticParams() {
  const slugs = await fetchAllProductSlugs()
  return slugs.map(slug => ({ slug }))
}

// 5. ISR — revalidate product pages every 60s
export const revalidate = 60
```

### 10.8 hreflang for International Markets

```typescript
// In generateMetadata for all pages
alternates: {
  canonical: `https://azarbi.com${path}`,
  languages: {
    'en-US': `https://azarbi.com${path}`,
    'en-GB': `https://azarbi.co.uk${path}`,
    'fr-FR': `https://azarbi.com/fr${path}`,
    'x-default': `https://azarbi.com${path}`,
  }
}
```

### 10.9 Content SEO — Journal Strategy

Minimum 2 journal posts/month targeting Tier 3 keywords:

| Post Title | Target Keyword | Search Intent |
|---|---|---|
| "What Is a Beni Ourain Rug? A Complete Guide" | beni ourain rug guide | Informational |
| "Beni Ourain vs Azilal: What's the Difference?" | beni ourain vs azilal | Comparison |
| "How to Care for Your Moroccan Wool Rug" | moroccan rug care | How-to |
| "What Is Fair Trade Carpet? Our Standards" | fair trade rug | Trust-building |
| "How to Style a Berber Rug in a Modern Home" | style moroccan rug | Inspirational |
| "The Amazigh Weaving Tradition Explained" | amazigh weaving | Cultural |
| "How to Choose a Rug Size for Your Room" | rug size guide | How-to |

---

## 11. PERFORMANCE REQUIREMENTS

### 11.1 Core Web Vitals Targets

| Metric | Target | Notes |
|--------|--------|-------|
| LCP | < 2.5s | Hero image preload + priority flag |
| FID / INP | < 100ms | Minimal JS on homepage |
| CLS | < 0.1 | Reserve image dimensions, no layout shifts |
| FCP | < 1.8s | Preconnect fonts, minimal blocking CSS |
| TTFB | < 600ms | Vercel Edge Network + Supabase connection pooling |

### 11.2 Image Optimisation Pipeline

```typescript
// lib/images.ts
// When uploading to Supabase Storage, process with sharp:
// 1. Resize to max 2400px on longest edge
// 2. Convert to WebP with quality 85
// 3. Generate blurhash for placeholder
// 4. Generate thumbnail (400px) for grid
// 5. Store all in Supabase Storage with CDN

import sharp from 'sharp'
import { encode as encodeBlurhash } from 'blurhash'

export async function processProductImage(buffer: Buffer) {
  const [full, thumb] = await Promise.all([
    sharp(buffer).resize(2400, 3200, { fit: 'inside' }).webp({ quality: 85 }).toBuffer(),
    sharp(buffer).resize(400, 533, { fit: 'cover' }).webp({ quality: 80 }).toBuffer(),
  ])
  // Upload both to Supabase Storage
  // Return URLs + blurhash
}
```

---

## 12. INTERNATIONALIZATION

### 12.1 Currencies

Detect user country via Vercel's `x-vercel-ip-country` header. Store cart prices in USD, display converted.

```
US, CA → USD ($)
GB → GBP (£)
AE, SA, QA, KW → AED (د.إ)
EU countries → EUR (€)
All others → USD ($)
```

### 12.2 Shipping Zones

```
Zone 1 (US domestic):      $0 free (orders > $500) / $45 DHL Express
Zone 2 (UK):               £45 DHL Express
Zone 3 (Western Europe):   €55 DHL Express
Zone 4 (UAE + Gulf):       AED 120 DHL Express
Zone 5 (Rest of World):    $85 USD DHL Express
```

### 12.3 WhatsApp CTA

```
For UAE/Gulf users: show WhatsApp CTA prominently in navbar
Pre-filled message: "Hi Azarbi, I'm interested in [product name] (Ref: [SKU]). Can you tell me more?"
WhatsApp number: +212-XXX-XXXXXX (Morocco)
```

---

## 13. AI AGENT BUILD PROMPT

Copy the following prompt exactly when uploading this PRD to an AI coding agent (Cursor, Windsurf, Replit, or Claude Code):

---

```
You are a senior full-stack developer specialising in Next.js 14, Supabase, and Tailwind CSS. 
You will build the complete Azarbi e-commerce website from the attached PRD.

BRAND: Azarbi (means "rugs" in Tamazight/Amazigh language)
PRODUCT: Premium handwoven Moroccan Berber rugs, $300–$5,000, sold direct from Atlas Mountains cooperatives

─────────────────────────────────────
TECH STACK (do not deviate from this)
─────────────────────────────────────
- Next.js 14+ with App Router and TypeScript (strict mode)
- Supabase for database (PostgreSQL) and auth and storage
- Drizzle ORM for type-safe database queries
- Tailwind CSS with the custom token config in Section 3.1 of the PRD
- Framer Motion for animations (hero fade-in only — no excessive animations)
- Phosphor React for all icons (weight="light", size=18 as default)
- Zustand for cart state (persisted in localStorage)
- Stripe for payments
- Resend for transactional emails
- next-sitemap for SEO sitemaps

─────────────────────────────────────
FONTS (load from Google Fonts)
─────────────────────────────────────
- Display/Headings: Fraunces (variable, weights 300–500, optical sizing on)
- Interface/Body: Josefin Sans (weights 300 and 400)
- Mono/Specs: DM Mono (weight 400)

─────────────────────────────────────
DESIGN RULES (non-negotiable)
─────────────────────────────────────
1. Background colour: #F4EFE5 (Wool Linen) — NEVER pure white #FFFFFF
2. Text colour: #1C1815 (Medina Night) — NEVER pure black
3. Primary CTA button colour: #3C5D4E (Argane green)
4. All border-radius values: 1px (brand) or 2px (input fields) — NO soft corners on cards or buttons
5. NO box-shadow anywhere on the site
6. NO pure white background surfaces — use #FDFAF6 or #F4EFE5
7. All product cards use 3:4 portrait aspect ratio (aspect-rug in Tailwind)
8. Section dividers use the SVG diamond motif (DiamondDivider component from PRD Section 7.3)
9. Navigation: transparent on hero scroll-top → #F4EFE5 background at 48px scroll
10. Cards: 0.5px border on #D9CFBF default, transitions to #8C4A30 on hover — duration 200ms ease
11. ALL caps labels use Josefin Sans 400, tracking-widest (letter-spacing: 0.18em)
12. Price display always uses DM Mono font
13. Image alt text MUST include rug type + weaver name for SEO
14. Mobile: single-column product grid on screens < 480px — NEVER 2-column on phones

─────────────────────────────────────
BUILD ORDER
─────────────────────────────────────
Build in this exact sequence:

PHASE 1 — Foundation
1. Next.js project scaffold with TypeScript strict mode
2. tailwind.config.ts with all tokens from PRD Section 3.1
3. globals.css with all CSS variables and component classes from PRD Section 3.2
4. Google Fonts loading in app/layout.tsx (Fraunces + Josefin Sans + DM Mono)
5. Supabase client setup (server + browser clients from PRD Section 8.1)
6. Full database schema SQL from PRD Section 5.1 (run against Supabase)
7. Drizzle schema TypeScript file mirroring the SQL schema
8. Environment variables template (.env.local.example)

PHASE 2 — Shared Layout
9. Navbar component (transparent/solid, mobile hamburger drawer, cart pill)
10. Footer component (dark #1C1815 background, geometric Tifinagh motif texture)
11. CartDrawer component (Zustand store from PRD Section 9.1)
12. DiamondDivider component (SVG from PRD Section 7.3)
13. All base UI components: Button, Tag, Input, Modal, Accordion

PHASE 3 — Product System
14. /api/products route (with filters: category, price range, status)
15. /api/products/[slug] route
16. ProductCard component (exactly as specified in PRD Section 7.2)
17. ProductGrid component (3-col desktop, 2-col tablet, 1-col mobile)
18. ProductFilters component
19. /products/[slug] page with full layout from PRD Section 4.2
20. ProductSchema JSON-LD component from PRD Section 10.4
21. BreadcrumbSchema component

PHASE 4 — Collections
22. /collections page (all categories)
23. /collections/[category] page with filtered grid

PHASE 5 — Weavers
24. /weavers page (grid of all weavers)
25. /weavers/[slug] individual weaver profile page

PHASE 6 — Homepage
26. HeroSplit component (split-screen, Framer Motion fade-in)
27. CategoryPills component (horizontal scroll)
28. OriginSection component (Atlas map + cooperative stats)
29. FeaturedWeaver component
30. CraftProcess component (3-step)
31. PressLogos component
32. Newsletter component
33. Full homepage composition

PHASE 7 — Commerce
34. /cart page
35. /checkout flow (3 steps: contact → address → payment)
36. Stripe integration (payment intent API routes)
37. Stripe webhook handler (mark products as sold)
38. Order confirmation page + email via Resend

PHASE 8 — Auth & Account
39. Sign in / sign up pages (Supabase Auth)
40. /account page (profile + order history + wishlist)
41. Middleware protection for /account routes

PHASE 9 — Content
42. /journal listing page
43. /journal/[slug] article page
44. /bespoke enquiry form + API route
45. /about page
46. /care-guide page
47. /size-guide page (with room size calculator)

PHASE 10 — SEO & Performance
48. next-sitemap configuration from PRD Section 10.5
49. robots.txt
50. OrganizationSchema in layout.tsx
51. Open Graph images (app/og route)
52. generateStaticParams for all product/weaver/journal pages
53. ISR revalidation (60s on product pages)
54. Image optimisation pipeline (sharp + WebP + blurhash)
55. Lighthouse audit — must score > 90 on Performance and > 95 on SEO

─────────────────────────────────────
SEO REQUIREMENTS (from PRD Section 10)
─────────────────────────────────────
Every product page MUST have:
- Unique <title>: "[Product Title] — [Category] Rug from [Region] | Azarbi"
- Meta description including: category, dimensions, material, weaver name, price, "one of a kind"
- ProductSchema JSON-LD with: name, sku, image array, price, availability, shippingDetails, material, countryOfOrigin
- BreadcrumbList JSON-LD: Home → Collections → [Category] → [Product Name]
- Image alt text: "Authentic [category] rug, woven by [weaver name] in [region], Morocco"
- canonical URL
- Open Graph product image (1200×900px from primary product image)

Every collection page MUST have:
- CollectionPage schema
- Unique title targeting the category keyword (e.g. "Authentic Beni Ourain Rugs | Atlas Mountains | Azarbi")
- Meta description targeting the collection keyword with USP

─────────────────────────────────────
WHATSAPP CTA
─────────────────────────────────────
On product pages and /bespoke:
- Sticky bottom bar on mobile (appears after 50% scroll)
- Background: #3C5D4E (Argane)
- Phosphor WhatsappLogo icon weight="fill" size=20 in #E6DDD1
- Text: "Chat about this rug — Usually replies in 2 hrs"
- Pre-filled message: "Hi Azarbi! I'm interested in [product.title] (Ref: [product.sku]). Can I ask a few questions?"

─────────────────────────────────────
SUPABASE STORAGE BUCKETS
─────────────────────────────────────
Create these buckets (all public):
- product-images (rug photography)
- weaver-portraits
- cooperative-images
- journal-images
- brand-assets (logo, press, OG)

─────────────────────────────────────
ENVIRONMENT VARIABLES NEEDED
─────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=https://azarbi.com
WHATSAPP_NUMBER=+212XXXXXXXXX

─────────────────────────────────────
DELIVERABLES
─────────────────────────────────────
1. Full Next.js application with all pages from PRD Section 4.1
2. Supabase migration SQL file (ready to run)
3. Seed data file with 12 sample products across all 4 categories, 4 weavers, 2 cooperatives
4. .env.local.example file
5. README.md with setup instructions
6. Vercel deployment configuration (vercel.json)

Start with Phase 1. After completing each phase, confirm before proceeding. 
Ask clarifying questions only if something in the PRD is genuinely ambiguous — do not ask for information that is already in this document.
```

---

## APPENDIX A — Sample Seed Data

```sql
-- Seed: 2 cooperatives
INSERT INTO cooperatives (name, slug, region, village, founded_year, weaver_count, description) VALUES
('Aït Benhaddou Collective', 'ait-benhaddou-collective', 'High Atlas', 'Aït Benhaddou', 2008, 45, 'A collective of 45 Amazigh women in the Kasbah region, specialising in Beni Ourain and natural-dye Azilal.'),
('Draa Valley Weavers', 'draa-valley-weavers', 'Draa Valley', 'Ouarzazate', 2011, 38, 'Kilim and Boucherouite specialists from the pre-Saharan Atlas foothills.');

-- Seed: 4 weavers
INSERT INTO weavers (name, slug, cooperative_id, bio, years_weaving, specialties) VALUES
('Fatima Ait Brahim', 'fatima-ait-brahim', (SELECT id FROM cooperatives WHERE slug = 'ait-benhaddou-collective'), 'Third-generation weaver. The diamond motif in her Beni Ourain rugs traces back to her grandmother''s interpretation of Tifinagh script. She taught herself natural mineral dyeing at 19.', 22, ARRAY['beni_ourain','azilal']),
('Malika Boumhidi', 'malika-boumhidi', (SELECT id FROM cooperatives WHERE slug = 'draa-valley-weavers'), 'Malika learned Kilim weaving from her aunt, an approach that skips the pile entirely in favour of geometric flat-weave bands. Her colour combinations reference the saffron fields of the Draa Valley.', 17, ARRAY['kilim']),
('Khadija Oulhaj', 'khadija-oulhaj', (SELECT id FROM cooperatives WHERE slug = 'ait-benhaddou-collective'), 'Specialises in Boucherouite — recycled textile rugs. Every piece repurposes discarded fabric, and each colour reflects material available that season, making every rug impossible to replicate.', 14, ARRAY['boucherouite']),
('Zahra Tachfine', 'zahra-tachfine', (SELECT id FROM cooperatives WHERE slug = 'ait-benhaddou-collective'), 'Her Azilal rugs are known for unusually abstract symbols — personal pictographs she has developed over 19 years that document her family history. Each motif has a specific meaning only she can decode.', 19, ARRAY['azilal','beni_ourain']);
```

---

## APPENDIX B — File Structure

```
azarbi/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, metadata, OrgSchema
│   ├── page.tsx                    # Homepage
│   ├── globals.css
│   ├── (shop)/
│   │   ├── collections/
│   │   │   ├── page.tsx
│   │   │   └── [category]/
│   │   │       └── page.tsx
│   │   └── products/
│   │       └── [slug]/
│   │           └── page.tsx
│   ├── (content)/
│   │   ├── journal/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── weavers/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── about/page.tsx
│   │   ├── cooperatives/page.tsx
│   │   ├── bespoke/page.tsx
│   │   ├── care-guide/page.tsx
│   │   ├── size-guide/page.tsx
│   │   └── trade/page.tsx
│   ├── (auth)/
│   │   ├── sign-in/page.tsx
│   │   ├── sign-up/page.tsx
│   │   └── account/
│   │       ├── page.tsx
│   │       ├── orders/page.tsx
│   │       └── wishlist/page.tsx
│   ├── (commerce)/
│   │   ├── cart/page.tsx
│   │   ├── checkout/
│   │   │   ├── page.tsx
│   │   │   └── success/page.tsx
│   │   └── search/page.tsx
│   └── api/
│       ├── products/route.ts
│       ├── products/[slug]/route.ts
│       ├── products/search/route.ts
│       ├── collections/[category]/route.ts
│       ├── weavers/route.ts
│       ├── weavers/[slug]/route.ts
│       ├── cart/route.ts
│       ├── wishlist/route.ts
│       ├── checkout/create-intent/route.ts
│       ├── checkout/confirm/route.ts
│       ├── checkout/webhook/route.ts
│       ├── orders/route.ts
│       ├── bespoke/route.ts
│       ├── newsletter/route.ts
│       └── journal/route.ts
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── NavMobile.tsx
│   │   ├── Footer.tsx
│   │   └── CartDrawer.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── ProductSpecs.tsx
│   │   ├── ProductBadge.tsx
│   │   ├── QuickView.tsx
│   │   ├── RelatedProducts.tsx
│   │   └── WishlistButton.tsx
│   ├── weaver/
│   │   ├── WeaverCard.tsx
│   │   ├── WeaverHero.tsx
│   │   └── WeaverStory.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   └── CartEmpty.tsx
│   ├── checkout/
│   │   ├── CheckoutForm.tsx
│   │   ├── AddressForm.tsx
│   │   ├── PaymentForm.tsx
│   │   └── OrderConfirmation.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Tag.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Accordion.tsx
│   │   ├── DiamondDivider.tsx
│   │   ├── MotifBackground.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── WhatsAppCTA.tsx
│   ├── homepage/
│   │   ├── HeroSplit.tsx
│   │   ├── CategoryPills.tsx
│   │   ├── OriginSection.tsx
│   │   ├── FeaturedWeaver.tsx
│   │   ├── CraftProcess.tsx
│   │   ├── PressLogos.tsx
│   │   └── Newsletter.tsx
│   └── seo/
│       ├── ProductSchema.tsx
│       ├── OrganizationSchema.tsx
│       ├── BreadcrumbSchema.tsx
│       └── JournalSchema.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── server.ts
│   │   ├── browser.ts
│   │   └── middleware.ts
│   ├── db/
│   │   ├── schema.ts              # Drizzle schema
│   │   └── queries/
│   │       ├── products.ts
│   │       ├── weavers.ts
│   │       └── orders.ts
│   ├── stripe.ts
│   ├── pricing.ts
│   ├── inventory.ts
│   ├── images.ts                  # Sharp processing
│   └── utils.ts                   # cn(), formatPrice(), etc.
│
├── store/
│   ├── cart.ts                    # Zustand cart store
│   └── ui.ts                      # Zustand UI state (drawer open/close)
│
├── types/
│   ├── product.ts
│   ├── weaver.ts
│   ├── order.ts
│   └── supabase.ts                # Auto-generated from Supabase CLI
│
├── public/
│   ├── fonts/                     # Fallback fonts only
│   ├── images/
│   │   └── brand/
│   │       ├── logo.svg
│   │       ├── logo-light.svg
│   │       └── og-default.jpg
│   └── icons/
│       └── whatsapp.svg
│
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
├── next-sitemap.config.js
├── .env.local.example
└── README.md
```

---

*PRD Version 1.0 — Azarbi · ⴰⵣⴰⵔⴱⵉ · Atlas Mountains, Morocco*  
*Prepared for AI-assisted development. Stack: Next.js 14 + Supabase + Tailwind CSS*
