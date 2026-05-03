import { ProductSkeleton } from '@/features/products/components/product-skeleton'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Skeleton className="h-10 w-full sm:w-64" />
            <Skeleton className="h-10 w-full sm:w-48" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
