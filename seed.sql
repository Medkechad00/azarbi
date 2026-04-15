-- ══════════════════════════════════════════════════════════════
-- AZARBI SEED DATA
-- Paste this into Supabase SQL Editor: https://supabase.com/dashboard/project/jmbnpxgbuiercdbzxiyq/sql
-- ══════════════════════════════════════════════════════════════

-- ── COOPERATIVES ──
INSERT INTO cooperatives (id, name, slug, region, village, weaver_count, description) VALUES
('11111111-1111-1111-1111-111111111111', 'Ait Haddidou Cooperative', 'ait-haddidou', 'Middle Atlas', 'Imilchil', 12, 'A women-led cooperative in Imilchil specialising in traditional Beni Ourain weaving techniques passed down for centuries.'),
('22222222-2222-2222-2222-222222222222', 'Tifaout Cooperative', 'tifaout', 'High Atlas', 'Ouarzazate', 8, 'The Tifaout collective is known for their vibrant Azilal rugs, using natural plant and mineral dyes sourced from the surrounding mountains.'),
('33333333-3333-3333-3333-333333333333', 'Aït Bouguemez Collective', 'ait-bouguemez', 'High Atlas', 'Tabant', 15, 'Nestled in the Happy Valley, this collective produces some of the finest flat-weave kilims in all of Morocco.')
ON CONFLICT (id) DO NOTHING;

-- ── WEAVERS ──
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

-- ── PRODUCTS (8 rugs across all 4 categories) ──
INSERT INTO products (sku, slug, title, category, weaver_id, cooperative_id, price_usd, width_cm, length_cm, pile_depth_cm, material_pile, region, status, is_one_of_one, is_new_arrival, is_featured, description, primary_image_url, gallery_image_urls) VALUES

-- Beni Ourain
('AZR-BO-001', 'atlas-diamond', 'Atlas Diamond', 'beni_ourain',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 1450, 180, 270, 2.5, '100% virgin wool', 'Middle Atlas', 'available', true, true, true,
 'A breathtaking Beni Ourain masterpiece featuring classic diamond lattice motifs on un-dyed ivory wool. Woven over 3 months by Fatima in Imilchil.',
 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY['https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=900&h=1200']),

('AZR-BO-002', 'mermousa-cloud', 'Mermousa Cloud', 'beni_ourain',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 1850, 200, 300, 3.0, '100% Mermousa wool', 'Middle Atlas', 'available', true, false, false,
 'An exceptionally thick, cloud-like Beni Ourain with minimal linework. The deepest pile we have ever sourced.',
 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[]),

-- Azilal
('AZR-AZ-001', 'carnival-prism', 'Carnival Prism', 'azilal',
 'aaaa2222-aaaa-2222-aaaa-222222222222', '22222222-2222-2222-2222-222222222222',
 980, 150, 240, 1.8, 'Wool with natural plant dyes', 'High Atlas', 'available', true, true, false,
 'An exuberant Azilal rug bursting with fuchsia, saffron and indigo abstract forms on a creamy ivory base.',
 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[]),

('AZR-AZ-002', 'desert-bloom', 'Desert Bloom', 'azilal',
 'aaaa2222-aaaa-2222-aaaa-222222222222', '22222222-2222-2222-2222-222222222222',
 1200, 170, 260, 2.0, 'Wool with mineral dyes', 'High Atlas', 'available', true, false, false,
 'Warm terracotta and ochre tones flow across this Azilal piece like desert wildflowers after spring rain.',
 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[]),

-- Kilim
('AZR-KL-001', 'nomad-line', 'Nomad Line', 'kilim',
 'aaaa3333-aaaa-3333-aaaa-333333333333', '33333333-3333-3333-3333-333333333333',
 680, 160, 250, 0.3, 'Flat-weave wool', 'High Atlas', 'available', true, true, false,
 'A striking flat-weave kilim with razor-sharp geometric bands in charcoal, rust, and cream.',
 'https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[]),

('AZR-KL-002', 'ember-path', 'Ember Path', 'kilim',
 'aaaa3333-aaaa-3333-aaaa-333333333333', '33333333-3333-3333-3333-333333333333',
 750, 180, 280, 0.4, 'Flat-weave wool & cotton', 'High Atlas', 'available', true, false, false,
 'Deep burgundy and burnt orange bands create a warm pathway pattern.',
 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[]),

-- Boucherouite
('AZR-BC-001', 'patchwork-sun', 'Patchwork Sun', 'boucherouite',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 520, 140, 220, 1.5, 'Recycled textiles', 'Middle Atlas', 'available', true, true, false,
 'An explosion of recycled colour — neon pinks, electric blues, and acid yellows woven into a joyful abstract composition.',
 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[]),

('AZR-BC-002', 'neon-mirage', 'Neon Mirage', 'boucherouite',
 'aaaa1111-aaaa-1111-aaaa-111111111111', '11111111-1111-1111-1111-111111111111',
 420, 130, 200, 1.2, 'Recycled cotton & synthetics', 'Middle Atlas', 'available', true, false, false,
 'Vibrant horizontal stripes of salvaged fabric create a dreamlike shimmering effect.',
 'https://images.unsplash.com/photo-1600573472556-e636c2acda9e?auto=format&fit=crop&q=80&w=900&h=1200',
 ARRAY[]::TEXT[])

ON CONFLICT (slug) DO NOTHING;

-- ── JOURNAL POST (1 sample article) ──
INSERT INTO journal_posts (title, slug, excerpt, body, cover_image_url, author, tags, published, published_at) VALUES
('The Art of Beni Ourain: A Living Tradition',
 'art-of-beni-ourain',
 'Deep in the Middle Atlas Mountains, Amazigh women continue a weaving tradition that stretches back over a thousand years.',
 '## A Heritage Woven in Wool

The Beni Ourain tribe has inhabited the cold, high-altitude regions of the Middle Atlas for centuries. Their rugs — thick, cream-coloured, and adorned with minimalist geometric patterns — were originally functional pieces designed to withstand freezing mountain winters.

Today, these same rugs grace the floors of homes worldwide, admired for their timeless modernist aesthetic. But behind every diamond motif lies a deeper story: of family identity, spiritual protection, and female creativity passed from mother to daughter.

### The Weaving Process

Each Beni Ourain rug begins with the shearing of sheep in late spring. The wool is washed in mountain streams, carded by hand, and spun into thick yarn on wooden drop spindles. The entire process — from fleece to finished rug — takes between 2 and 6 months.

The weavers work on traditional low-ground looms, sitting cross-legged as they tie each knot individually. A single rug may contain over 100,000 hand-tied knots.

### The Symbols

Every pattern tells a story. Diamond shapes represent femininity and protection. Zigzag lines symbolise water and life. The seemingly abstract compositions are in fact a visual language, encoding family histories, prayers, and regional identity.',
 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d23?auto=format&fit=crop&q=80&w=1600',
 'Azarbi Editorial',
 ARRAY['craft', 'beni-ourain', 'tradition'],
 true,
 NOW())
ON CONFLICT (slug) DO NOTHING;

SELECT 'Seed complete ✓' AS result;
