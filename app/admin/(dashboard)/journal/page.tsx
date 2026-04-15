import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import { Plus, Trash2, Search, CheckCircle2, XCircle, Calendar, BookOpen } from 'lucide-react'
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

export default async function JournalAdminPage() {
  const supabase = await createClient()
  
  const { data: posts, error } = await supabase
    .from('journal_posts')
    .select('*')
    .order('created_at', { ascending: false })

  async function deletePost(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('journal_posts').delete().eq('id', id)
    revalidatePath('/admin/journal')
  }

  async function createPost(formData: FormData) {
    'use server'
    await requireAdmin()
    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
    const excerpt = formData.get('excerpt') as string || null
    const body = formData.get('body') as string
    const cover_image_url = formData.get('cover_image_url') as string || null
    const published = formData.get('published') === 'on'
    const tagsRaw = formData.get('tags') as string || ''
    const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean)

    const supabase = await createClient()
    await supabase.from('journal_posts').insert([{
      title, slug, excerpt, body, cover_image_url, published, tags,
      published_at: published ? new Date().toISOString() : null
    }])
    revalidatePath('/admin/journal')
  }

  async function togglePublish(formData: FormData) {
    'use server'
    await requireAdmin()
    const id = formData.get('id') as string
    const current = formData.get('current') === 'true'
    const supabase = await createClient()
    await supabase.from('journal_posts').update({
      published: !current,
      published_at: !current ? new Date().toISOString() : null
    }).eq('id', id)
    revalidatePath('/admin/journal')
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-night flex items-center gap-2">
            <BookOpen size={28} className="text-[#C17A2C]" />
            Journal Editorial
          </h1>
          <p className="text-sm text-smoke mt-1">Manage blog articles and content marketing.</p>
        </div>
      </div>

      {/* Quick Create */}
      <details className="bg-white rounded-xl border border-[#EBE6DF] shadow-sm">
        <summary className="px-6 py-4 cursor-pointer text-sm font-medium text-night flex items-center gap-2 hover:bg-[#F8F6F2] rounded-xl transition-colors">
          <Plus size={16} className="text-[#C17A2C]" />
          Create New Article
        </summary>
        <form action={createPost} className="px-6 pb-6 pt-2 space-y-4 border-t border-[#EBE6DF]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-night mb-1">Title*</label>
              <input type="text" name="title" required placeholder="Article headline" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-night mb-1">Excerpt</label>
              <input type="text" name="excerpt" placeholder="Short summary for previews..." className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-night mb-1">Body* (Markdown)</label>
              <textarea name="body" required rows={8} placeholder="## Your article content here..." className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none font-mono" />
            </div>
            <div>
              <label className="block text-xs font-medium text-night mb-1">Cover Image URL</label>
              <input type="url" name="cover_image_url" placeholder="https://..." className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-night mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" placeholder="craft, tradition, guide" className="w-full bg-[#F8F6F2] border border-[#EBE6DF] px-3 py-2 text-sm rounded focus:border-[#C17A2C] outline-none" />
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-xs font-medium text-night cursor-pointer">
              <input type="checkbox" name="published" className="w-3.5 h-3.5" />
              Publish immediately
            </label>
            <button type="submit" className="bg-[#1C1815] text-white px-6 py-2 rounded text-sm font-medium hover:bg-black transition-colors">
              Create Article
            </button>
          </div>
        </form>
      </details>

      {/* Data Table */}
      <div className="bg-white rounded-md border border-[#EBE6DF] shadow-sm overflow-hidden">
        {error ? (
          <div className="p-8 text-center text-red-500">Failed to load journal posts.</div>
        ) : posts && posts.length > 0 ? (
          <Table>
            <TableHeader className="bg-[#F8F6F2] border-b border-[#EBE6DF]">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] font-sans font-semibold text-[#8B7E74]">Cover</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Article Title</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Author</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Status</TableHead>
                <TableHead className="font-sans font-semibold text-[#8B7E74]">Date</TableHead>
                <TableHead className="text-right font-sans font-semibold text-[#8B7E74]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id} className="group hover:bg-[#FDFCFB] transition-colors">
                  <TableCell>
                    <div className="relative w-16 h-12 rounded overflow-hidden bg-linen border border-[#EBE6DF]">
                      {post.cover_image_url ? (
                        <Image 
                          src={post.cover_image_url} 
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#F8F6F2]" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-night line-clamp-1">{post.title}</div>
                    <div className="text-xs text-smoke mt-0.5 font-mono">{post.slug}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-night">{post.author}</div>
                  </TableCell>
                  <TableCell>
                    <form action={togglePublish} className="inline">
                      <input type="hidden" name="id" value={post.id} />
                      <input type="hidden" name="current" value={post.published ? 'true' : 'false'} />
                      <button type="submit">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs font-medium capitalize flex w-fit items-center gap-1 border cursor-pointer hover:opacity-80 transition-opacity ${
                            post.published 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-zinc-100 text-zinc-700 border-zinc-200'
                          }`}
                        >
                          {post.published ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                          {post.published ? 'Published' : 'Draft'}
                        </Badge>
                      </button>
                    </form>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-night flex items-center gap-1.5">
                      <Calendar size={14} className="text-smoke" />
                      {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <form action={deletePost} className="inline">
                      <input type="hidden" name="id" value={post.id} />
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
            <p className="text-lg font-medium text-night">No articles found</p>
            <p className="text-sm mt-1">Create your first journal article above.</p>
          </div>
        )}
      </div>
    </div>
  )
}
