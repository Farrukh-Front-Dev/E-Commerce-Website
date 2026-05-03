// Shared types across the application

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
  refreshToken: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface SearchParams {
  q?: string
  category?: string
  limit?: number
  skip?: number
}

export interface Order {
  id: number
  products: {
    id: number
    title: string
    price: number
    quantity: number
    total: number
    thumbnail: string
  }[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

export interface Category {
  slug: string
  name: string
  url: string
}

export interface CheckoutData {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  zipCode: string
  country: string
}
