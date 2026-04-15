-- ==============================================================================
-- 003 — COMPREHENSIVE SEED DATA FOR ADMIN TESTING
-- This script populates every table with realistic test data.
-- ==============================================================================

-- ─── PLATFORM SETTINGS ────────────────────────────────────────────────────────
UPDATE platform_settings SET
  contact_email    = 'hello@azarbi.com',
  whatsapp_number  = '+212 600 123 456',
  instagram_handle = '@azarbi.rugs',
  location_address = 'Atlas Mountains, Marrakech, Morocco',
  support_snippet  = 'We respond within 24 hours, Monday–Friday.',
  updated_at       = NOW()
WHERE id = 1;

-- ─── CATEGORIES ────────────────────────────────────────────────────────────────
INSERT INTO categories (name, slug, description) VALUES
  ('Vintage Runner', 'vintage_runner', 'Narrow, elongated rugs originally crafted for hallways and passages in traditional Moroccan homes.'),
  ('Taznaxt',        'taznaxt',        'Bold, densely piled rugs from the Taznaxt region known for fiery reds and deep saffrons.'),
  ('Zanafi',         'zanafi',         'Two-toned flat weave rugs with striking black and white geometric patterns from the Ouarzazate region.')
ON CONFLICT (slug) DO NOTHING;

-- ─── COOPERATIVES (add 2 more to existing 3) ──────────────────────────────────
INSERT INTO cooperatives (id, name, slug, region, village, weaver_count, description, founded_year) VALUES
  ('44444444-4444-4444-4444-444444444444', 'Tamzrite Women''s Atelier', 'tamzrite', 'High Atlas', 'Tamzrite', 20,
   'One of the largest women-led ateliers in the High Atlas. Tamzrite produces both pile rugs and flat-weave kilims using locally sourced highland wool.',
   2012),
  ('55555555-5555-5555-5555-555555555555', 'Ourika Valley Collective', 'ourika-valley', 'Ourika Valley', 'Setti Fatma', 10,
   'Located along the Ourika river, this collective blends traditional motifs with contemporary colour palettes favoured by European interior designers.',
   2018)
ON CONFLICT (id) DO NOTHING;

-- ─── WEAVERS (add 3 more to existing 3) ───────────────────────────────────────
INSERT INTO weavers (id, cooperative_id, name, slug, bio, years_weaving, specialties, portrait_url, featured) VALUES
  ('aaaa4444-aaaa-4444-aaaa-444444444444', '44444444-4444-4444-4444-444444444444',
   'Halima Tafoukt', 'halima-tafoukt',
   'Halima learned weaving at the age of 10 and now leads the Tamzrite Atelier. She is renowned for her ability to translate modern abstract art into woven form.',
   22, ARRAY['azilal','taznaxt'],
   'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600&h=800', true),

  ('aaaa5555-aaaa-5555-aaaa-555555555555', '55555555-5555-5555-5555-555555555555',
   'Naima Ourika', 'naima-ourika',
   'Naima specialises in contemporary reinterpretations of Berber motifs. Her kilims are popular with European designers seeking an authentic yet modern aesthetic.',
   12, ARRAY['kilim','zanafi'],
   'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600&h=800', false),

  ('aaaa6666-aaaa-6666-aaaa-666666666666', '11111111-1111-1111-1111-111111111111',
   'Khadija Ben Youssef', 'khadija-ben-youssef',
   'Khadija is one of the last weavers in the region who still prepares her own natural dyes from pomegranate rinds, saffron, and indigo plants.',
   35, ARRAY['beni_ourain','boucherouite'],
   'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=600&h=800', false)
ON CONFLICT (id) DO NOTHING;

-- ─── PRODUCTS (add 8 more to existing 8 — diverse categories & statuses) ──────
INSERT INTO products (sku, slug, title, category, weaver_id, cooperative_id, price_usd, price_gbp, price_eur, width_cm, length_cm, pile_depth_cm, weight_kg, material_pile, material_warp, dye_type, region, village, weave_weeks, status, is_one_of_one, is_new_arrival, is_featured, description, care_notes, primary_image_url, gallery_image_urls, purchase_url) VALUES

-- 1. Sold item
('AZR-BO-003', 'ivory-cascade', 'Ivory Cascade', 'beni_ourain',
 'aaaa6666-aaaa-6666-aaaa-666666666666', '11111111-1111-1111-1111-111111111111',
 2200, 1750, 2050, 210, 310, 3.2, 18.5,
 '100% virgin wool', 'Cotton / wool blend', 'undyed',
 'Middle Atlas', 'Imilchil', 14,
 'sold', true, false, false,
 'An extraordinarily large and plush Beni Ourain with subtle asymmetric diamond motifs. This piece took master weaver Khadija 14 weeks to complete.',
 'Vacuum on low suction weekly. Professional wool cleaning recommended annually.',
 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=900&h=1200','https://images.unsplash.com/photo-1598928506311-c55ez637a58a?auto=format&fit=crop&q=80&w=900&h=1200'],
 'https://www.etsy.com/listing/example-ivory-cascade'),

