import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from '@/shared/types'

interface CartState {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  validateStock: (productId: number, quantity: number) => boolean
  getItemQuantity: (productId: number) => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          )

          if (existingItem) {
            // Check stock before adding
            const newQuantity = existingItem.quantity + 1
            if (newQuantity > product.stock) {
              console.warn(`Cannot add more. Only ${product.stock} in stock.`)
              return state // Don't modify state
            }

            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: newQuantity }
                  : item
              ),
            }
          }

          // Check stock for new item
          if (product.stock < 1) {
            console.warn('Product out of stock')
            return state
          }

          return {
            items: [...state.items, { product, quantity: 1 }],
          }
        })
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }))
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set((state) => {
          const item = state.items.find((i) => i.product.id === productId)
          
          // Validate stock
          if (item && quantity > item.product.stock) {
            console.warn(`Cannot set quantity to ${quantity}. Only ${item.product.stock} in stock.`)
            return state
          }

          return {
            items: state.items.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            ),
          }
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        )
      },

      validateStock: (productId, quantity) => {
        const item = get().items.find((i) => i.product.id === productId)
        if (!item) return false
        return quantity <= item.product.stock
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((i) => i.product.id === productId)
        return item?.quantity || 0
      },
    }),
    {
      name: 'cart-storage',
      version: 1, // Add versioning for future migrations
    }
  )
)
