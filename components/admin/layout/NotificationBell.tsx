'use client'

import { Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function NotificationBell() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNotifications() {
      const supabase = createClient()
      const { count, error } = await supabase
        .from('bespoke_enquiries')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'new')
      
      if (!error && count !== null) {
        setCount(count)
      }
      setLoading(false)
    }

    fetchNotifications()
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="relative text-[#9B8F85] hover:text-[#1C1815] transition-colors p-2 rounded-full hover:bg-[#E6DDD1]/50">
          <Bell size={18} strokeWidth={1.5} />
          {!loading && count > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#DC2626] rounded-full border-2 border-[#F8F6F2] animate-pulse" />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-white border-[#E6DDD1]">
        <DropdownMenuLabel className="font-sans text-[11px] uppercase tracking-[0.1em] text-[#9B8F85] flex items-center justify-between">
          Notifications
          {!loading && count > 0 && (
            <span className="bg-[#DC2626] text-white text-[9px] px-1.5 py-0.5 rounded-full">{count} New</span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-[#E6DDD1]" />
        
        {loading ? (
          <div className="p-4 text-center text-xs text-smoke">Checking inbox...</div>
        ) : count > 0 ? (
          <Link href="/admin/bespoke" className="block p-3 hover:bg-[#FAF8F4] transition-colors cursor-pointer">
            <div className="text-sm font-medium text-night">New Bespoke Request!</div>
            <div className="text-xs text-smoke mt-0.5">You have {count} unanswered enquiries. Click to review.</div>
          </Link>
        ) : (
          <div className="p-4 text-center text-xs text-smoke">You're all caught up!</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
