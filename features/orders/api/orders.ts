import { apiClient } from '@/shared/lib/api-client'
import type { Order } from '@/shared/types'

export const ordersApi = {
  getUserOrders: async (userId: number): Promise<{ carts: Order[] }> => {
    return apiClient.get<{ carts: Order[] }>(`/carts/user/${userId}`)
  },

  getOrder: async (orderId: number): Promise<Order> => {
    return apiClient.get<Order>(`/carts/${orderId}`)
  },
}
