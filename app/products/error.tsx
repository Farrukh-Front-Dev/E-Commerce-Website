'use client'

import { useEffect } from 'react'
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
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-muted-foreground">
          Failed to load products. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
}
