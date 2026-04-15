import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, PackagePlus } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'
import fs from 'fs'
import path from 'path'

export default async function NewProductPage() {
  const supabase = await createClient()

  // Fetch Reference Data
  const { data: weavers } = await supabase.from('weavers').select('id, name')
  const { data: cooperatives } = await supabase.from('cooperatives').select('id, name')
  const { data: categories } = await supabase.from('categories').select('slug, name')

  // Server Action
  async function createProduct(formData: FormData) {
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
    const primaryImgUrl = await handleUpload(primaryImgFile) || '' // Fallback to empty if failed

    const galleryFiles = [
      formData.get('gallery_image_1') as File | null,
      formData.get('gallery_image_2') as File | null,
      formData.get('gallery_image_3') as File | null,
    ]
    const gallery_image_urls = []
    for (const f of galleryFiles) {
      const url = await handleUpload(f)
      if (url) gallery_image_urls.push(url)
    }

    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    
    const payload = {
      title,
      slug,
      sku: formData.get('sku') as string,
      category: formData.get('category') as string,
      status: formData.get('status') as string,
      price_usd: parseFloat(formData.get('price_usd') as string) || 0,
      
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
      primary_image_url: primaryImgUrl,
      gallery_image_urls,
      
      weaver_id: formData.get('weaver_id') as string || null,
      cooperative_id: formData.get('cooperative_id') as string || null,
      
      is_featured: formData.get('is_featured') === 'on',
      is_new_arrival: formData.get('is_new_arrival') === 'on',
    }

    const supabase = await createClient()
    const { error } = await supabase.from('products').insert([payload])

    if (!error) {
      revalidatePath('/admin/products')
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
            <PackagePlus size={24} className="text-[#C17A2C]" />
            New Product
          </h1>
          <p className="text-sm text-smoke mt-1">Add a new rug to the catalog.</p>
        </div>
      </div>

      <form action={createProduct} className="space-y-6">
        
        {/* Core Info */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Core Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-night mb-1.5">Product Title*</label>
              <input type="text" name="title" required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">SKU Code*</label>
              <input type="text" name="sku" required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Category*</label>
              <select name="category" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
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
                <input type="number" step="0.01" name="price_usd" required className="w-full pl-8 pr-4 py-2.5 bg-[#F8F6F2] border border-[#EBE6DF] rounded focus:border-[#C17A2C] outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Etsy Purchase URL</label>
              <input type="url" name="purchase_url" placeholder="https://etsy.com/..." className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Initial Status</label>
              <select name="status" defaultValue="available" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
                <option value="available">Available (Live)</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </div>
          </div>
        </section>

        {/* Origins & Artisan */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Artisan Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Weaver Profile</label>
              <select name="weaver_id" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
                <option value="">-- Unknown / Unassigned --</option>
                {weavers?.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Cooperative</label>
              <select name="cooperative_id" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none">
                <option value="">-- Unknown / Unassigned --</option>
                {cooperatives?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Region*</label>
              <input type="text" name="region" required placeholder="e.g. Middle Atlas" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Village</label>
              <input type="text" name="village" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
          </div>
        </section>

        {/* Dimensions & Specs */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Dimensions & Materials</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Width (cm)</label>
              <input type="number" step="0.1" name="width_cm" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Length (cm)</label>
              <input type="number" step="0.1" name="length_cm" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Pile Depth</label>
              <input type="number" step="0.1" name="pile_depth_cm" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Weight (kg)</label>
              <input type="number" step="0.1" name="weight_kg" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none" />
            </div>
          </div>
        </section>

        {/* Content & Media (Local File Uploads) */}
        <section className="bg-white p-6 md:p-8 rounded-xl border border-[#EBE6DF] shadow-sm">
          <h2 className="text-lg font-medium text-night mb-6 border-b border-[#EBE6DF] pb-2">Content & Local Imagery</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Primary Image* (Required)</label>
              <input type="file" accept="image/*" name="primary_image_file" required className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#C17A2C] file:text-white hover:file:bg-[#A66825] cursor-pointer" />
            </div>
            <div className="pt-4 border-t border-[#EBE6DF]">
              <label className="block text-sm font-medium text-night mb-3">Gallery Images (Up to 3)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="file" accept="image/*" name="gallery_image_1" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] p-2 rounded focus:border-[#C17A2C] outline-none text-xs file:hidden cursor-pointer" />
                <input type="file" accept="image/*" name="gallery_image_2" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] p-2 rounded focus:border-[#C17A2C] outline-none text-xs file:hidden cursor-pointer" />
                <input type="file" accept="image/*" name="gallery_image_3" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] p-2 rounded focus:border-[#C17A2C] outline-none text-xs file:hidden cursor-pointer" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-night mb-1.5">Product Description</label>
              <textarea name="description" rows={5} className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-4 py-2.5 rounded focus:border-[#C17A2C] outline-none resize-y"></textarea>
            </div>
          </div>
        </section>

        <div className="sticky bottom-4 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-[#EBE6DF] shadow-lg flex items-center justify-end gap-4 z-10">
          <Link href="/admin/products" className="px-6 py-2.5 text-sm font-medium text-smoke hover:text-night transition-colors">
            Cancel
          </Link>
          <button type="submit" className="flex items-center gap-2 bg-[#C17A2C] hover:bg-[#A66825] text-white px-8 py-3 rounded-sm text-sm font-medium transition-transform active:scale-95 shadow-md">
            <PackagePlus size={18} />
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}
