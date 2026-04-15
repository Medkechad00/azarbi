import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Tags, Plus, Pencil, Trash2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'

export default async function CategoriesPage() {
  const supabase = await createClient()

  // Fetch all categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: false })

  // Quick Action: Delete via Server Action form
  async function deleteCategory(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const supabase = await createClient()
    
    // Check if products use this category before deleting (optional, but good practice)
    // Actually, because products reference category by slug/name as text currently, 
    // it won't strictly violate a foreign key yet, but deleting a category may hide products in filters.
    await supabase.from('categories').delete().eq('id', id)
    revalidatePath('/admin/categories')
  }

  // Quick Action: Create via Server Action form
  async function createCategory(formData: FormData) {
    'use server'
    await requireAdmin()
    const name = formData.get('name') as string
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const description = formData.get('description') as string
    
    const supabase = await createClient()
    await supabase.from('categories').insert([{ name, slug, description }])
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
          <p className="text-sm text-smoke mt-1">Manage product taxonomies globally.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm sticky top-24">
            <h2 className="text-sm font-medium text-night mb-4 flex items-center gap-2">
              <Plus size={16} />
              New Category
            </h2>
            <form action={createCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-night mb-1.5">Category Name</label>
                <input type="text" name="name" required placeholder="e.g. Vintage Runner" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-night mb-1.5">Description (Optional)</label>
                <textarea name="description" rows={3} placeholder="Describe this category" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
              </div>
              <button type="submit" className="w-full bg-[#1C1815] text-white px-4 py-2 rounded text-sm font-medium hover:bg-black transition-colors">
                Add Category
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-[#EBE6DF] shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#EBE6DF] bg-[#F8F6F2]">
                  <th className="px-6 py-4 text-[11px] font-sans uppercase tracking-widest text-[#9B8F85] font-medium">Category Structure</th>
                  <th className="px-6 py-4 text-[11px] font-sans uppercase tracking-widest text-[#9B8F85] font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE6DF]">
                {categories?.map((cat) => (
                  <tr key={cat.id} className="hover:bg-[#F8F6F2]/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-medium text-sm text-night">{cat.name}</div>
                      <div className="text-xs text-smoke font-mono mt-0.5">slug: {cat.slug}</div>
                      {cat.description && <div className="text-xs text-smoke mt-1 truncate max-w-sm">{cat.description}</div>}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {/* We use a form to cleanly hit a server action with a hidden input */}
                        <form action={deleteCategory}>
                          <input type="hidden" name="id" value={cat.id} />
                          <button type="submit" className="p-2 text-[#9B8F85] hover:text-red-600 transition-colors bg-white hover:bg-red-50 border border-[#EBE6DF] hover:border-red-200 rounded">
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {(!categories || categories.length === 0) && (
                  <tr>
                    <td colSpan={2} className="px-6 py-12 text-center text-sm text-smoke">
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
