import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductSkeleton() {
  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <Skeleton className="aspect-square mb-4 rounded-md" />
        <Skeleton className="h-6 mb-2" />
        <Skeleton className="h-4 mb-2" />
        <Skeleton className="h-6 w-24 mb-2" />
        <Skeleton className="h-4 w-32" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
