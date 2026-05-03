import { apiClient } from '@/shared/lib/api-client'
import type { Product, ProductsResponse, SearchParams, Category } from '@/shared/types'

export const productsApi = {
  getProducts: async (params: SearchParams = {}): Promise<ProductsResponse> => {
    const { limit = 20, skip = 0, q, category } = params
    
    let endpoint = '/products'
    
    if (q) {
      endpoint = `/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`
    } else if (category) {
      endpoint = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    } else {
      endpoint = `/products?limit=${limit}&skip=${skip}`
    }
    
    return apiClient.get<ProductsResponse>(endpoint)
  },

  getProduct: async (id: string): Promise<Product> => {
    return apiClient.get<Product>(`/products/${id}`)
  },

  getCategories: async (): Promise<Category[]> => {
    return apiClient.get<Category[]>('/products/categories')
  },
}