-- 2. Reserved item
('AZR-AZ-003', 'saffron-dream', 'Saffron Dream', 'azilal',
 'aaaa4444-aaaa-4444-aaaa-444444444444', '44444444-4444-4444-4444-444444444444',
 1680, 1340, 1560, 170, 250, 2.0, 12.0,
 'Wool with saffron plant dyes', 'Cotton', 'natural',
 'High Atlas', 'Tamzrite', 10,
 'reserved', true, false, true,
 'A warm, sun-kissed Azilal with cascading saffron, turmeric, and burnt sienna tones. The abstract motifs represent the sunrise over the Atlas peaks.',
 'Spot clean with mild soap. Avoid direct sunlight to preserve dye vibrancy.',
 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY['https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?auto=format&fit=crop&q=80&w=900&h=1200'],
 'https://www.etsy.com/listing/example-saffron-dream'),

-- 3. Coming soon
('AZR-TZ-001', 'volcanic-ember', 'Volcanic Ember', 'taznaxt',
 'aaaa4444-aaaa-4444-aaaa-444444444444', '44444444-4444-4444-4444-444444444444',
 1350, 1080, 1260, 160, 240, 2.5, 11.0,
 'Highland wool', 'Wool', 'mineral',
 'High Atlas', 'Taznaxt', 8,
 'coming_soon', true, true, false,
 'A striking Taznaxt rug woven in deep volcanic reds and charcoals. Currently on the loom—expected completion in 3 weeks.',
 'Professional cleaning only.',
 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[], NULL),

-- 4. Vintage Runner
('AZR-VR-001', 'corridor-of-time', 'Corridor of Time', 'vintage_runner',
 'aaaa3333-aaaa-3333-aaaa-333333333333', '33333333-3333-3333-3333-333333333333',
 890, 710, 830, 80, 320, 0.5, 5.5,
 'Aged wool', 'Cotton', 'natural',
 'High Atlas', 'Tabant', NULL,
 'available', true, true, true,
 'A vintage runner estimated to be 40–50 years old. The faded indigo and terracotta speak of decades of foot traffic in a mountain family home.',
 'Handle gently. Vintage fibres are fragile. Dry clean only.',
 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=900&h=1200'],
 'https://www.etsy.com/listing/example-corridor-of-time'),

-- 5. Zanafi
('AZR-ZN-001', 'shadow-geometry', 'Shadow Geometry', 'zanafi',
 'aaaa5555-aaaa-5555-aaaa-555555555555', '55555555-5555-5555-5555-555555555555',
 720, 576, 670, 150, 230, 0.3, 4.8,
 'Flat-weave wool', 'Cotton', 'undyed',
 'Ourika Valley', 'Setti Fatma', 6,
 'available', true, false, false,
 'A crisp black-and-white Zanafi flat-weave with hypnotic chevron bands. Perfect for minimalist Scandinavian-inspired interiors.',
 'Vacuum both sides monthly. Rotate periodically to ensure even wear.',
 'https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[],
 'https://www.etsy.com/listing/example-shadow-geometry'),

-- 6. Another Beni Ourain
('AZR-BO-004', 'midnight-lattice', 'Midnight Lattice', 'beni_ourain',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 1950, 1560, 1820, 200, 290, 2.8, 16.5,
 '100% virgin wool', 'Wool', 'undyed',
 'Middle Atlas', 'Imilchil', 12,
 'available', true, false, true,
 'A rare darker-toned Beni Ourain with charcoal lattice lines on a soft grey base. Understated luxury for contemporary spaces.',
 'Shake outdoors regularly. Professional wool clean every 18 months.',
 'https://images.unsplash.com/photo-1600585153490-76fb20a32601?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY['https://images.unsplash.com/photo-1600573472572-8aba06f4b30a?auto=format&fit=crop&q=80&w=900&h=1200','https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=900&h=1200'],
 'https://www.etsy.com/listing/example-midnight-lattice'),

-- 7. Bespoke item
('AZR-BS-001', 'bespoke-sapphire', 'Bespoke Sapphire Commission', 'bespoke',
 'aaaa2222-aaaa-2222-aaaa-222222222222', '22222222-2222-2222-2222-222222222222',
 3200, 2560, 2990, 250, 350, 2.2, 22.0,
 'Merino wool blend', 'Cotton / linen', 'mineral',
 'High Atlas', 'Ouarzazate', 16,
 'reserved', true, false, false,
 'A one-off bespoke commission for a London interior designer. Deep sapphire blue ground with subtle geometric accents in natural ivory.',
 'Due to the mineral dyes, avoid prolonged exposure to direct sunlight. Professional clean only.',
 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[], NULL),

