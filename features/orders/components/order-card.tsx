import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { LocalOrder } from '@/features/orders/store/orders-store'
import Image from 'next/image'
import { Package, MapPin, Calendar } from 'lucide-react'

interface OrderCardProps {
  order: LocalOrder
}

export function OrderCard({ order }: OrderCardProps) {
  const statusColors = {
    pending: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800',
    processing: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    shipped: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    delivered: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800',
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span className="font-medium">Order #{order.id}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(order.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            {order.shippingAddress && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{order.shippingAddress.city}, {order.shippingAddress.country}</span>
              </div>
            )}
          </div>
          <Badge className={statusColors[order.status]} variant="outline">
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          {order.items.map((product) => (
            <div key={product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="relative h-14 w-14 rounded-md overflow-hidden bg-muted shrink-0">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm leading-tight">{product.title}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Qty: {product.quantity} × ${product.price.toFixed(2)}
                </p>
              </div>
              <p className="font-semibold text-sm shrink-0">${product.total.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Order Total</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {order.totalQuantity} {order.totalQuantity === 1 ? 'item' : 'items'}
            </p>
          </div>
          <span className="text-xl font-bold">${order.discountedTotal.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
