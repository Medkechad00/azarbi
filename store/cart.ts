import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  productId: string
  sku: string
  slug: string
  title: string
  price_usd: number
  image_url: string
  weaverName?: string
  purchase_url?: string
}

interface CartStore {
  items: CartItem[]
  justAdded: string | null
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  clearJustAdded: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      justAdded: null,
      addItem: (item) => set((state) => {
        if (state.items.find(i => i.productId === item.productId)) return state
        return { items: [...state.items, item], justAdded: item.productId }
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),
      clearCart: () => set({ items: [] }),
      clearJustAdded: () => set({ justAdded: null }),
      total: () => get().items.reduce((sum, item) => sum + item.price_usd, 0),
      count: () => get().items.length,
    }),
    { 
      name: 'azarbi-cart',
      partialize: (state) => ({ items: state.items }), // Don't persist justAdded
    }
  )
)
