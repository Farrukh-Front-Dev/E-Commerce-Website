'use client'

import Link from 'next/link'
import { useCartStore } from '@/features/cart/store/cart-store'
import { CartItem } from '@/features/cart/components/cart-item'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ShoppingBag, Lock } from 'lucide-react'
import { ProtectedRoute } from '@/features/auth/components/protected-route'

function CartContent() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const totalPrice = getTotalPrice()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Add some products to get started
            </p>
          </div>
          <Link href="/products">
            <Button size="lg" className="mt-4">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      {/* Back Button */}
      <Link href="/products">
        <Button variant="ghost" className="mb-6 -ml-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>
      </Link>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Shopping Cart</h1>
        <p className="text-muted-foreground mt-2">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.product.id} item={item} />
          ))}
          
          {/* Clear Cart Button */}
          <div className="pt-4">
            <Button
              variant="outline"
              onClick={clearCart}
              className="w-full sm:w-auto"
            >
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary - Sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span className="font-medium">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="block">
                  <Button className="w-full h-12 text-base font-semibold" size="lg">
                    <Lock className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Trust Signals */}
                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    Free shipping on all orders
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    Secure checkout
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    30-day return policy
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  )
}