-- 8. Kilim new arrival
('AZR-KL-003', 'terracotta-tide', 'Terracotta Tide', 'kilim',
 'aaaa5555-aaaa-5555-aaaa-555555555555', '55555555-5555-5555-5555-555555555555',
 580, 464, 540, 140, 220, 0.3, 3.8,
 'Flat-weave wool & cotton', 'Cotton', 'natural',
 'Ourika Valley', 'Setti Fatma', 5,
 'available', true, true, false,
 'A light, breezy kilim in muted terracotta and cream. Its flat weave makes it ideal for layering over hardwood floors.',
 'Machine wash cold, gentle cycle. Air dry flat.',
 'https://images.unsplash.com/photo-1600566753086-00f18d3ba9e6?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY['https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&q=80&w=900&h=1200'],
 'https://www.etsy.com/listing/example-terracotta-tide')

ON CONFLICT (slug) DO NOTHING;

-- ─── BESPOKE ENQUIRIES (7 enquiries in various statuses) ──────────────────────
INSERT INTO bespoke_enquiries (name, email, phone, category_pref, width_cm, length_cm, color_palette, pattern_style, budget_min_usd, budget_max_usd, timeline_weeks, message, source, status, created_at) VALUES
  ('Sophie Laurent', 'sophie@laurentinteriors.com', '+33 6 12 34 56 78',
   'beni_ourain', 200, 300, 'Ivory and charcoal', 'Classic diamond',
   2000, 3500, 12, 'We are fitting out a penthouse in the 6th arrondissement and need a large Beni Ourain for the living area. Off-white with subtle dark motifs.',
   'website', 'new', NOW() - INTERVAL '2 hours'),

  ('James Whitmore', 'james@whitmore.co.uk', '+44 7700 900 123',
   'kilim', 160, 250, 'Earth tones — rust, cream, olive', 'Geometric stripes',
   600, 1200, 8, 'Looking for a kilim for my hallway entrance. Something warm and welcoming.',
   'instagram', 'new', NOW() - INTERVAL '6 hours'),

  ('Amina Belhaj', 'amina.belhaj@gmail.com', '+212 661 234 567',
   'azilal', 150, 200, 'Bright — pink, yellow, turquoise', 'Abstract / freeform',
   800, 1500, 10, 'I want a vibrant Azilal rug for my daughter''s room. Something playful and full of life.',
   'whatsapp', 'contacted', NOW() - INTERVAL '3 days'),

  ('Marcus Chen', 'marcus@chenstudio.com', '+1 415 555 0198',
   'beni_ourain', 250, 350, 'All ivory, no pattern', 'Minimal / plain',
   3000, 5000, 16, 'Need a very large, completely plain ivory Beni Ourain for a San Francisco loft. No motifs at all if possible.',
   'website', 'quoted', NOW() - INTERVAL '1 week'),

  ('Elena Rossi', 'elena@rossidesign.it', '+39 02 1234 5678',
   'boucherouite', 120, 180, 'Neon and pastels', 'Patchwork',
   400, 800, 6, 'I adore your boucherouite collection! Would love a custom piece mixing neon pinks with soft pastels for a Milan showroom.',
   'website', 'confirmed', NOW() - INTERVAL '2 weeks'),

  ('Oliver Grant', 'oliver.grant@archmail.com', NULL,
   'zanafi', 180, 280, 'Black and white only', 'Strong geometric',
   700, 1400, 8, 'Architect here. Need a crisp black and white zanafi for a residential project. Must be very flat weave.',
   'website', 'new', NOW() - INTERVAL '30 minutes'),

  ('Fatima Zahra', 'fatima.z@outlook.com', '+212 655 789 012',
   'kilim', 100, 150, 'Muted pastels', 'Traditional',
   300, 600, 6, 'Small kilim for a reading nook. Nothing too bold.',
   'whatsapp', 'declined', NOW() - INTERVAL '1 month')
ON CONFLICT DO NOTHING;

