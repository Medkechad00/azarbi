-- ══════════════════════════════════════════════════════════════
-- Add external purchase URL column to products
-- Run this in Supabase SQL Editor
-- ══════════════════════════════════════════════════════════════

ALTER TABLE products ADD COLUMN IF NOT EXISTS purchase_url TEXT;

-- Update seed products with placeholder Etsy links
-- Replace these with your actual Etsy/eBay listing URLs
UPDATE products SET purchase_url = 'https://www.etsy.com/listing/example-atlas-diamond' WHERE slug = 'atlas-diamond';
UPDATE products SET purchase_url = 'https://www.etsy.com/listing/example-mermousa-cloud' WHERE slug = 'mermousa-cloud';
UPDATE products SET purchase_url = 'https://www.etsy.com/listing/example-carnival-prism' WHERE slug = 'carnival-prism';
UPDATE products SET purchase_url = 'https://www.etsy.com/listing/example-desert-bloom' WHERE slug = 'desert-bloom';
UPDATE products SET purchase_url = 'https://www.etsy.com/listing/example-nomad-line' WHERE slug = 'nomad-line';
UPDATE products SET purchase_url = 'https://www.etsy.com/listing/example-ember-path' WHERE slug = 'ember-path';
UPDATE products SET purchase_url = 'https://www.etsy.com/listing/example-patchwork-sun' WHERE slug = 'patchwork-sun';
UPDATE products SET purchase_url = 'https://www.etsy.com/listing/example-neon-mirage' WHERE slug = 'neon-mirage';

SELECT slug, purchase_url FROM products;
