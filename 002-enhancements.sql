-- 1. Platform Settings
CREATE TABLE IF NOT EXISTS platform_settings (
  id INT PRIMARY KEY DEFAULT 1,
  contact_email TEXT DEFAULT 'hello@azarbi.com',
  whatsapp_number TEXT DEFAULT 'Chat with us',
  instagram_handle TEXT DEFAULT '@azarbi.rugs',
  location_address TEXT DEFAULT 'Atlas Mountains, Morocco',
  support_snippet TEXT DEFAULT 'We respond within 24 hours, Monday–Friday.',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT enforce_single_row CHECK (id = 1)
);

-- Insert default row immediately if doesn't exist
INSERT INTO platform_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed existing categories to prevent breaking frontend right now
INSERT INTO categories (name, slug) VALUES 
('Beni Ourain', 'beni_ourain'),
('Azilal', 'azilal'),
('Kilim', 'kilim'),
('Boucherouite', 'boucherouite'),
('Bespoke', 'bespoke')
ON CONFLICT DO NOTHING;

-- 3. Update Products Table
-- Drop the hardcoded ENUM constraint from 'category' so we can link it smoothly or accept any string mapped to categories table
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_category_check;
