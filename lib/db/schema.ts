import { pgTable, uuid, text, integer, boolean, timestamp, decimal, point, jsonb } from 'drizzle-orm/pg-core';

// ═══════════════════════════════════════
// COOPERATIVES
// ═══════════════════════════════════════
export const cooperatives = pgTable('cooperatives', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  region: text('region').notNull(),
  village: text('village').notNull(),
  coordinates: point('coordinates'),
  founded_year: integer('founded_year'),
  weaver_count: integer('weaver_count').default(0),
  description: text('description'),
  image_url: text('image_url'),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
});

// ═══════════════════════════════════════
// WEAVERS
// ═══════════════════════════════════════
export const weavers = pgTable('weavers', {
  id: uuid('id').defaultRandom().primaryKey(),
  cooperative_id: uuid('cooperative_id').references(() => cooperatives.id),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  bio: text('bio'),
  years_weaving: integer('years_weaving'),
  specialties: text('specialties').array(),
  portrait_url: text('portrait_url'),
  gallery_urls: text('gallery_urls').array(),
  featured: boolean('featured').default(false),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow()
});

// ═══════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  sku: text('sku').notNull().unique(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  weaver_id: uuid('weaver_id').references(() => weavers.id),
  cooperative_id: uuid('cooperative_id').references(() => cooperatives.id),

  price_usd: decimal('price_usd', { precision: 10, scale: 2 }).notNull(),
  price_gbp: decimal('price_gbp', { precision: 10, scale: 2 }),
  price_eur: decimal('price_eur', { precision: 10, scale: 2 }),
  price_aed: decimal('price_aed', { precision: 10, scale: 2 }),

  width_cm: decimal('width_cm', { precision: 6, scale: 1 }),
  length_cm: decimal('length_cm', { precision: 6, scale: 1 }),
  pile_depth_cm: decimal('pile_depth_cm', { precision: 4, scale: 1 }),
  weight_kg: decimal('weight_kg', { precision: 5, scale: 2 }),

  material_pile: text('material_pile'),
  material_warp: text('material_warp'),
  dye_type: text('dye_type'),

  region: text('region').notNull(),
  village: text('village'),
  weave_weeks: integer('weave_weeks'),

  status: text('status').default('available'),
  is_one_of_one: boolean('is_one_of_one').default(true),
  is_new_arrival: boolean('is_new_arrival').default(false),
  is_featured: boolean('is_featured').default(false),

  description: text('description'),
  care_notes: text('care_notes'),

  meta_title: text('meta_title'),
  meta_description: text('meta_description'),

  primary_image_url: text('primary_image_url').notNull(),
  gallery_image_urls: text('gallery_image_urls').array(),

  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow()
});

// ═══════════════════════════════════════
// ORDERS
// ═══════════════════════════════════════
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  order_number: text('order_number').notNull().unique(),
  customer_id: uuid('customer_id').references(() => profiles.id),
  status: text('status').default('pending').notNull(),

  subtotal_usd: decimal('subtotal_usd', { precision: 10, scale: 2 }).notNull(),
  shipping_usd: decimal('shipping_usd', { precision: 10, scale: 2 }).default('0'),
  tax_usd: decimal('tax_usd', { precision: 10, scale: 2 }).default('0'),
  total_usd: decimal('total_usd', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD'),

  shipping_name: text('shipping_name'),
  shipping_address_line1: text('shipping_address_line1'),
  shipping_address_line2: text('shipping_address_line2'),
  shipping_city: text('shipping_city'),
  shipping_state: text('shipping_state'),
  shipping_postal_code: text('shipping_postal_code'),
  shipping_country: text('shipping_country'),

  carrier: text('carrier'),
  tracking_number: text('tracking_number'),

  stripe_payment_intent_id: text('stripe_payment_intent_id'),
  stripe_payment_status: text('stripe_payment_status'),

  internal_notes: text('internal_notes'),

  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  shipped_at: timestamp('shipped_at', { withTimezone: true }),
  delivered_at: timestamp('delivered_at', { withTimezone: true }),
});

// ═══════════════════════════════════════
// ORDER ITEMS
// ═══════════════════════════════════════
export const order_items = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  order_id: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull(),
  product_id: uuid('product_id').references(() => products.id).notNull(),
  quantity: integer('quantity').default(1).notNull(),
  unit_price_usd: decimal('unit_price_usd', { precision: 10, scale: 2 }).notNull(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// ═══════════════════════════════════════
// BESPOKE ENQUIRIES
// ═══════════════════════════════════════
export const bespoke_enquiries = pgTable('bespoke_enquiries', {
  id: uuid('id').defaultRandom().primaryKey(),
  customer_name: text('customer_name').notNull(),
  customer_email: text('customer_email').notNull(),
  customer_phone: text('customer_phone'),

  category_preference: text('category_preference'),
  dimensions: text('dimensions'),
  colour_palette: text('colour_palette'),
  pattern_style: text('pattern_style'),
  budget_min: decimal('budget_min', { precision: 10, scale: 2 }),
  budget_max: decimal('budget_max', { precision: 10, scale: 2 }),
  timeline_weeks: integer('timeline_weeks'),
  inspiration_url: text('inspiration_url'),
  message: text('message'),
  source: text('source'),

  status: text('status').default('new').notNull(),

  quote_amount: decimal('quote_amount', { precision: 10, scale: 2 }),
  quote_lead_weeks: integer('quote_lead_weeks'),
  quote_notes: text('quote_notes'),

  linked_order_id: uuid('linked_order_id').references(() => orders.id),
  internal_notes: text('internal_notes'),

  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ═══════════════════════════════════════
// JOURNAL POSTS
// ═══════════════════════════════════════
export const journal_posts = pgTable('journal_posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  body: text('body'),
  excerpt: text('excerpt'),
  cover_image_url: text('cover_image_url'),

  status: text('status').default('draft').notNull(),
  author: text('author').default('Azarbi Editorial'),
  tags: text('tags').array(),

  meta_title: text('meta_title'),
  meta_description: text('meta_description'),

  published_at: timestamp('published_at', { withTimezone: true }),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

// ═══════════════════════════════════════
// PROFILES (customers / admin users)
// ═══════════════════════════════════════
export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  auth_user_id: uuid('auth_user_id').unique(),
  email: text('email').notNull(),
  full_name: text('full_name'),
  phone: text('phone'),
  country: text('country'),
  city: text('city'),

  role: text('role').default('customer').notNull(),
  is_trade_account: boolean('is_trade_account').default(false),
  notes: text('notes'),

  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});
