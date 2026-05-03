'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container py-16">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-2xl font-bold">Failed to load product</h2>
        <p className="text-muted-foreground">
          Something went wrong while loading this product.
        </p>
        <div className="flex gap-4">
          <Button onClick={reset}>Try again</Button>
          <Link href="/products">
            <Button variant="outline">Back to Products</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
