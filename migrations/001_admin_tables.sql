-- ═══════════════════════════════════════════════════════════════
-- AZARBI ADMIN DASHBOARD — SQL Migration
-- Run this in Supabase Studio SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- NOTE: cooperatives, weavers, products tables already exist.
-- This migration:
--   1. Fixes the is_featured column bug on products
--   2. Creates orders, order_items, bespoke_enquiries, journal_posts, profiles


-- ═══ FIX: products.is_featured column ═══
-- The original schema had is_featured pointing to the same column as is_new_arrival.
-- Only run this if is_featured column does NOT already exist:
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'is_featured'
  ) THEN
    ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;
  END IF;
END $$;


-- ═══ PROFILES ═══
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  auth_user_id UUID UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  country TEXT,
  city TEXT,
  role TEXT NOT NULL DEFAULT 'customer',
  is_trade_account BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for auth user lookup
CREATE INDEX IF NOT EXISTS idx_profiles_auth_user_id ON profiles(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);


-- ═══ ORDERS ═══
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_id UUID REFERENCES profiles(id),
  status TEXT NOT NULL DEFAULT 'pending',

  subtotal_usd DECIMAL(10,2) NOT NULL,
  shipping_usd DECIMAL(10,2) DEFAULT 0,
  tax_usd DECIMAL(10,2) DEFAULT 0,
  total_usd DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',

  shipping_name TEXT,
  shipping_address_line1 TEXT,
  shipping_address_line2 TEXT,
  shipping_city TEXT,
  shipping_state TEXT,
  shipping_postal_code TEXT,
  shipping_country TEXT,

  carrier TEXT,
  tracking_number TEXT,

  stripe_payment_intent_id TEXT,
  stripe_payment_status TEXT,

  internal_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);


-- ═══ ORDER ITEMS ═══
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_usd DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);


-- ═══ BESPOKE ENQUIRIES ═══
CREATE TABLE IF NOT EXISTS bespoke_enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,

  category_preference TEXT,
  dimensions TEXT,
  colour_palette TEXT,
  pattern_style TEXT,
  budget_min DECIMAL(10,2),
  budget_max DECIMAL(10,2),
  timeline_weeks INTEGER,
  inspiration_url TEXT,
  message TEXT,
  source TEXT,

  status TEXT NOT NULL DEFAULT 'new',

  quote_amount DECIMAL(10,2),
  quote_lead_weeks INTEGER,
  quote_notes TEXT,

  linked_order_id UUID REFERENCES orders(id),
  internal_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_bespoke_status ON bespoke_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_bespoke_created_at ON bespoke_enquiries(created_at DESC);


-- ═══ JOURNAL POSTS ═══
CREATE TABLE IF NOT EXISTS journal_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  body TEXT,
  excerpt TEXT,
  cover_image_url TEXT,

  status TEXT NOT NULL DEFAULT 'draft',
  author TEXT DEFAULT 'Azarbi Editorial',
  tags TEXT[],

  meta_title TEXT,
  meta_description TEXT,

  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_journal_slug ON journal_posts(slug);
CREATE INDEX IF NOT EXISTS idx_journal_status ON journal_posts(status);


-- ═══ RLS POLICIES (basic — admin role has full access) ═══

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bespoke_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;

-- Admin full access policies
CREATE POLICY "Admin full access to profiles"
  ON profiles FOR ALL
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'operations', 'content')
    OR (auth.uid() = auth_user_id)
  );

CREATE POLICY "Admin full access to orders"
  ON orders FOR ALL
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'operations')
  );

CREATE POLICY "Admin full access to order_items"
  ON order_items FOR ALL
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'operations')
  );

CREATE POLICY "Admin full access to bespoke_enquiries"
  ON bespoke_enquiries FOR ALL
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'operations')
  );

CREATE POLICY "Admin full access to journal_posts"
  ON journal_posts FOR ALL
  USING (
    auth.jwt() ->> 'role' IN ('admin', 'super_admin', 'content')
  );

-- Public read for published journal posts
CREATE POLICY "Public read published journal posts"
  ON journal_posts FOR SELECT
  USING (status = 'published');
