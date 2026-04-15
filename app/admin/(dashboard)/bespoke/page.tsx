import { createClient } from '@/lib/supabase/server'
import { Search, Mail, Phone, Calendar, SearchX, CheckCircle2, Clock, XCircle, MessageSquare } from 'lucide-react'
import { StatusSelect } from '@/components/admin/StatusSelect'
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

export default async function BespokeAdminPage() {
  const supabase = await createClient()
  
  const { data: enquiries, error } = await supabase
    .from('bespoke_enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  async function updateStatus(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const status = formData.get('status') as string
    const supabase = await createClient()
    await supabase.from('bespoke_enquiries').update({ status }).eq('id', id)
    revalidatePath('/admin/bespoke')
  }

  async function deleteEnquiry(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('bespoke_enquiries').delete().eq('id', id)
    revalidatePath('/admin/bespoke')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-night flex items-center gap-2">
            <MessageSquare size={28} className="text-[#C17A2C]" />
            Bespoke Enquiries
          </h1>
          <p className="text-sm text-smoke mt-1">Manage custom rug requests and client communication.</p>
        </div>
        {enquiries && (
          <div className="text-sm text-smoke">
            <span className="font-medium text-night">{enquiries.filter(e => e.status === 'new').length}</span> new · <span className="font-medium text-night">{enquiries.length}</span> total
          </div>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-md border border-[#EBE6DF] shadow-sm overflow-hidden">
        {error ? (
          <div className="p-8 text-center text-red-500">Failed to load enquiries.</div>
        ) : enquiries && enquiries.length > 0 ? (
          <Table>
            <TableHeader className="bg-[#F8F6F2] border-b border-[#EBE6DF]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Client</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Request Details</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Budget</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Status</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Date</TableHead>
                <TableHead className="text-right font-sans font-semibold text-[#8B7E74]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries.map((enq) => (
                <TableRow key={enq.id} className="group hover:bg-[#FDFCFB] transition-colors">
                  <TableCell>
                    <div className="font-medium text-night">{enq.name}</div>
                    <div className="text-xs text-smoke mt-1 flex items-center gap-1.5 hover:text-[#C17A2C] transition-colors">
                      <Mail size={12} />
                      <a href={`mailto:${enq.email}`}>{enq.email}</a>
                    </div>
                    {enq.phone && (
                      <div className="text-xs text-smoke mt-0.5 flex items-center gap-1.5">
                        <Phone size={12} />
                        {enq.phone}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-night">
                      {enq.category_pref ? <span className="capitalize font-medium">{enq.category_pref.replace('_', ' ')}</span> : 'Any style'}
                    </div>
                    <div className="text-xs text-smoke mt-0.5">
                      {enq.width_cm && enq.length_cm ? `${enq.width_cm}×${enq.length_cm} cm` : 'Size TBD'}
                      {enq.color_palette && ` · ${enq.color_palette}`}
                    </div>
                    {enq.message && <div className="text-xs text-smoke mt-1 line-clamp-2 max-w-xs italic">"{enq.message}"</div>}
                  </TableCell>
                  <TableCell className="font-medium text-night">
                    {enq.budget_max_usd ? (
                      <span className="text-green-700">${enq.budget_min_usd || 0} – ${enq.budget_max_usd}</span>
                    ) : (
                      <span className="text-smoke italic">Undisclosed</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusSelect currentStatus={enq.status} enquiryId={enq.id} action={updateStatus} />
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-night flex items-center gap-1.5">
                      <Calendar size={14} className="text-smoke" />
                      {new Date(enq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="text-[10px] text-smoke mt-0.5">
                      {enq.source && `via ${enq.source}`}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <form action={deleteEnquiry} className="inline">
                      <input type="hidden" name="id" value={enq.id} />
                      <button type="submit" className="p-2 text-[#9B8F85] hover:text-red-600 transition-colors rounded-full hover:bg-red-50">
                        <XCircle size={16} />
                      </button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-16 text-center text-smoke flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#D9CFBF]">
              <SearchX size={24} />
            </div>
            <p className="text-lg font-medium text-night">Inbox Empty</p>
            <p className="text-sm mt-1">You have no bespoke enquiries at the moment.</p>
          </div>
        )}
      </div>
    </div>
  )
}
