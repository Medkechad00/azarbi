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

-- Products: public read, admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "products_admin_write" ON products FOR ALL TO authenticated 
  USING (auth.jwt() ->> 'role' = 'admin');

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