-- ─── JOURNAL POSTS (add 3 more to existing 1) ────────────────────────────────
INSERT INTO journal_posts (title, slug, excerpt, body, cover_image_url, author, tags, published, published_at) VALUES
  ('Understanding Natural Dyes: From Pomegranate to Indigo',
   'understanding-natural-dyes',
   'How Moroccan weavers have used plants, minerals, and insects to create colour for centuries.',
   '## The Palette of the Earth

Centuries before synthetic dyes revolutionised the textile industry, Amazigh weavers were masters of colour extraction. Pomegranate rinds yield warm yellows, indigo plants produce deep blues, and the cochineal insect provides vivid crimsons.

### Process
Each dye requires specific mordants — often alum or iron — to bind to wool fibres. The wool is soaked, heated, and air-dried repeatedly until the desired intensity is achieved.

### Preservation
Natural dyes age beautifully. Unlike synthetics that can look garish over time, plant-based colours develop a softer, richer patina with each passing decade.',
   'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=1600',
   'Azarbi Editorial',
   ARRAY['craft','dyes','sustainability'],
   true, NOW() - INTERVAL '5 days'),

  ('How to Choose the Right Rug Size for Your Room',
   'choosing-right-rug-size',
   'A practical guide to selecting rug dimensions that complement your furniture and space.',
   '## The Golden Rules of Rug Sizing

Choosing the wrong size rug is possibly the most common interior design mistake. Here is our simple framework:

### Living Room
All front legs of your sofa and chairs should sit on the rug. Leave 30–45 cm of bare floor around the edges.

### Bedroom
A large rug should extend at least 60 cm beyond each side of the bed so you step onto softness every morning.

### Dining Room
Your rug should extend at least 75 cm beyond the table edges so chairs remain on the rug even when pulled out.',
   'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=1600',
   'Azarbi Editorial',
   ARRAY['guide','interior-design','sizing'],
   true, NOW() - INTERVAL '12 days'),

  ('Behind the Loom: A Day with Fatima in Imilchil',
   'day-with-fatima-imilchil',
   'We spent a day with master weaver Fatima Ait Haddou in her mountain workshop to document the making of a Beni Ourain rug from fleece to finish.',
   '## 6:00 AM — Sunrise Over the Atlas

Fatima is already awake. She feeds her small flock of sheep before settling at her loom. The wooden frame fills the corner of her living room, a half-finished Beni Ourain stretched taut across it.

## 8:00 AM — The Weave Begins

Working from memory — there is no pattern drawn on paper — Fatima''s hands move with startling speed. Each knot is tied individually, pulled tight, and trimmed.

## 5:00 PM — Reflection

By evening, roughly 4 cm of new rug has been added. At this pace, the full 270 cm piece will take approximately 12 weeks to complete.',
   'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=1600',
   'Azarbi Editorial',
   ARRAY['weaver-spotlight','beni-ourain','process'],
   true, NOW() - INTERVAL '20 days')
ON CONFLICT (slug) DO NOTHING;

-- ─── NEWSLETTER SUBSCRIBERS ───────────────────────────────────────────────────
INSERT INTO newsletter_subscribers (email, source) VALUES
  ('design.lover@gmail.com', 'homepage_popup'),
  ('sarah.j@outlook.com', 'footer_form'),
  ('pierre.dupont@yahoo.fr', 'journal_cta'),
  ('mia.tanaka@icloud.com', 'checkout_upsell'),
  ('james.whitmore@archmail.com', 'instagram_bio'),
  ('casa.bella.studio@gmail.com', 'homepage_popup'),
  ('nordic.nest@outlook.com', 'footer_form'),
  ('amira.k@hotmail.com', 'journal_cta'),
  ('studio.raw@protonmail.com', 'instagram_bio'),
  ('hannah.berg@gmail.com', 'footer_form'),
  ('lucas.moreau@gmail.com', 'homepage_popup'),
  ('interior.inspo@yahoo.com', 'journal_cta')
ON CONFLICT (email) DO NOTHING;

-- ─── PRODUCT VIEWS (simulated analytics data) ─────────────────────────────────
-- We'll reference existing product slugs to get their IDs
INSERT INTO product_views (product_id, session_id, country, viewed_at)
SELECT p.id, 'sess_' || floor(random()*10000)::text, 
  (ARRAY['GB','US','FR','DE','MA','AE','JP','AU','CA','NL'])[floor(random()*10+1)],
  NOW() - (random() * INTERVAL '30 days')
FROM products p, generate_series(1, 8) -- 8 views per product
ON CONFLICT DO NOTHING;

-- Done!
SELECT 'Seed complete — ' || 
  (SELECT count(*) FROM products) || ' products, ' ||
  (SELECT count(*) FROM weavers) || ' weavers, ' ||
  (SELECT count(*) FROM cooperatives) || ' cooperatives, ' ||
  (SELECT count(*) FROM categories) || ' categories, ' ||
  (SELECT count(*) FROM bespoke_enquiries) || ' enquiries, ' ||
  (SELECT count(*) FROM journal_posts) || ' journal posts, ' ||
  (SELECT count(*) FROM newsletter_subscribers) || ' subscribers'
AS seed_status;
