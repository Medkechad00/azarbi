import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  productId: string
  slug: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  hasItem: (productId: string) => boolean
  clearWishlist: () => void
  count: () => number
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        if (state.items.find(i => i.productId === item.productId)) return state
        return { items: [...state.items, item] }
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter(i => i.productId !== productId)
      })),
      hasItem: (productId) => {
        return get().items.some(i => i.productId === productId)
      },
      clearWishlist: () => set({ items: [] }),
      count: () => get().items.length,
    }),
    { name: 'azarbi-wishlist' }
  )
)
