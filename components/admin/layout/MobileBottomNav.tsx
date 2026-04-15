'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Menu,
  Users,
  Building2,
  BookOpen,
  UserCircle,
  Tags,
  Settings
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'

const MAIN_NAV = [
  { label: 'Dash', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Catalogue', href: '/admin/products', icon: Package },
  { label: 'Inbox', href: '/admin/bespoke', icon: MessageSquare },
]

const MENU_LINKS = [
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Weavers', href: '/admin/weavers', icon: Users },
  { label: 'Cooperatives', href: '/admin/cooperatives', icon: Building2 },
  { label: 'Journal', href: '/admin/journal', icon: BookOpen },
  { label: 'Admin Team', href: '/admin/team', icon: UserCircle },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#1C1815]/95 backdrop-blur-md border-t border-[#2E2926] pb-safe">
      <nav className="flex items-center justify-around px-2 py-3 h-[72px]">
        {MAIN_NAV.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <div key={item.label} className="relative flex-1 flex justify-center">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center w-full gap-1 z-10 transition-colors ${
                  isActive ? 'text-[#F4EFE5]' : 'text-[#9B8F85] hover:text-[#D9CFBF]'
                }`}
              >
                <div className="relative p-2">
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-pill"
                      className="absolute inset-0 bg-[#C17A2C]/20 rounded-full"
                      style={{ border: '1px solid rgba(193, 122, 44, 0.4)' }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className="relative z-10" />
                </div>
                <span className="text-[10px] font-sans tracking-wide">{item.label}</span>
              </Link>
            </div>
          )
        })}

        {/* Menu Sheet Trigger */}
        <div className="relative flex-1 flex justify-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center w-full gap-1 text-[#9B8F85] hover:text-[#D9CFBF] transition-colors">
                <div className="p-2">
                  <Menu size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-sans tracking-wide">Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-[#1C1815] border-[#2E2926] text-[#F4EFE5] rounded-t-3xl min-h-[50vh]">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-[#F4EFE5]">More Options</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                {MENU_LINKS.map(link => {
                  const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-colors ${
                        isActive ? 'bg-[#332C28] text-[#C17A2C]' : 'bg-[#2A2320] text-[#9B8F85] hover:text-[#F4EFE5]'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="text-sm font-medium tracking-wide">{link.label}</span>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  )
}
