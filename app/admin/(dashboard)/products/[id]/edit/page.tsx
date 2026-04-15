import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Package } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'
import fs from 'fs'
import path from 'path'

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient()

  // 1. Fetch Product
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!product) notFound()

  // 2. Fetch Reference Data
  const { data: weavers } = await supabase.from('weavers').select('id, name')
  const { data: cooperatives } = await supabase.from('cooperatives').select('id, name')
  const { data: categories } = await supabase.from('categories').select('slug, name')

  // 3. Server Action Update
  async function updateProduct(formData: FormData) {
    'use server'
    await requireAdmin()

    // File Upload Handler Helper
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
    fs.mkdirSync(uploadDir, { recursive: true })

    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

    async function handleUpload(file: File | null): Promise<string | null> {
      if (!file || file.size === 0) return null
      if (file.size > MAX_FILE_SIZE) throw new Error('File too large (max 5MB)')
      if (!ALLOWED_TYPES.includes(file.type)) throw new Error('Invalid file type. Allowed: JPEG, PNG, WebP, AVIF')
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const ext = file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
      const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`
      fs.writeFileSync(path.join(uploadDir, filename), buffer)
      return `/uploads/products/${filename}`
    }

    // Process Images
    const primaryImgFile = formData.get('primary_image_file') as File | null
    const newPrimaryUrl = await handleUpload(primaryImgFile)
    const finalPrimaryUrl = newPrimaryUrl ? newPrimaryUrl : product.primary_image_url

    const galleryFiles = [
      formData.get('gallery_image_1') as File | null,
      formData.get('gallery_image_2') as File | null,
      formData.get('gallery_image_3') as File | null,
    ]
    const finalGalleryUrls = [...(product.gallery_image_urls || [])]
    for (let i = 0; i < galleryFiles.length; i++) {
        const url = await handleUpload(galleryFiles[i])
        if (url) {
            // Replace if slot existed, otherwise append
            if (finalGalleryUrls[i]) {
                finalGalleryUrls[i] = url
            } else {
                finalGalleryUrls.push(url)
            }
        }
    }

    const supabase = await createClient()
    
    // Parse fields
    const payload = {
      title: formData.get('title') as string,
      sku: formData.get('sku') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as string,
      price_usd: parseFloat(formData.get('price_usd') as string) || 0,
      price_gbp: parseFloat(formData.get('price_gbp') as string) || null,
      price_eur: parseFloat(formData.get('price_eur') as string) || null,
      
      width_cm: parseFloat(formData.get('width_cm') as string) || null,
      length_cm: parseFloat(formData.get('length_cm') as string) || null,
      pile_depth_cm: parseFloat(formData.get('pile_depth_cm') as string) || null,
      weight_kg: parseFloat(formData.get('weight_kg') as string) || null,
      
      material_pile: formData.get('material_pile') as string || null,
      material_warp: formData.get('material_warp') as string || null,
      dye_type: formData.get('dye_type') as string || null,
      region: formData.get('region') as string || '',
      village: formData.get('village') as string || null,
      
      description: formData.get('description') as string || null,
      care_notes: formData.get('care_notes') as string || null,
      
      purchase_url: formData.get('purchase_url') as string || null,
      primary_image_url: finalPrimaryUrl,
      gallery_image_urls: finalGalleryUrls,
      
      weaver_id: formData.get('weaver_id') as string || null,
      cooperative_id: formData.get('cooperative_id') as string || null,
      
      is_featured: formData.get('is_featured') === 'on',
      is_new_arrival: formData.get('is_new_arrival') === 'on',
      
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase.from('products').update(payload).eq('id', params.id)

    if (!error) {
      revalidatePath('/admin/products')
      revalidatePath(`/products/${product.slug}`)
      redirect('/admin/products')
    } else {
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/products"
          className="p-2 text-smoke hover:bg-[#F8F6F2] hover:text-night rounded-full transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-display text-night flex items-center gap-2">
            <Package size={24} className="text-[#C17A2C]" />
            Edit Product
          </h1>
          <p className="text-sm text-smoke font-mono mt-1">Ref: {product.sku}</p>
        </div>
      </div>

      <form action={updateProduct} className="space-y-6">
        
        {/* Core Info */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Core Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-night mb-1.5">Product Title*</label>
              <input type="text" name="title" defaultValue={product.title} required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">SKU*</label>
              <input type="text" name="sku" defaultValue={product.sku} required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Category*</label>
              <select name="category" defaultValue={product.category} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
                {categories?.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Pricing & Status */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Commerce</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Price (USD)*</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke">$</span>
                <input type="number" step="0.01" name="price_usd" defaultValue={product.price_usd} required className="w-full pl-8 pr-4 py-2.5 bg-[#F8F6F2] border border-[#EBE6DF] rounded focus:border-[#C17A2C] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Etsy Purchase URL</label>
              <input type="url" name="purchase_url" defaultValue={product.purchase_url || ''} placeholder="https://etsy.com/..." className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Visibility Status</label>
              <select name="status" defaultValue={product.status} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>
            <div className="flex items-center gap-6 mt-6">
              <label className="flex items-center gap-2 text-sm font-medium text-night cursor-pointer">
                <input type="checkbox" name="is_featured" defaultChecked={product.is_featured} className="w-4 h-4 text-[#C17A2C]" />
                Featured Product
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-night cursor-pointer">
                <input type="checkbox" name="is_new_arrival" defaultChecked={product.is_new_arrival} className="w-4 h-4 text-[#C17A2C]" />
                New Arrival
              </label>
            </div>
          </div>
        </section>

        {/* Origins & Artisan */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Artisan Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Weaver Profile</label>
              <select name="weaver_id" defaultValue={product.weaver_id || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
                <option value="">-- Unknown / Unassigned --</option>
                {weavers?.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Cooperative</label>
              <select name="cooperative_id" defaultValue={product.cooperative_id || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
                <option value="">-- Unknown / Unassigned --</option>
                {cooperatives?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Region*</label>
              <input type="text" name="region" defaultValue={product.region} required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Village</label>
              <input type="text" name="village" defaultValue={product.village || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
          </div>
        </section>

        {/* Dimensions & Specs */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Dimensions & Materials</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Width (cm)</label>
              <input type="number" step="0.1" name="width_cm" defaultValue={product.width_cm || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Length (cm)</label>
              <input type="number" step="0.1" name="length_cm" defaultValue={product.length_cm || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Pile Depth (cm)</label>
              <input type="number" step="0.1" name="pile_depth_cm" defaultValue={product.pile_depth_cm || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Weight (kg)</label>
              <input type="number" step="0.1" name="weight_kg" defaultValue={product.weight_kg || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Pile Material</label>
              <input type="text" name="material_pile" defaultValue={product.material_pile || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Warp Material</label>
              <input type="text" name="material_warp" defaultValue={product.material_warp || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Dye Type</label>
              <select name="dye_type" defaultValue={product.dye_type || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
                <option value="">Unknown</option>
                <option value="natural">Natural</option>
                <option value="mineral">Mineral</option>
                <option value="synthetic">Synthetic</option>
                <option value="undyed">Undyed</option>
              </select>
            </div>
          </div>
        </section>

        {/* Content & Media */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Content & Local Imagery</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5 flex justify-between">
                <span>Replace Primary Image</span>
                <span className="text-smoke font-normal">Leave blank to keep existing image</span>
              </label>
              {product.primary_image_url && (
                <div className="mb-3">
                  <img src={product.primary_image_url} alt="Current Primary" className="h-20 w-20 object-cover rounded shadow-sm border border-[#EBE6DF]" />
                </div>
              )}
              <input type="file" accept="image/*" name="primary_image_file" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#1C1815] file:text-white hover:file:bg-black cursor-pointer" />
            </div>
            <div className="pt-4 border-t border-[#EBE6DF]">
              <label className="block text-sm font-medium text-night mb-3">Update Gallery Slots (Leave blank to keep)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[0, 1, 2].map((slot) => (
                  <div key={slot} className="flex gap-3 items-center">
                    {product.gallery_image_urls?.[slot] && (
                        <img src={product.gallery_image_urls[slot]} alt={`Gallery ${slot+1}`} className="h-10 w-10 object-cover rounded" />
                    )}
                    <input type="file" accept="image/*" name={`gallery_image_${slot+1}`} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] p-2 rounded focus:border-[#C17A2C] outline-none text-[10px] file:hidden cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-[#EBE6DF]">
              <label className="block text-sm font-medium text-night mb-1.5">Product Description</label>
              <textarea name="description" rows={5} defaultValue={product.description || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none resize-y"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Care Instructions</label>
              <textarea name="care_notes" rows={3} defaultValue={product.care_notes || ''} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none resize-y"></textarea>
            </div>
          </div>
        </section>

        <div className="sticky bottom-4 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-[#EBE6DF] shadow-lg flex items-center justify-end gap-4 z-10">
          <Link href="/admin/products" className="px-6 py-2.5 text-sm font-medium text-smoke hover:text-night transition-colors">
            Discard Changes
          </Link>
          <button type="submit" className="flex items-center gap-2 bg-[#C17A2C] hover:bg-[#A66825] text-white px-8 py-3 rounded-sm text-sm font-medium transition-transform active:scale-95 shadow-md">
            <Save size={18} />
            Update Product
          </button>
        </div>
      </form>
    </div>
  )
}
