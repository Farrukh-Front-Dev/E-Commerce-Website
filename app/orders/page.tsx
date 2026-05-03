'use client'

import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { useAuthStore } from '@/features/auth/store/auth-store'
import { useUserOrders } from '@/features/orders/hooks/use-orders'
import { OrderCard } from '@/features/orders/components/order-card'
import { useMounted } from '@/shared/hooks/use-mounted'
import { Package } from 'lucide-react'

function OrdersContent() {
  const mounted = useMounted()
  const user = useAuthStore((state) => state.user)
  const { data, isLoading } = useUserOrders(user?.id || 0)

  if (!mounted || isLoading) {
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

  const orders = data?.carts || []

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground">
            Start shopping to see your orders here
          </p>
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
