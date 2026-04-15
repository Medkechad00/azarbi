import { create } from 'zustand'

interface UIStore {
  isCartOpen: boolean
  isNavOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  openNav: () => void
  closeNav: () => void
  toggleNav: () => void
}

export const useUI = create<UIStore>((set) => ({
  isCartOpen: false,
  isNavOpen: false,
  openCart: () => set({ isCartOpen: true, isNavOpen: false }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen, isNavOpen: false })),
  openNav: () => set({ isNavOpen: true, isCartOpen: false }),
  closeNav: () => set({ isNavOpen: false }),
  toggleNav: () => set((state) => ({ isNavOpen: !state.isNavOpen, isCartOpen: false })),
}))
