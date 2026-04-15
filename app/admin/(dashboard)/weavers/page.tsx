import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Trash2, MapPin, Search, Users } from 'lucide-react'
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
import { Badge } from '@/components/ui/badge'

export default async function WeaversAdminPage() {
  const supabase = await createClient()
  
  const { data: weavers, error } = await supabase
    .from('weavers')
    .select(`
      *,
      cooperatives ( id, name, region )
    `)
    .order('created_at', { ascending: false })

  const { data: cooperatives } = await supabase.from('cooperatives').select('id, name')

  async function deleteWeaver(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('weavers').delete().eq('id', id)
    revalidatePath('/admin/weavers')
  }

  async function createWeaver(formData: FormData) {
    'use server'
    await requireAdmin()
    const name = formData.get('name') as string
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const cooperative_id = formData.get('cooperative_id') as string || null
    const years_weaving = parseInt(formData.get('years_weaving') as string) || null
    const bio = formData.get('bio') as string || null
    const featured = formData.get('featured') === 'on'
    
    const supabase = await createClient()
    await supabase.from('weavers').insert([{ name, slug, cooperative_id: cooperative_id || null, years_weaving, bio, featured }])
    revalidatePath('/admin/weavers')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-night flex items-center gap-2">
            <Users size={28} className="text-[#C17A2C]" />
            Weavers
          </h1>
          <p className="text-sm text-smoke mt-1">Manage artisan profiles and their specialties.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm sticky top-24">
            <h2 className="text-sm font-medium text-night mb-4 flex items-center gap-2">
              <Plus size={16} />
              Add Weaver
            </h2>
            <form action={createWeaver} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-night mb-1">Full Name*</label>
                <input type="text" name="name" required placeholder="e.g. Fatima Ait Haddou" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-night mb-1">Cooperative</label>
                <select name="cooperative_id" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none">
                  <option value="">-- Independent --</option>
                  {cooperatives?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-night mb-1">Years Weaving</label>
                <input type="number" name="years_weaving" placeholder="e.g. 15" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
              </div>
              <div>
                <label className="block text-xs font-medium text-night mb-1">Bio</label>
                <textarea name="bio" rows={3} placeholder="Short biography..." className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
              </div>
              <label className="flex items-center gap-2 text-xs font-medium text-night cursor-pointer">
                <input type="checkbox" name="featured" className="w-3.5 h-3.5" />
                Featured Artisan
              </label>
              <button type="submit" className="w-full bg-[#1C1815] text-white px-4 py-2 rounded text-sm font-medium hover:bg-black transition-colors">
                Create Weaver Profile
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-md border border-[#EBE6DF] shadow-sm overflow-hidden">
            {error ? (
              <div className="p-8 text-center text-red-500">Failed to load weavers.</div>
            ) : weavers && weavers.length > 0 ? (
              <Table>
                <TableHeader className="bg-[#F8F6F2] border-b border-[#EBE6DF]">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-[60px] font-sans font-semibold text-[#8B7E74]">Portrait</TableHead>
                    <TableHead className="font-sans font-semibold text-[#8B7E74]">Name</TableHead>
                    <TableHead className="font-sans font-semibold text-[#8B7E74]">Cooperative & Region</TableHead>
                    <TableHead className="font-sans font-semibold text-[#8B7E74]">Specialties</TableHead>
                    <TableHead className="font-sans font-semibold text-[#8B7E74]">Experience</TableHead>
                    <TableHead className="text-right font-sans font-semibold text-[#8B7E74]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {weavers.map((weaver) => (
                    <TableRow key={weaver.id} className="group hover:bg-[#FDFCFB] transition-colors">
                      <TableCell>
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-linen border border-[#EBE6DF]">
                          {weaver.portrait_url ? (
                            <Image 
                              src={weaver.portrait_url} 
                              alt={weaver.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-medium text-smoke uppercase bg-[#F8F6F2]">
                              {weaver.name.charAt(0)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-night flex items-center gap-2">
                          {weaver.name}
                          {weaver.featured && (
                            <Badge variant="secondary" className="bg-[#C17A2C]/10 text-[#C17A2C] border-none text-[10px] px-1.5 py-0">Featured</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-night">
                          {weaver.cooperatives?.name || 'Independent'}
                        </div>
                        {weaver.cooperatives?.region && (
                          <div className="text-xs text-smoke mt-0.5 flex items-center gap-1">
                            <MapPin size={10} />
                            {weaver.cooperatives.region}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {weaver.specialties?.map((spec: string) => (
                            <Badge key={spec} variant="outline" className="capitalize text-[10px] font-normal border-[#EBE6DF] text-smoke bg-[#F8F6F2]">
                              {spec.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium text-night">
                          {weaver.years_weaving ? `${weaver.years_weaving} Years` : '—'}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <form action={deleteWeaver} className="inline">
                          <input type="hidden" name="id" value={weaver.id} />
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
                <p className="text-lg font-medium text-night">No weavers found</p>
                <p className="text-sm mt-1">Use the form to add your first artisan profile.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
