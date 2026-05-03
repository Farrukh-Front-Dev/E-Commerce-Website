import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-16">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    </div>
  )
}
