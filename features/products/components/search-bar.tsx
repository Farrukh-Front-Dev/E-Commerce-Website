'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/shared/hooks/use-debounce'

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('q') || '')
  const debouncedSearch = useDebounce(search, 500)

  const handleSearch = (value: string) => {
    setSearch(value)
    
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    params.delete('skip') // Reset pagination
    
    router.push(`/products?${params.toString()}`)
  }

  return (
    <Input
      type="search"
      placeholder="Search products..."
      value={search}
      onChange={(e) => handleSearch(e.target.value)}
      className="max-w-md"
    />
  )
}
