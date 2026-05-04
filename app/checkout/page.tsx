'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { useCartStore } from '@/features/cart/store/cart-store'
import { useOrdersStore } from '@/features/orders/store/orders-store'
import { useAuthStore } from '@/features/auth/store/auth-store'
import { CheckoutForm } from '@/features/checkout/components/checkout-form'
import { OrderSummary } from '@/features/checkout/components/order-summary'
import { useMounted } from '@/shared/hooks/use-mounted'
import type { CheckoutData } from '@/shared/types'
import { ShoppingBag, AlertCircle, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

function CheckoutContent() {
  const router = useRouter()
  const mounted = useMounted()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const addOrder = useOrdersStore((state) => state.addOrder)
  const user = useAuthStore((state) => state.user)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleCheckout = async (data: CheckoutData) => {
    setError(null)
    setIsSubmitting(true)

    try {
      // Validate cart items still have stock
      const stockIssues = items.filter(item => item.quantity > item.product.stock)
      if (stockIssues.length > 0) {
        throw new Error(`Some items are out of stock: ${stockIssues.map(i => i.product.title).join(', ')}`)
      }

      // Validate cart is not empty
      if (items.length === 0) {
        throw new Error('Cart is empty')
      }

      // Validate user
      if (!user) {
        throw new Error('User not authenticated')
      }

      // Simulate payment processing with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate occasional payment failures (10% chance for demo)
      if (Math.random() < 0.1) {
        throw new Error('Payment processing failed. Please try again.')
      }

      // Calculate totals
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const shipping = subtotal > 100 ? 0 : 10
      const tax = subtotal * 0.1
      const total = subtotal + shipping + tax

      // Create order in local storage
      const order = addOrder({
        userId: user.id,
        items: items.map(item => ({
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          total: item.product.price * item.quantity,
          thumbnail: item.product.thumbnail,
        })),
        total: subtotal,
        discountedTotal: total,
        totalProducts: items.length,
        totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
        shippingAddress: data,
        status: 'processing',
      })

      // Show success state
      setSuccess(true)

      // Wait a moment to show success message
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Clear cart and redirect
      clearCart()
      router.push(`/orders?new=${order.id}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Checkout failed. Please try again.'
      setError(message)
      console.error('Checkout error:', err)
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

  if (success) {
    return (
      <div className="container py-8 max-w-6xl">
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h2>
          <p className="text-muted-foreground mb-6">
            Your order has been confirmed and is being processed.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/orders">
              <Button>View Orders</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your order securely</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-destructive">Checkout Error</p>
            <p className="text-sm text-destructive/90">{error}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setError(null)}
            className="text-destructive hover:text-destructive"
          >
            Dismiss
          </Button>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr,400px]">
        <CheckoutForm onSubmit={handleCheckout} isSubmitting={isSubmitting} />
        <div className="lg:sticky lg:top-24 h-fit">
          <OrderSummary items={items} />
        </div>
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
