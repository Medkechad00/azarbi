'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  LayoutDashboard,
  ShoppingCart,
  PlusCircle,
  MessageSquare,
  Search,
  Moon,
  Globe
} from 'lucide-react'

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => runCommand(() => router.push('/admin/dashboard'))}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Go to Dashboard</span>
          </CommandItem>

          <CommandItem onSelect={() => runCommand(() => router.push('/admin/products/new'))}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Add New Product</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/admin/weavers/new'))}>
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Add New Weaver</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push('/admin/bespoke'))}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>View Bespoke Enquiries</span>
          </CommandItem>
        </CommandGroup>
        
        <CommandSeparator />
        
        <CommandGroup heading="Search">
          <CommandItem onSelect={() => runCommand(() => router.push('/admin/products'))}>
            <Search className="mr-2 h-4 w-4" />
            <span>Search products by name or SKU...</span>
          </CommandItem>

        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="System">
          <CommandItem onSelect={() => runCommand(() => console.log('Toggle Dark Mode'))}>
            <Moon className="mr-2 h-4 w-4" />
            <span>Toggle Dark Mode</span>
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => window.open('/', '_blank'))}>
            <Globe className="mr-2 h-4 w-4" />
            <span>View public site</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
