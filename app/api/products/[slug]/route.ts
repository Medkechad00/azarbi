import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  segmentData: { params: Promise<{ slug: string }> }
) {
  const params = await segmentData.params;
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      weavers(id, name, slug, bio, portrait_url),
      cooperatives(id, name, region, village)
    `)
    .eq('slug', params.slug)
    .single()
  
  if (error) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
  
  return NextResponse.json({ data }, {
    headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' }
  })
}
