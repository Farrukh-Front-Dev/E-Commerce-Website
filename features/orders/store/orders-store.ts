import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/shared/types'

export interface LocalOrder {
  id: string
  userId: number
  items: {
    id: number
    title: string
    price: number
    quantity: number
    total: number
    thumbnail: string
  }[]
  total: number
  discountedTotal: number
  totalProducts: number
  totalQuantity: number
  shippingAddress: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zipCode: string
    country: string
  }
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  createdAt: string
}

interface OrdersState {
  orders: LocalOrder[]
  addOrder: (order: Omit<LocalOrder, 'id' | 'createdAt'>) => LocalOrder
  getOrdersByUserId: (userId: number) => LocalOrder[]
  getOrderById: (orderId: string) => LocalOrder | undefined
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (orderData) => {
        const newOrder: LocalOrder = {
          ...orderData,
          id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          orders: [newOrder, ...state.orders],
        }))

        return newOrder
      },

      getOrdersByUserId: (userId) => {
        return get().orders.filter((order) => order.userId === userId)
      },

      getOrderById: (orderId) => {
        return get().orders.find((order) => order.id === orderId)
      },
    }),
    {
      name: 'orders-storage',
      version: 1,
    }
  )
)
