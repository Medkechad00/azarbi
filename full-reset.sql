-- ==============================================================================
-- 1. DROP ALL EXISTING PUBLIC TABLES SAFELY
-- ==============================================================================
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS bespoke_enquiries CASCADE;
DROP TABLE IF EXISTS journal_posts CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS product_views CASCADE;
DROP TABLE IF EXISTS wishlists CASCADE; 
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS weavers CASCADE;
DROP TABLE IF EXISTS cooperatives CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- ==============================================================================
-- 2. CREATE NEW SCHEMA (NO orders, NO profiles!)
-- ==============================================================================

CREATE TABLE cooperatives (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  region        TEXT NOT NULL,
  village       TEXT NOT NULL,
  coordinates   POINT,
  founded_year  INTEGER,
  weaver_count  INTEGER DEFAULT 0,
  description   TEXT,
  image_url     TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE weavers (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cooperative_id  UUID REFERENCES cooperatives(id),
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  bio             TEXT,
  years_weaving   INTEGER,
  specialties     TEXT[],
  portrait_url    TEXT,
  gallery_urls    TEXT[],
  featured        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku               TEXT UNIQUE NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  title             TEXT NOT NULL,
  category          TEXT NOT NULL CHECK (category IN 
                    ('beni_ourain','azilal','kilim','boucherouite','bespoke')),
  weaver_id         UUID REFERENCES weavers(id),
  cooperative_id    UUID REFERENCES cooperatives(id),
  price_usd         DECIMAL(10,2) NOT NULL,
  price_gbp         DECIMAL(10,2),
  price_eur         DECIMAL(10,2),
  price_aed         DECIMAL(10,2),
  width_cm          DECIMAL(6,1),
  length_cm         DECIMAL(6,1),
  pile_depth_cm     DECIMAL(4,1),
  weight_kg         DECIMAL(5,2),
  material_pile     TEXT,
  material_warp     TEXT,
  dye_type          TEXT CHECK (dye_type IN ('natural','mineral','synthetic','undyed')),
  region            TEXT NOT NULL,
  village           TEXT,
  weave_weeks       INTEGER,
  status            TEXT DEFAULT 'available' CHECK 
                    (status IN ('available','reserved','sold','coming_soon')),
  is_one_of_one     BOOLEAN DEFAULT TRUE,
  is_new_arrival    BOOLEAN DEFAULT FALSE,
  is_featured       BOOLEAN DEFAULT FALSE,
  description       TEXT,
  care_notes        TEXT,
  meta_title        TEXT,
  meta_description  TEXT,
  primary_image_url   TEXT NOT NULL,
  gallery_image_urls  TEXT[],
  purchase_url      TEXT,  -- ETSY CHECKOUT LINK
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_slug ON products(slug);

ALTER TABLE products 
ADD COLUMN search_vector TSVECTOR GENERATED ALWAYS AS (
  to_tsvector('english', coalesce(title,'') || ' ' || 
              coalesce(description,'') || ' ' || 
              coalesce(category,'') || ' ' || 
              coalesce(region,''))
) STORED;
CREATE INDEX idx_products_search ON products USING GIN(search_vector);

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
  inspiration_url TEXT,
  message         TEXT,
  source          TEXT,
  status          TEXT DEFAULT 'new' CHECK 
                  (status IN ('new','contacted','quoted','confirmed','declined')),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE journal_posts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  excerpt         TEXT,
  body            TEXT NOT NULL,
  cover_image_url TEXT,
  author          TEXT DEFAULT 'Azarbi Editorial',
  tags            TEXT[],
  published       BOOLEAN DEFAULT FALSE,
  published_at    TIMESTAMPTZ,
  meta_title        TEXT,
  meta_description  TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email       TEXT UNIQUE NOT NULL,
  source      TEXT,
  subscribed  BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_views (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID REFERENCES products(id) ON DELETE CASCADE,
  session_id  TEXT,
  country     TEXT,
  viewed_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products_public_read" ON products FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "products_admin_write" ON products FOR ALL TO authenticated 
  USING (auth.jwt() ->> 'role' = 'admin');

-- ==============================================================================
-- 3. INSERT SEED DATA
-- ==============================================================================

INSERT INTO cooperatives (id, name, slug, region, village, weaver_count, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Ait Haddidou Cooperative', 'ait-haddidou', 'Middle Atlas', 'Imilchil', 12, 'A women-led cooperative in Imilchil specialising in traditional Beni Ourain weaving techniques passed down for centuries.'),
('22222222-2222-2222-2222-222222222222', 'Tifaout Cooperative', 'tifaout', 'High Atlas', 'Ouarzazate', 8, 'The Tifaout collective is known for their vibrant Azilal rugs, using natural plant and mineral dyes sourced from the surrounding mountains.'),
('33333333-3333-3333-3333-333333333333', 'Aït Bouguemez Collective', 'ait-bouguemez', 'High Atlas', 'Tabant', 15, 'Nestled in the Happy Valley, this collective produces some of the finest flat-weave kilims in all of Morocco.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO weavers (id, cooperative_id, name, slug, bio, years_weaving, specialties, portrait_url, featured) VALUES
('aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111', 'Fatima Ait Haddou', 'fatima-ait-haddou',
 'Fatima has been weaving since she was 12 years old, learning the craft from her grandmother in the remote mountain village of Imilchil. Her Beni Ourain rugs are renowned for their perfectly executed diamond patterns and exceptionally dense pile.',
 25, ARRAY['beni_ourain', 'boucherouite'],
 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600&h=800', true),
('aaaa2222-aaaa-2222-aaaa-222222222222', '22222222-2222-2222-2222-222222222222', 'Aicha Bouzid', 'aicha-bouzid',
 'Aicha is a master of Azilal weaving, known for her bold use of colour and abstract symbolism. Each of her rugs tells a story of her family history through traditional Amazigh motifs passed down through generations.',
 18, ARRAY['azilal'],
 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600&h=800', false),
('aaaa3333-aaaa-3333-aaaa-333333333333', '33333333-3333-3333-3333-333333333333', 'Zahra Ouchen', 'zahra-ouchen',
 'Zahra specialises in flat-weave kilims using techniques inherited from her nomadic ancestors. Her work is characterised by incredibly precise geometric patterns and natural dyes sourced from the mountains around Tabant.',
 30, ARRAY['kilim'],
 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=800', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (sku, slug, title, category, weaver_id, cooperative_id, price_usd, width_cm, length_cm, pile_depth_cm, material_pile, region, status, is_one_of_one, is_new_arrival, is_featured, description, primary_image_url, purchase_url, gallery_image_urls) VALUES
('AZR-BO-001', 'atlas-diamond', 'Atlas Diamond', 'beni_ourain',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 1450, 180, 270, 2.5, '100% virgin wool', 'Middle Atlas', 'available', true, true, true,
 'A breathtaking Beni Ourain masterpiece featuring classic diamond lattice motifs on un-dyed ivory wool. Woven over 3 months by Fatima in Imilchil.',
 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=900&h=1200', 'https://www.etsy.com/listing/example-atlas-diamond', ARRAY['https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=900&h=1200']),

('AZR-BO-002', 'mermousa-cloud', 'Mermousa Cloud', 'beni_ourain',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 1850, 200, 300, 3.0, '100% Mermousa wool', 'Middle Atlas', 'available', true, false, false,
 'An exceptionally thick, cloud-like Beni Ourain with minimal linework. The deepest pile we have ever sourced.',
 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=900&h=1200', 'https://www.etsy.com/listing/example-mermousa-cloud', ARRAY[]::TEXT[]),

('AZR-AZ-001', 'carnival-prism', 'Carnival Prism', 'azilal',
 'aaaa2222-aaaa-2222-aaaa-222222222222', '22222222-2222-2222-2222-222222222222',
 980, 150, 240, 1.8, 'Wool with natural plant dyes', 'High Atlas', 'available', true, true, false,
 'An exuberant Azilal rug bursting with fuchsia, saffron and indigo abstract forms on a creamy ivory base.',
 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=900&h=1200', 'https://www.etsy.com/listing/example-carnival-prism', ARRAY[]::TEXT[]),

('AZR-AZ-002', 'desert-bloom', 'Desert Bloom', 'azilal',
 'aaaa2222-aaaa-2222-aaaa-222222222222', '22222222-2222-2222-2222-222222222222',
 1200, 170, 260, 2.0, 'Wool with mineral dyes', 'High Atlas', 'available', true, false, false,
 'Warm terracotta and ochre tones flow across this Azilal piece like desert wildflowers after spring rain.',
 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=900&h=1200', 'https://www.etsy.com/listing/example-desert-bloom', ARRAY[]::TEXT[]),

('AZR-KL-001', 'nomad-line', 'Nomad Line', 'kilim',
 'aaaa3333-aaaa-3333-aaaa-333333333333', '33333333-3333-3333-3333-333333333333',
 680, 160, 250, 0.3, 'Flat-weave wool', 'High Atlas', 'available', true, true, false,
 'A striking flat-weave kilim with razor-sharp geometric bands in charcoal, rust, and cream.',
 'https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?auto=format&fit=crop&q=80&w=900&h=1200', 'https://www.etsy.com/listing/example-nomad-line', ARRAY[]::TEXT[]),

('AZR-KL-002', 'ember-path', 'Ember Path', 'kilim',
 'aaaa3333-aaaa-3333-aaaa-333333333333', '33333333-3333-3333-3333-333333333333',
 750, 180, 280, 0.4, 'Flat-weave wool & cotton', 'High Atlas', 'available', true, false, false,
 'Deep burgundy and burnt orange bands create a warm pathway pattern.',
 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=900&h=1200', 'https://www.etsy.com/listing/example-ember-path', ARRAY[]::TEXT[]),

('AZR-BC-001', 'patchwork-sun', 'Patchwork Sun', 'boucherouite',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 520, 140, 220, 1.5, 'Recycled textiles', 'Middle Atlas', 'available', true, true, false,
 'An explosion of recycled colour — neon pinks, electric blues, and acid yellows woven into a joyful abstract composition.',
 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=900&h=1200', 'https://www.etsy.com/listing/example-patchwork-sun', ARRAY[]::TEXT[]),

('AZR-BC-002', 'neon-mirage', 'Neon Mirage', 'boucherouite',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 420, 130, 200, 1.2, 'Recycled cotton & synthetics', 'Middle Atlas', 'available', true, false, false,
 'Vibrant horizontal stripes of salvaged fabric create a dreamlike shimmering effect.',
 'https://images.unsplash.com/photo-1600573472556-e636c2acda9e?auto=format&fit=crop&q=80&w=900&h=1200', 'https://www.etsy.com/listing/example-neon-mirage', ARRAY[]::TEXT[])
ON CONFLICT (slug) DO NOTHING;

INSERT INTO journal_posts (title, slug, excerpt, body, cover_image_url, author, tags, published, published_at) VALUES
('The Art of Beni Ourain: A Living Tradition',
 'art-of-beni-ourain',
 'Deep in the Middle Atlas Mountains, Amazigh women continue a weaving tradition that stretches back over a thousand years.',
 '## A Heritage Woven in Wool ...',
 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d23?auto=format&fit=crop&q=80&w=1600',
 'Azarbi Editorial',
 ARRAY['craft', 'beni-ourain', 'tradition'],
 true,
 NOW())
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- 4. MAKE ADMIN (NO PROFILES TABLE USED)
-- ==============================================================================

-- ADMIN USER CREATION REMOVED FOR SECURITY
-- Create admin users via the Supabase dashboard or using fix-login.mjs with env vars:
--   ADMIN_EMAIL=... ADMIN_PASSWORD=... node fix-login.mjs
