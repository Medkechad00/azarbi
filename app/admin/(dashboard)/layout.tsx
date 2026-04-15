import { Metadata } from 'next'
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar'
import { AdminTopbar } from '@/components/admin/layout/AdminTopbar'
import { CommandPalette } from '@/components/admin/layout/CommandPalette'
import { MobileBottomNav } from '@/components/admin/layout/MobileBottomNav'
import { requireAdmin } from '@/lib/admin/auth'

export const metadata: Metadata = {
  title: 'Azarbi Admin',
  description: 'Control panel for Azarbi e-commerce',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()
  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <AdminSidebar />
      <div className="md:pl-[240px] flex flex-col min-h-screen pb-[72px] md:pb-0">
        <AdminTopbar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 xl:p-10 max-w-[1400px]">
          {children}
        </main>
      </div>

      {/* Global Admin Components */}
      <MobileBottomNav />
      <CommandPalette />
    </div>
  )
}
