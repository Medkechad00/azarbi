import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Tags, Plus, Pencil, Trash2, X, ImageIcon, Upload } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/admin/auth'
import fs from 'fs'
import path from 'path'

// ── Shared upload helper ──────────────────────────────
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'categories')
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif']

async function handleImageUpload(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null
  if (file.size > MAX_FILE_SIZE) throw new Error('File too large (max 5MB)')
  if (!ALLOWED_TYPES.includes(file.type))
    throw new Error('Invalid file type. Allowed: JPEG, PNG, WebP, AVIF')

  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const ext =
    file.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
  const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer)
  return `/uploads/categories/${filename}`
}

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ editId?: string }>
}) {
  const params = await searchParams
  const editId = params?.editId
  const supabase = await createClient()

  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  // If editing, find the target category
  const editingCategory = editId
    ? categories?.find((c) => c.id === editId) ?? null
    : null

  // ── Server Action: Create ──────────────────────────
  async function createCategory(formData: FormData) {
    'use server'
    await requireAdmin()
    const name = formData.get('name') as string
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    const description = (formData.get('description') as string) || null

    const imageFile = formData.get('image_file') as File | null
    const image_url = await handleImageUpload(imageFile)

    const supabase = await createClient()
    await supabase
      .from('categories')
      .insert([{ name, slug, description, image_url }])
    revalidatePath('/admin/categories')
  }

  // ── Server Action: Update ──────────────────────────
  async function editCategory(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const name = formData.get('name') as string
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
    const description = (formData.get('description') as string) || null

    const imageFile = formData.get('image_file') as File | null
    const newImageUrl = await handleImageUpload(imageFile)

    // Keep the existing image if no new file was uploaded
    const existingImageUrl = formData.get('existing_image_url') as string | null
    const image_url = newImageUrl || existingImageUrl || null

    const supabase = await createClient()
    await supabase
      .from('categories')
      .update({ name, slug, description, image_url })
      .eq('id', id)
    revalidatePath('/admin/categories')
    redirect('/admin/categories')
  }

  // ── Server Action: Delete ──────────────────────────
  async function deleteCategory(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('categories').delete().eq('id', id)
    revalidatePath('/admin/categories')
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display text-night flex items-center gap-2">
            <Tags size={24} className="text-[#C17A2C]" />
            Category Management
          </h1>
          <p className="text-sm text-smoke mt-1">
            {categories?.length ?? 0} categories &middot; Manage product
            taxonomies globally.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ────────────── Left Sidebar: Create / Edit Form ────────────── */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm sticky top-24">
            {editingCategory ? (
              /* ── Edit Mode ─────────────────────────────── */
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-medium text-night flex items-center gap-2">
                    <Pencil size={16} />
                    Edit Category
                  </h2>
                  <Link
                    href="/admin/categories"
                    className="p-1.5 rounded hover:bg-[#F8F6F2] text-smoke hover:text-night transition-colors"
                  >
                    <X size={16} />
                  </Link>
                </div>
                <form action={editCategory} className="space-y-4">
                  <input type="hidden" name="id" value={editingCategory.id} />
                  <input
                    type="hidden"
                    name="existing_image_url"
                    value={editingCategory.image_url ?? ''}
                  />
                  <div>
                    <label className="block text-xs font-medium text-night mb-1.5">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={editingCategory.name}
                      className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-night mb-1.5">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      defaultValue={editingCategory.description ?? ''}
                      className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-night mb-1.5">
                      Category Image
                    </label>
                    {editingCategory.image_url && (
                      <div className="mb-2 relative w-full aspect-video rounded overflow-hidden border border-[#EBE6DF]">
                        <Image
                          src={editingCategory.image_url}
                          alt={editingCategory.name}
                          fill
                          className="object-cover"
                          sizes="300px"
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      name="image_file"
                      className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#C17A2C] file:text-white hover:file:bg-[#A66825] cursor-pointer"
                    />
                    <p className="text-[11px] text-smoke mt-1">
                      {editingCategory.image_url
                        ? 'Upload a new image to replace the current one, or leave empty to keep it.'
                        : 'JPEG, PNG, WebP or AVIF — max 5 MB.'}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#C17A2C] text-white px-4 py-2 rounded text-sm font-medium hover:bg-[#A8691F] transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </>
            ) : (
              /* ── Create Mode ───────────────────────────── */
              <>
                <h2 className="text-sm font-medium text-night mb-4 flex items-center gap-2">
                  <Plus size={16} />
                  New Category
                </h2>
                <form action={createCategory} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-night mb-1.5">
                      Category Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Vintage Runner"
                      className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-night mb-1.5">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      placeholder="Describe this category"
                      className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-night mb-1.5">
                      Category Image
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      name="image_file"
                      className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-[#C17A2C] file:text-white hover:file:bg-[#A66825] cursor-pointer"
                    />
                    <p className="text-[11px] text-smoke mt-1">
                      JPEG, PNG, WebP or AVIF — max 5 MB.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1C1815] text-white px-4 py-2 rounded text-sm font-medium hover:bg-black transition-colors"
                  >
                    Add Category
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {/* ────────────── Right Side: Category List ────────────── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#EBE6DF] shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EBE6DF] bg-[#F8F6F2]">
                  <th className="px-6 py-4 text-[11px] font-sans uppercase tracking-widest text-[#9B8F85] font-medium">
                    Image
                  </th>
                  <th className="px-6 py-4 text-[11px] font-sans uppercase tracking-widest text-[#9B8F85] font-medium">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[11px] font-sans uppercase tracking-widest text-[#9B8F85] font-medium text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE6DF]">
                {categories?.map((cat) => (
                  <tr
                    key={cat.id}
                    className={`hover:bg-[#F8F6F2]/50 transition-colors group ${
                      editId === cat.id ? 'bg-[#FDF8F0]' : ''
                    }`}
                  >
                    {/* Thumbnail */}
                    <td className="px-6 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#EBE6DF] bg-[#F8F6F2] flex items-center justify-center flex-shrink-0">
                        {cat.image_url ? (
                          <Image
                            src={cat.image_url}
                            alt={cat.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <ImageIcon size={18} className="text-[#C5BAB0]" />
                        )}
                      </div>
                    </td>

                    {/* Name & Slug */}
                    <td className="px-6 py-3">
                      <div className="font-medium text-sm text-night">
                        {cat.name}
                      </div>
                      <div className="text-xs text-smoke font-mono mt-0.5">
                        slug: {cat.slug}
                      </div>
                      {cat.description && (
                        <div className="text-xs text-smoke mt-1 truncate max-w-sm">
                          {cat.description}
                        </div>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/categories?editId=${cat.id}`}
                          className="p-2 text-[#9B8F85] hover:text-[#C17A2C] transition-colors bg-white hover:bg-[#FDF8F0] border border-[#EBE6DF] hover:border-[#C17A2C]/30 rounded"
                        >
                          <Pencil size={14} />
                        </Link>
                        <form action={deleteCategory}>
                          <input type="hidden" name="id" value={cat.id} />
                          <button
                            type="submit"
                            className="p-2 text-[#9B8F85] hover:text-red-600 transition-colors bg-white hover:bg-red-50 border border-[#EBE6DF] hover:border-red-200 rounded"
                          >
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}

                {(!categories || categories.length === 0) && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-12 text-center text-sm text-smoke"
                    >
                      No categories found. Start creating some taxonomies.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
