// Seed script — run with: node seed.mjs
// Inserts sample cooperatives, weavers, and products into your Supabase database.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) { console.error('ERROR: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars are required'); process.exit(1); }
const supabase = createClient(supabaseUrl, supabaseKey)

async function seed() {
  console.log('🌱 Seeding cooperatives...')
  const { data: coops, error: coopError } = await supabase.from('cooperatives').upsert([
    { id: '11111111-1111-1111-1111-111111111111', name: 'Ait Haddidou Cooperative', region: 'middle_atlas', village: 'Imilchil' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Tifaout Cooperative', region: 'high_atlas', village: 'Ouarzazate' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Aït Bouguemez Collective', region: 'high_atlas', village: 'Tabant' },
  ], { onConflict: 'id' }).select()
  if (coopError) console.error('Coop error:', coopError.message)
  else console.log(`  ✓ ${coops.length} cooperatives`)

  console.log('🌱 Seeding weavers...')
  const { data: weavers, error: weaverError } = await supabase.from('weavers').upsert([
    {
      id: 'aaaa1111-aaaa-1111-aaaa-111111111111',
      name: 'Fatima Ait Haddou',
      slug: 'fatima-ait-haddou',
      bio: 'Fatima has been weaving since she was 12 years old, learning the craft from her grandmother in the remote mountain village of Imilchil. Her Beni Ourain rugs are renowned for their perfectly executed diamond patterns and exceptionally dense pile.',
      portrait_url: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600&h=800',
      cooperative_id: '11111111-1111-1111-1111-111111111111',
      is_featured: true,
      years_experience: 25
    },
    {
      id: 'aaaa2222-aaaa-2222-aaaa-222222222222',
      name: 'Aicha Bouzid',
      slug: 'aicha-bouzid',
      bio: 'Aicha is a master of Azilal weaving, known for her bold use of colour and abstract symbolism. Each of her rugs tells a story of her family history through traditional Amazigh motifs passed down through generations.',
      portrait_url: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=600&h=800',
      cooperative_id: '22222222-2222-2222-2222-222222222222',
      is_featured: false,
      years_experience: 18
    },
    {
      id: 'aaaa3333-aaaa-3333-aaaa-333333333333',
      name: 'Zahra Ouchen',
      slug: 'zahra-ouchen',
      bio: 'Zahra specialises in flat-weave kilims using techniques inherited from her nomadic ancestors. Her work is characterised by incredibly precise geometric patterns and natural dyes sourced from the mountains around Tabant.',
      portrait_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=800',
      cooperative_id: '33333333-3333-3333-3333-333333333333',
      is_featured: false,
      years_experience: 30
    },
  ], { onConflict: 'id' }).select()
  if (weaverError) console.error('Weaver error:', weaverError.message)
  else console.log(`  ✓ ${weavers.length} weavers`)

  console.log('🌱 Seeding products...')
  const products = [
    // ── Beni Ourain ──
    {
      title: 'Atlas Diamond',
      slug: 'atlas-diamond',
      sku: 'AZR-BO-001',
      category: 'beni_ourain',
      price_usd: 1450,
      width_cm: 180,
      length_cm: 270,
      pile_depth_cm: 2.5,
      material_pile: '100% virgin wool',
      region: 'middle_atlas',
      status: 'available',
      is_one_of_one: true,
      is_new_arrival: true,
      description: 'A breathtaking Beni Ourain masterpiece featuring classic diamond lattice motifs on un-dyed ivory wool. Woven over 3 months by Fatima in Imilchil.',
      primary_image_url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=900&h=1200',
      gallery_image_urls: ['https://images.unsplash.com/photo-1615529162924-f8605388461d?auto=format&fit=crop&q=80&w=900&h=1200'],
      weaver_id: 'aaaa1111-aaaa-1111-aaaa-111111111111',
      cooperative_id: '11111111-1111-1111-1111-111111111111',
    },
    {
      title: 'Mermousa Cloud',
      slug: 'mermousa-cloud',
      sku: 'AZR-BO-002',
      category: 'beni_ourain',
      price_usd: 1850,
      width_cm: 200,
      length_cm: 300,
      pile_depth_cm: 3.0,
      material_pile: '100% Mermousa wool',
      region: 'middle_atlas',
      status: 'available',
      is_one_of_one: true,
      is_new_arrival: false,
      description: 'An exceptionally thick, cloud-like Beni Ourain with minimal linework. The deepest pile we have ever sourced — pure comfort underfoot.',
      primary_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&q=80&w=900&h=1200',
      gallery_image_urls: [],
      weaver_id: 'aaaa1111-aaaa-1111-aaaa-111111111111',
      cooperative_id: '11111111-1111-1111-1111-111111111111',
    },
    // ── Azilal ──
    {
      title: 'Carnival Prism',
      slug: 'carnival-prism',
      sku: 'AZR-AZ-001',
      category: 'azilal',
      price_usd: 980,
      width_cm: 150,
      length_cm: 240,
      pile_depth_cm: 1.8,
      material_pile: 'Wool with natural plant dyes',
      region: 'high_atlas',
      status: 'available',
      is_one_of_one: true,
      is_new_arrival: true,
      description: 'An exuberant Azilal rug bursting with fuchsia, saffron and indigo abstract forms on a creamy ivory base. Each symbol encodes a piece of Aicha\'s family history.',
      primary_image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=900&h=1200',
      gallery_image_urls: [],
      weaver_id: 'aaaa2222-aaaa-2222-aaaa-222222222222',
      cooperative_id: '22222222-2222-2222-2222-222222222222',
    },
    {
      title: 'Desert Bloom',
      slug: 'desert-bloom',
      sku: 'AZR-AZ-002',
      category: 'azilal',
      price_usd: 1200,
      width_cm: 170,
      length_cm: 260,
      pile_depth_cm: 2.0,
      material_pile: 'Wool with mineral dyes',
      region: 'high_atlas',
      status: 'available',
      is_one_of_one: true,
      is_new_arrival: false,
      description: 'Warm terracotta and ochre tones flow across this Azilal piece like desert wildflowers after spring rain. A meditative, organic composition.',
      primary_image_url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=900&h=1200',
      gallery_image_urls: [],
      weaver_id: 'aaaa2222-aaaa-2222-aaaa-222222222222',
      cooperative_id: '22222222-2222-2222-2222-222222222222',
    },
    // ── Kilim ──
    {
      title: 'Nomad Line',
      slug: 'nomad-line',
      sku: 'AZR-KL-001',
      category: 'kilim',
      price_usd: 680,
      width_cm: 160,
      length_cm: 250,
      pile_depth_cm: 0.3,
      material_pile: 'Flat-weave wool',
      region: 'high_atlas',
      status: 'available',
      is_one_of_one: true,
      is_new_arrival: true,
      description: 'A striking flat-weave kilim with razor-sharp geometric bands in charcoal, rust, and cream. Lightweight and incredibly durable — built for nomadic life.',
      primary_image_url: 'https://images.unsplash.com/photo-1600607687644-c7f34b5063c7?auto=format&fit=crop&q=80&w=900&h=1200',
      gallery_image_urls: [],
      weaver_id: 'aaaa3333-aaaa-3333-aaaa-333333333333',
      cooperative_id: '33333333-3333-3333-3333-333333333333',
    },
    {
      title: 'Ember Path',
      slug: 'ember-path',
      sku: 'AZR-KL-002',
      category: 'kilim',
      price_usd: 750,
      width_cm: 180,
      length_cm: 280,
      pile_depth_cm: 0.4,
      material_pile: 'Flat-weave wool & cotton',
      region: 'high_atlas',
      status: 'available',
      is_one_of_one: true,
      is_new_arrival: false,
      description: 'Deep burgundy and burnt orange bands create a warm pathway pattern. Zahra\'s signature precision is evident in every perfectly aligned row.',
      primary_image_url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=900&h=1200',
      gallery_image_urls: [],
      weaver_id: 'aaaa3333-aaaa-3333-aaaa-333333333333',
      cooperative_id: '33333333-3333-3333-3333-333333333333',
    },
    // ── Boucherouite ──
    {
      title: 'Patchwork Sun',
      slug: 'patchwork-sun',
      sku: 'AZR-BC-001',
      category: 'boucherouite',
      price_usd: 520,
      width_cm: 140,
      length_cm: 220,
      pile_depth_cm: 1.5,
      material_pile: 'Recycled textiles',
      region: 'middle_atlas',
      status: 'available',
      is_one_of_one: true,
      is_new_arrival: true,
      description: 'An explosion of recycled colour — neon pinks, electric blues, and acid yellows woven into a joyful abstract composition. Every Boucherouite is born from necessity and transformed into art.',
      primary_image_url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=900&h=1200',
      gallery_image_urls: [],
      weaver_id: 'aaaa1111-aaaa-1111-aaaa-111111111111',
      cooperative_id: '11111111-1111-1111-1111-111111111111',
    },
    {
      title: 'Neon Mirage',
      slug: 'neon-mirage',
      sku: 'AZR-BC-002',
      category: 'boucherouite',
      price_usd: 420,
      width_cm: 130,
      length_cm: 200,
      pile_depth_cm: 1.2,
      material_pile: 'Recycled cotton & synthetics',
      region: 'middle_atlas',
      status: 'available',
      is_one_of_one: true,
      is_new_arrival: false,
      description: 'Vibrant horizontal stripes of salvaged fabric create a dreamlike shimmering effect. This Boucherouite embodies the resourcefulness and creativity of Amazigh women.',
      primary_image_url: 'https://images.unsplash.com/photo-1600573472556-e636c2acda9e?auto=format&fit=crop&q=80&w=900&h=1200',
      gallery_image_urls: [],
      weaver_id: 'aaaa1111-aaaa-1111-aaaa-111111111111',
      cooperative_id: '11111111-1111-1111-1111-111111111111',
    },
  ]

  const { data: insertedProducts, error: productError } = await supabase
    .from('products')
    .upsert(products, { onConflict: 'slug' })
    .select()

  if (productError) console.error('Product error:', productError.message)
  else console.log(`  ✓ ${insertedProducts.length} products`)

  console.log('\n✅ Seed complete! Refresh your browser.')
}

seed()
