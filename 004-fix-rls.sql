-- ==============================================================================
-- 004 — FIX RLS POLICIES FOR ALL TABLES
-- Ensures admin can read/write everything, and public can read where needed.
-- ==============================================================================

-- ─── CATEGORIES ────────────────────────────────────────────────────────────────
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "categories_public_read" ON categories;
DROP POLICY IF EXISTS "categories_admin_write" ON categories;
CREATE POLICY "categories_public_read" ON categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "categories_admin_write" ON categories FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'));

-- ─── PLATFORM SETTINGS ────────────────────────────────────────────────────────
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "settings_public_read" ON platform_settings;
DROP POLICY IF EXISTS "settings_admin_write" ON platform_settings;
CREATE POLICY "settings_public_read" ON platform_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "settings_admin_write" ON platform_settings FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin'));

-- ─── COOPERATIVES ──────────────────────────────────────────────────────────────
ALTER TABLE cooperatives ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "cooperatives_public_read" ON cooperatives;
DROP POLICY IF EXISTS "cooperatives_admin_write" ON cooperatives;
CREATE POLICY "cooperatives_public_read" ON cooperatives FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "cooperatives_admin_write" ON cooperatives FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'));

-- ─── WEAVERS ───────────────────────────────────────────────────────────────────
ALTER TABLE weavers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "weavers_public_read" ON weavers;
DROP POLICY IF EXISTS "weavers_admin_write" ON weavers;
CREATE POLICY "weavers_public_read" ON weavers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "weavers_admin_write" ON weavers FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'));

-- ─── PRODUCTS (keep existing, but ensure ALL is there for admin) ───────────────
-- Already has RLS enabled from full-reset.sql
DROP POLICY IF EXISTS "products_admin_write" ON products;
CREATE POLICY "products_admin_write" ON products FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'));

-- ─── BESPOKE ENQUIRIES ────────────────────────────────────────────────────────
ALTER TABLE bespoke_enquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "bespoke_public_insert" ON bespoke_enquiries;
DROP POLICY IF EXISTS "bespoke_admin_all" ON bespoke_enquiries;
CREATE POLICY "bespoke_public_insert" ON bespoke_enquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "bespoke_admin_all" ON bespoke_enquiries FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content'));

-- ─── JOURNAL POSTS ─────────────────────────────────────────────────────────────
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "journal_public_read" ON journal_posts;
DROP POLICY IF EXISTS "journal_admin_write" ON journal_posts;
CREATE POLICY "journal_public_read" ON journal_posts FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "journal_admin_write" ON journal_posts FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'content'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'content'));

-- ─── NEWSLETTER SUBSCRIBERS ───────────────────────────────────────────────────
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "newsletter_public_insert" ON newsletter_subscribers;
DROP POLICY IF EXISTS "newsletter_admin_all" ON newsletter_subscribers;
CREATE POLICY "newsletter_public_insert" ON newsletter_subscribers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "newsletter_admin_all" ON newsletter_subscribers FOR ALL TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations'))
  WITH CHECK ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations'));

-- ─── PRODUCT VIEWS ─────────────────────────────────────────────────────────────
ALTER TABLE product_views ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "views_public_insert" ON product_views;
DROP POLICY IF EXISTS "views_admin_read" ON product_views;
CREATE POLICY "views_public_insert" ON product_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "views_admin_read" ON product_views FOR SELECT TO authenticated
  USING ((auth.jwt() -> 'app_metadata' ->> 'role') IN ('admin', 'super_admin', 'operations', 'content', 'read_only'));

-- Done
SELECT 'RLS policies applied to all tables' AS status;
