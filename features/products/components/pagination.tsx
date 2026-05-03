'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface PaginationProps {
  currentSkip: number
  limit: number
  total: number
  hasMore: boolean
  hasPrevious: boolean
}

export function Pagination({
  currentSkip,
  limit,
  hasMore,
  hasPrevious,
}: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const navigate = (newSkip: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('skip', String(newSkip))
    router.push(`/products?${params.toString()}`)
  }

  if (!hasMore && !hasPrevious) {
    return null
  }

  return (
    <div className="flex justify-center gap-4 mt-8">
      {hasPrevious && (
        <Button
          variant="outline"
          onClick={() => navigate(Math.max(0, currentSkip - limit))}
        >
          Previous
        </Button>
      )}
      {hasMore && (
        <Button variant="outline" onClick={() => navigate(currentSkip + limit)}>
          Next
        </Button>
      )}
    </div>
  )
}
