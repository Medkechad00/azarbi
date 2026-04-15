import Link from 'next/link'
import { LayoutGrid, Plus, MoreVertical, Search, ArrowRight } from 'lucide-react'

export default function CollectionsAdminPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display text-night flex items-center gap-3">
            <LayoutGrid className="text-[#C17A2C]" size={28} />
            Collections
          </h1>
          <p className="text-sm text-smoke mt-1">Curate specific groups of products for marketing campaigns or homepage features.</p>
        </div>
        <button 
          className="flex items-center gap-2 bg-[#C17A2C] hover:bg-[#A66825] text-white px-4 py-2.5 rounded-sm text-sm font-medium transition-colors cursor-not-allowed opacity-50"
          title="Coming soon"
        >
          <Plus size={16} />
          Create Collection
        </button>
      </div>

      {/* Toolbar / Search (Visual Placeholder) */}
      <div className="flex items-center justify-between bg-white p-4 rounded-md border border-[#EBE6DF] shadow-sm">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-smoke" size={16} />
          <input 
            type="text" 
            placeholder="Search collections..." 
            className="w-full pl-9 pr-4 py-2 bg-[#F8F6F2] border border-[#EBE6DF] rounded text-sm focus:outline-none focus:border-[#C17A2C] transition-colors"
          />
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-white rounded-md border border-[#EBE6DF] shadow-sm overflow-hidden p-16 text-center text-smoke flex flex-col items-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-[#F8F6F2] flex items-center justify-center text-[#D9CFBF]">
          <LayoutGrid size={24} />
        </div>
        <p className="text-lg font-medium text-night">No Collections Available</p>
        <p className="text-sm mt-2 max-w-md mx-auto leading-relaxed">
          The Collections module allows you to group products together beyond standard categories (e.g., "Summer Sale Editor's Picks"). This feature is currently in the deployment pipeline.
        </p>
        <Link 
          href="/admin/categories"
          className="mt-6 flex items-center gap-2 text-[#C17A2C] hover:text-[#A66825] text-sm font-medium transition-colors"
        >
          Manage Categories Instead <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
