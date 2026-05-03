import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="container py-8">
      <Skeleton className="h-10 w-40 mb-8" />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="aspect-square rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-md" />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <div className="flex items-center gap-2 mb-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>

          <div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
