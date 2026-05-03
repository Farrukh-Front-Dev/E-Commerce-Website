'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCategories } from '../hooks/use-products'

export function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: categories, isLoading } = useCategories()
  const currentCategory = searchParams.get('category') || 'all'

  const handleCategoryChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (!value || value === 'all') {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    params.delete('skip') // Reset pagination
    
    router.push(`/products?${params.toString()}`)
  }

  if (isLoading) {
    return <div className="w-48 h-10 bg-muted animate-pulse rounded-md" />
  }

  return (
    <Select value={currentCategory} onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="All Categories" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Categories</SelectItem>
        {categories?.map((category) => (
          <SelectItem key={category.slug} value={category.slug}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
