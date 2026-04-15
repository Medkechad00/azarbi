import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, ExternalLink, Trash2, Edit, Search } from 'lucide-react'
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

export default async function ProductsAdminPage() {
  const supabase = await createClient()
  
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      weavers ( name ),
      cooperatives ( name )
    `)
    .order('created_at', { ascending: false })

  async function deleteProduct(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('products').delete().eq('id', id)
    revalidatePath('/admin/products')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-night">Products</h1>
          <p className="text-sm text-smoke mt-1">Manage your catalogue and Etsy inventory links here.</p>
        </div>
        <Link 
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#C17A2C] hover:bg-[#A66825] text-white px-4 py-2.5 rounded-sm text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Toolbar / Search (Visual Placeholder) */}
      <div className="flex items-center justify-between bg-white p-4 rounded-md border border-[#EBE6DF] shadow-sm">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" size={16} />
          <input 
            type="text" 
            placeholder="Search by SKU or title..." 
            className="w-full pl-9 pr-4 py-2 bg-[#F8F6F2] border border-[#EBE6DF] rounded text-sm focus:outline-none focus:border-[#C17A2C] transition-colors"
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-[#F8F6F2] border border-[#EBE6DF] text-sm text-night rounded px-3 py-2 focus:outline-none">
            <option>All Categories</option>
            <option>Beni Ourain</option>
            <option>Azilal</option>
            <option>Kilim</option>
          </select>
          <select className="bg-[#F8F6F2] border border-[#EBE6DF] text-sm text-night rounded px-3 py-2 focus:outline-none">
            <option>All Statuses</option>
            <option>Available</option>
            <option>Sold</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-md border border-[#EBE6DF] shadow-sm overflow-hidden">
        {error ? (
          <div className="p-8 text-center text-red-500">Failed to load products.</div>
        ) : products && products.length > 0 ? (
          <Table>
            <TableHeader className="bg-[#F8F6F2] border-b border-[#EBE6DF]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] font-sans font-semibold text-[#8B7E74]">Image</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Product</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Category</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Price</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Status</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Etsy Link</TableHead>
                <TableHead className="text-right font-sans font-semibold text-[#8B7E74]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="group hover:bg-[#FDFCFB] transition-colors">
                  <TableCell>
                    <div className="relative w-12 h-16 rounded overflow-hidden bg-linen">
                      {product.primary_image_url ? (
                        <Image 
                          src={product.primary_image_url} 
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                         <div className="w-full h-full bg-[#EBE6DF]" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-night">{product.title}</div>
                    <div className="text-xs text-smoke font-mono mt-0.5">{product.sku}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize text-xs font-normal border-[#EBE6DF] text-smoke bg-[#F8F6F2]">
                      {product.category.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-night">
                    ${product.price_usd}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs font-medium capitalize ${
                        product.status === 'available' ? 'bg-green-100 text-green-800' : 
                        product.status === 'sold' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.purchase_url ? (
                      <a href={product.purchase_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center gap-1.5 text-xs font-medium">
                        View <ExternalLink size={12} />
                      </a>
                    ) : (
                      <span className="text-xs text-smoke italic">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end">
                      <Link href={`/admin/products/${product.id}/edit`} className="inline-flex p-2 text-smoke hover:text-[#C17A2C] transition-colors rounded-full hover:bg-[#F8F6F2]">
                        <Edit size={16} />
                      </Link>
                      <form action={deleteProduct}>
                        <input type="hidden" name="id" value={product.id} />
                        <button type="submit" className="p-2 text-[#9B8F85] hover:text-red-600 transition-colors rounded-full hover:bg-red-50 ml-1">
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="p-16 text-center text-smoke flex flex-col items-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#D9CFBF]">
              <Search size={24} />
            </div>
            <p className="text-lg font-medium text-night">No products found</p>
            <p className="text-sm mt-1">Get started by creating your first product.</p>
          </div>
        )}
      </div>
    </div>
  )
}
