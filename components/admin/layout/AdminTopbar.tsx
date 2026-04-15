'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import * as React from 'react'
import { NotificationBell } from '@/components/admin/layout/NotificationBell'
import { createClient } from '@/lib/supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User, Settings, LogOut } from 'lucide-react'

export function AdminTopbar() {
  const pathname = usePathname()
  const router = useRouter()
  
  // Basic breadcrumb logic based on pathname
  const paths = pathname.split('/').filter(Boolean).slice(1) // Remove 'admin' from start

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }
  
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-6 bg-[#F8F6F2] border-b border-[#E6DDD1]">
      {/* Breadcrumb */}
      <div className="flex items-center text-[11px] font-sans font-light uppercase tracking-[0.1em] text-[#9B8F85]">
        <Link href="/admin/dashboard" className="hover:text-[#1C1815] transition-colors">
          Admin
        </Link>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1
          const href = `/admin/${paths.slice(0, index + 1).join('/')}`
          const formattedPath = path.replace(/-/g, ' ')
          
          return (
            <React.Fragment key={path}>
              <span className="mx-2 text-[#D9CFBF]">/</span>
              {isLast ? (
                <span className="text-[#1C1815] font-normal">{formattedPath}</span>
              ) : (
                <Link href={href} className="hover:text-[#1C1815] transition-colors">
                  {formattedPath}
                </Link>
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        <NotificationBell />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-[#E6DDD1] flex items-center justify-center text-[11px] font-sans text-[#1C1815] uppercase hover:bg-[#D9CFBF] transition-colors">
              A
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-white border-[#E6DDD1]">
            <DropdownMenuLabel className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#9B8F85]">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#E6DDD1]" />
            <DropdownMenuItem asChild className="font-sans text-[13px] text-[#1C1815] focus:bg-[#FAF8F4] cursor-pointer">
              <Link href="/admin/team" className="flex items-center gap-2 w-full">
                <User size={14} className="text-[#9B8F85]" />
                Profile & Security
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="font-sans text-[13px] text-[#1C1815] focus:bg-[#FAF8F4] cursor-pointer">
              <Link href="/admin/settings" className="flex items-center gap-2 w-full">
                <Settings size={14} className="text-[#9B8F85]" />
                Platform Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#E6DDD1]" />
            <DropdownMenuItem 
              onClick={handleLogout}
              className="font-sans text-[13px] text-[#DC2626] focus:bg-[#FEE2E2] focus:text-[#991B1B] cursor-pointer flex items-center gap-2"
            >
              <LogOut size={14} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
