import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Package, MessageSquare, Users, Eye, ArrowRight, ArrowUpRight } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function DashboardOverview() {
  const supabase = await createClient()

  // Fetch quick stats
  const { count: totalProducts } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    
  const { count: bespokeRequests } = await supabase
    .from('bespoke_enquiries')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  const { count: totalWeavers } = await supabase
    .from('weavers')
    .select('*', { count: 'exact', head: true })

  // Fetch recent bespoke requests for the mini-table
  const { data: recentEnquiries } = await supabase
    .from('bespoke_enquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(4)

  // Fetch recent products
  const { data: recentProducts } = await supabase
    .from('products')
    .select('*, weavers(name)')
    .order('created_at', { ascending: false })
    .limit(4)

  const { count: totalViews } = await supabase
    .from('product_views')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display text-night">Overview</h1>
        <p className="text-sm text-smoke mt-1">Welcome back. Here is what is happening with your store today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-smoke">Total Products</h3>
            <div className="p-2 bg-[#F8F6F2] rounded-md text-[#C17A2C]">
              <Package size={18} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-display text-night">{totalProducts || 0}</span>
            <span className="text-xs text-green-600 ml-2 font-medium bg-green-50 px-1.5 py-0.5 rounded flex items-center w-fit mt-1">
              <ArrowUpRight size={12} className="mr-0.5" /> Live
            </span>
          </div>
        </div>

        {/* New Enquiries */}
        <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-smoke">Open Enquiries</h3>
            <div className="p-2 bg-[#F8F6F2] rounded-md text-[#C17A2C]">
              <MessageSquare size={18} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-display text-night">{bespokeRequests || 0}</span>
            <span className="text-xs text-blue-600 ml-2 font-medium bg-blue-50 px-1.5 py-0.5 rounded flex items-center w-fit mt-1">
              Requires attention
            </span>
          </div>
        </div>

        {/* Artisans */}
        <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-smoke">Artisan Network</h3>
            <div className="p-2 bg-[#F8F6F2] rounded-md text-[#C17A2C]">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-display text-night">{totalWeavers || 0}</span>
            <span className="text-xs text-smoke ml-2 mt-1 block">Active weavers</span>
          </div>
        </div>

        {/* Product Views (Placeholder KPI) */}
        <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium text-smoke">Total Pageviews</h3>
            <div className="p-2 bg-[#F8F6F2] rounded-md text-[#C17A2C]">
              <Eye size={18} />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-3xl font-display text-night">{totalViews || 0}</span>
            <span className="text-xs text-smoke ml-2 mt-1 block">Last 30 days</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl border border-[#EBE6DF] shadow-sm">
        <h3 className="text-sm font-medium text-night mb-4">Quick Actions</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-[#F8F6F2] hover:bg-[#EBE6DF] text-night rounded-md text-sm font-medium transition-colors">
            <Package size={16} className="text-[#C17A2C]" />
            New Product
          </Link>
          <Link href="/admin/weavers" className="flex items-center gap-2 px-4 py-2 bg-[#F8F6F2] hover:bg-[#EBE6DF] text-night rounded-md text-sm font-medium transition-colors">
            <Users size={16} className="text-[#C17A2C]" />
            Add Artisan
          </Link>
          <Link href="/admin/journal" className="flex items-center gap-2 px-4 py-2 bg-[#F8F6F2] hover:bg-[#EBE6DF] text-night rounded-md text-sm font-medium transition-colors">
            <MessageSquare size={16} className="text-[#C17A2C]" />
            Draft Article
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Recent Enquiries Mini-Table */}
        <div className="bg-white rounded-xl border border-[#EBE6DF] shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-[#EBE6DF] flex items-center justify-between">
            <h2 className="text-lg font-medium text-night">Recent Enquiries</h2>
            <Link href="/admin/bespoke" className="text-sm text-[#C17A2C] hover:text-[#A66825] font-medium flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex-1 p-0">
            <Table>
              <TableHeader className="bg-[#F8F6F2]">
                <TableRow>
                  <TableHead className="text-xs">Client</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnquiries && recentEnquiries.map((enq) => (
                  <TableRow key={enq.id} className="hover:bg-[#FDFCFB]">
                    <TableCell className="py-3">
                      <div className="font-medium text-night text-sm">{enq.name}</div>
                      <div className="text-xs text-smoke mt-0.5">{enq.email}</div>
                    </TableCell>
                    <TableCell className="py-3">
                      <Badge 
                        variant="secondary" 
                        className={`text-[10px] uppercase tracking-wider font-semibold ${
                          enq.status === 'new' ? 'bg-blue-50 text-blue-700' : 'bg-[#F8F6F2] text-smoke'
                        }`}
                      >
                        {enq.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {(!recentEnquiries || recentEnquiries.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center text-sm text-smoke py-8">
                      No recent enquiries.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Recent Products Mini-Table */}
        <div className="bg-white rounded-xl border border-[#EBE6DF] shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-[#EBE6DF] flex items-center justify-between">
            <h2 className="text-lg font-medium text-night">Latest Additions</h2>
            <Link href="/admin/products" className="text-sm text-[#C17A2C] hover:text-[#A66825] font-medium flex items-center gap-1">
              View catalog <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex-1 p-0">
            <Table>
              <TableHeader className="bg-[#F8F6F2]">
                <TableRow>
                  <TableHead className="text-xs">Product</TableHead>
                  <TableHead className="text-xs text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProducts && recentProducts.map((p) => (
                  <TableRow key={p.id} className="hover:bg-[#FDFCFB]">
                    <TableCell className="py-3">
                      <div className="font-medium text-night text-sm">{p.title}</div>
                      <div className="text-xs text-smoke mt-0.5">By {p.weavers?.name || 'Unknown'}</div>
                    </TableCell>
                    <TableCell className="py-3 text-right">
                      <span className="font-medium text-night text-sm">${p.price_usd}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
