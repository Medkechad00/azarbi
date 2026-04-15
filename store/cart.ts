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
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  total: () => number
  count: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Each rug is unique — prevent duplicates
        if (state.items.find(i => i.productId === item.productId)) return state
        return { items: [...state.items, item] }
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, item) => sum + item.price_usd, 0),
      count: () => get().items.length,
    }),
    { name: 'azarbi-cart' }
  )
)
