'use client'

import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products'
import type { SearchParams } from '@/shared/types'

export function useProducts(params: SearchParams = {}) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.getProduct(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => productsApi.getCategories(),
    staleTime: 1000 * 60 * 30, // 30 minutes - categories rarely change
  })
}
