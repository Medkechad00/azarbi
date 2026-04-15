'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package,
  Users, Building2, MessageSquare,
  BookOpen, Search, Tags, LayoutGrid, ShieldCheck, Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { label: 'Products', href: '/admin/products', icon: Package },
      { label: 'Categories', href: '/admin/categories', icon: Tags },
      { label: 'Collections', href: '/admin/collections', icon: LayoutGrid },
    ]
  },
  {
    label: 'Network',
    items: [
      { label: 'Inquiries', href: '/admin/bespoke', icon: MessageSquare },
      { label: 'Weavers', href: '/admin/weavers', icon: Users },
      { label: 'Cooperatives', href: '/admin/cooperatives', icon: Building2 },
    ]
  },
  {
    label: 'Content',
    items: [
      { label: 'Journal', href: '/admin/journal', icon: BookOpen },
    ]
  },
  {
    label: 'System',
    items: [
      { label: 'Team', href: '/admin/team', icon: ShieldCheck },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ]
  }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="hidden md:flex fixed top-0 left-0 bottom-0 flex-col bg-[#1C1815] border-r border-[#2E2926]"
      style={{ width: 240 }}
    >
      {/* Logo */}
      <div className="px-4 pt-5 pb-3 shrink-0">
        <Link href="/admin/dashboard" className="block">
          <Image src="/logo.svg" alt="Azarbi" width={120} height={32} priority />
        </Link>
      </div>

      {/* Navigation groups - Scrollable */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto 
        scrollbar-thin scrollbar-thumb-[#332C28] scrollbar-track-transparent hover:scrollbar-thumb-[#4A423D]"
      >
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-6">
            <p className="px-3 mb-2 text-[10px] font-sans font-normal uppercase tracking-[0.16em] text-[#9B8F85]/50">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-[10px] h-10 px-3 rounded-[4px] text-[11px] font-sans font-normal uppercase tracking-[0.1em] transition-all duration-200',
                        isActive
                          ? 'bg-[#332C28] text-[#F4EFE5] border-l-2 border-[#C17A2C]'
                          : 'text-[#9B8F85] hover:bg-[#2A2320] hover:text-[#D9CFBF] hover:pl-4' // Interactive hover motion
                      )}
                    >
                      <Icon size={16} strokeWidth={1.5} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Bottom: User avatar */}
      <div className="px-3 py-4 border-t border-[#2E2926] shrink-0">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-[#332C28] flex items-center justify-center text-[11px] font-sans text-[#9B8F85] uppercase">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-sans text-[#F4EFE5] truncate">Admin</p>
            <p className="text-[10px] font-sans text-[#9B8F85] truncate">admin@azarbi.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
