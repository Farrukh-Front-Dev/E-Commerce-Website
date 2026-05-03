'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { useCartStore } from '@/features/cart/store/cart-store'
import { CheckoutForm } from '@/features/checkout/components/checkout-form'
import { OrderSummary } from '@/features/checkout/components/order-summary'
import { useMounted } from '@/shared/hooks/use-mounted'
import type { CheckoutData } from '@/shared/types'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function CheckoutContent() {
  const router = useRouter()
  const mounted = useMounted()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCheckout = async (data: CheckoutData) => {
    try {
      setIsSubmitting(true)
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      
      // Clear cart and redirect to orders
      clearCart()
      router.push('/orders')
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!mounted) {
    return (
      <div className="container py-8 max-w-6xl">
        <div className="h-8 bg-muted animate-pulse rounded mb-8 w-48" />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="h-96 bg-muted animate-pulse rounded" />
          <div className="h-96 bg-muted animate-pulse rounded" />
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container py-8 max-w-6xl">
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some products to your cart before checking out
          </p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <CheckoutForm onSubmit={handleCheckout} isSubmitting={isSubmitting} />
        <OrderSummary items={items} />
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  )
}
