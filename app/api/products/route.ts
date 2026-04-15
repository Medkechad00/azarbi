import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_SORTS = ['created_at', 'price_usd', 'title', 'is_new_arrival', 'is_featured']
const ALLOWED_CATEGORIES = ['beni_ourain', 'azilal', 'kilim', 'boucherouite', 'bespoke', 'all']
const ALLOWED_STATUSES = ['available', 'reserved', 'sold', 'coming_soon', 'all']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const status = searchParams.get('status') || 'available'
  const sortParam = searchParams.get('sort') || 'created_at'
  const sort = ALLOWED_SORTS.includes(sortParam) ? sortParam : 'created_at'
  const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc'
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '24') || 24, 1), 100)
  const offset = Math.max(parseInt(searchParams.get('offset') || '0') || 0, 0)
  const min_price = searchParams.get('min_price')
  const max_price = searchParams.get('max_price')
  
  const supabase = await createClient()
  
  let query = supabase
    .from('products')
    .select(`
      id, sku, slug, title, category, 
      price_usd, price_gbp, price_eur, price_aed,
      width_cm, length_cm,
      region, status,
      is_one_of_one, is_new_arrival, is_featured,
      primary_image_url,
      weavers(id, name, slug),
      cooperatives(id, name, region)
    `, { count: 'exact' })
    .order(sort, { ascending: order === 'asc' })
    .range(offset, offset + limit - 1)
  
  // Conditionally filter only if 'status' isn't explicitly set to 'all'
  if (status !== 'all') {
    query = query.eq('status', status)
  }

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }
  
  if (min_price) query = query.gte('price_usd', min_price)
  if (max_price) query = query.lte('price_usd', max_price)
  
  const { data, error, count } = await query
  
  if (error) {
    console.error('Products query error:', error)
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 })
  }
  
  return NextResponse.json({ 
    data, 
    total: count,
    limit,
    offset 
  }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  })
}
