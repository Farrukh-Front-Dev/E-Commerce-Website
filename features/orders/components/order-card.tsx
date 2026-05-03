import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Order } from '@/shared/types'
import Image from 'next/image'

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Order #{order.id}</CardTitle>
          <Badge variant="secondary">{order.totalProducts} items</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {order.products.slice(0, 3).map((product) => (
            <div key={product.id} className="flex items-center gap-3">
              <div className="relative h-12 w-12 rounded overflow-hidden bg-muted">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.title}</p>
                <p className="text-sm text-muted-foreground">
                  Qty: {product.quantity} × ${product.price.toFixed(2)}
                </p>
              </div>
              <p className="font-semibold">${product.total.toFixed(2)}</p>
            </div>
          ))}
          {order.products.length > 3 && (
            <p className="text-sm text-muted-foreground text-center">
              +{order.products.length - 3} more items
            </p>
          )}
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-lg">${order.discountedTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
