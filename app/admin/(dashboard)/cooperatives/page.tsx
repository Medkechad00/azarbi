import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Trash2, MapPin, Search, Users, Building2 } from 'lucide-react'
import { revalidatePath } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function CooperativesAdminPage() {
  const supabase = await createClient()
  
  const { data: cooperatives, error } = await supabase
    .from('cooperatives')
    .select('*')
    .order('created_at', { ascending: false })

  async function deleteCooperative(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('cooperatives').delete().eq('id', id)
    revalidatePath('/admin/cooperatives')
  }

  async function createCooperative(formData: FormData) {
    'use server'
    await requireAdmin()
    const name = formData.get('name') as string
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const region = formData.get('region') as string
    const village = formData.get('village') as string
    const weaver_count = parseInt(formData.get('weaver_count') as string) || 0
    const founded_year = parseInt(formData.get('founded_year') as string) || null
    const description = formData.get('description') as string || null
    
    const supabase = await createClient()
    await supabase.from('cooperatives').insert([{ name, slug, region, village, weaver_count, founded_year, description }])
    revalidatePath('/admin/cooperatives')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-night flex items-center gap-2">
            <Building2 size={28} className="text-[#C17A2C]" />
            Cooperatives
          </h1>
          <p className="text-sm text-smoke mt-1">Manage artisan communities and geographic locations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm sticky top-24">
            <h2 className="text-sm font-medium text-night mb-4 flex items-center gap-2">
              <Plus size={16} />
              Add Cooperative
            </h2>
            <form action={createCooperative} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-night mb-1">Name*</label>
                <input type="text" name="name" required placeholder="e.g. Tamzrite Atelier" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-night mb-1">Region*</label>
                  <input type="text" name="region" required placeholder="High Atlas" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-night mb-1">Village*</label>
                  <input type="text" name="village" required placeholder="Imilchil" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-night mb-1">Weavers</label>
                  <input type="number" name="weaver_count" placeholder="0" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-night mb-1">Founded</label>
                  <input type="number" name="founded_year" placeholder="2010" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-night mb-1">Description</label>
                <textarea name="description" rows={3} placeholder="About this cooperative..." className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
              </div>
              <button type="submit" className="w-full bg-[#1C1815] text-white px-4 py-2 rounded text-sm font-medium hover:bg-black transition-colors">
                Create Cooperative
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-md border border-[#EBE6DF] shadow-sm overflow-hidden">
            {error ? (
              <div className="p-8 text-center text-red-500">Failed to load cooperatives.</div>
            ) : cooperatives && cooperatives.length > 0 ? (
              <Table>
                <TableHeader className="bg-[#F8F6F2] border-b border-[#EBE6DF]">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="font-sans font-semibold text-[#8B7E74]">Name</TableHead>
                    <TableHead className="font-sans font-semibold text-[#8B7E74]">Location</TableHead>
                    <TableHead className="font-sans font-semibold text-[#8B7E74]">Est.</TableHead>
                    <TableHead className="font-sans font-semibold text-[#8B7E74]">Artisans</TableHead>
                    <TableHead className="text-right font-sans font-semibold text-[#8B7E74]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cooperatives.map((coop) => (
                    <TableRow key={coop.id} className="group hover:bg-[#FDFCFB] transition-colors">
                      <TableCell>
                        <div className="font-medium text-night">{coop.name}</div>
                        <div className="text-xs text-smoke font-mono mt-0.5">{coop.slug}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-night flex items-center gap-1.5">
                          <MapPin size={12} className="text-smoke" />
                          {coop.village}
                        </div>
                        <div className="text-xs text-smoke mt-0.5 ml-4">{coop.region}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-night">{coop.founded_year || '—'}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-night">
                          <Users size={14} className="text-smoke" />
                          <span className="font-medium">{coop.weaver_count || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <form action={deleteCooperative} className="inline">
                          <input type="hidden" name="id" value={coop.id} />
                          <button type="submit" className="p-2 text-[#9B8F85] hover:text-red-600 transition-colors rounded-full hover:bg-red-50">
                            <Trash2 size={16} />
                          </button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-16 text-center text-smoke flex flex-col items-center">
                <p className="text-lg font-medium text-night">No cooperatives found</p>
                <p className="text-sm mt-1">Use the form to add your first cooperative.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
