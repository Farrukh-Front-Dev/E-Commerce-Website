'use client'

import { useQuery } from '@tanstack/react-query'
import { ordersApi } from '../api/orders'

export function useUserOrders(userId: number) {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () => ordersApi.getUserOrders(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  })
}
