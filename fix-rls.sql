-- ══════════════════════════════════════════════════════════════
-- FIX: Enable public read access on weavers and cooperatives
-- Paste this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

-- Enable RLS (if not already)
ALTER TABLE weavers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cooperatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_posts ENABLE ROW LEVEL SECURITY;

-- Allow public (anon + authenticated) to read
CREATE POLICY IF NOT EXISTS "weavers_public_read" ON weavers FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY IF NOT EXISTS "cooperatives_public_read" ON cooperatives FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY IF NOT EXISTS "journal_public_read" ON journal_posts FOR SELECT TO anon, authenticated USING (true);

-- Verify: count rows
SELECT 'weavers' AS table_name, count(*) FROM weavers
UNION ALL
SELECT 'cooperatives', count(*) FROM cooperatives
UNION ALL
SELECT 'products', count(*) FROM products
UNION ALL
SELECT 'journal_posts', count(*) FROM journal_posts;
