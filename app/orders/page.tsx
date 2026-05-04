'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { useAuthStore } from '@/features/auth/store/auth-store'
import { useOrdersStore } from '@/features/orders/store/orders-store'
import { OrderCard } from '@/features/orders/components/order-card'
import { useMounted } from '@/shared/hooks/use-mounted'
import { Package, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function OrdersContent() {
  const mounted = useMounted()
  const searchParams = useSearchParams()
  const user = useAuthStore((state) => state.user)
  const getOrdersByUserId = useOrdersStore((state) => state.getOrdersByUserId)
  const newOrderId = searchParams.get('new')
  const showSuccess = useMemo(() => !!newOrderId, [newOrderId])

  if (!mounted || !user) {
    return (
      <div className="container py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  const orders = getOrdersByUserId(user.id)

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">
          {orders.length === 0 ? 'No orders yet' : `${orders.length} ${orders.length === 1 ? 'order' : 'orders'}`}
        </p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-green-900 dark:text-green-100">Order Placed Successfully!</p>
            <p className="text-sm text-green-700 dark:text-green-300">
              Your order has been confirmed and will be processed shortly.
            </p>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            Start shopping to see your orders here
          </p>
          <Link href="/products">
            <Button size="lg">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  )
}
