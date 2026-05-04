import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { CartItem } from '@/shared/types'
import Image from 'next/image'

interface OrderSummaryProps {
  items: CartItem[]
}

export function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {items.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="relative h-14 w-14 rounded-md overflow-hidden bg-muted shrink-0">
                <Image
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate text-sm leading-tight">{item.product.title}</p>
                <p className="text-sm text-muted-foreground mt-1">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-sm shrink-0">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping === 0 && (
            <p className="text-xs text-green-600 dark:text-green-400">
              Free shipping on orders over $100
            </p>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (10%)</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-3 border-t">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
