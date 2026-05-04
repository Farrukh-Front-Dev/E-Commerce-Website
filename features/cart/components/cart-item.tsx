'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCartStore } from '../store/cart-store'
import type { CartItem as CartItemType } from '@/shared/types'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()
  const { product, quantity } = item

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)
  const totalPrice = discountedPrice * quantity

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="flex gap-4 sm:gap-6">
          {/* Product Image */}
          <Link href={`/products/${product.id}`} className="flex-shrink-0">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0 space-y-3">
            <div className="space-y-1">
              <Link href={`/products/${product.id}`}>
                <h3 className="font-semibold text-base sm:text-lg hover:text-primary transition-colors line-clamp-2">
                  {product.title}
                </h3>
              </Link>
              {product.brand && (
                <p className="text-sm text-muted-foreground">{product.brand}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Controls & Remove - Mobile/Desktop Layout */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-background"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-10 text-center font-semibold text-sm">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-background"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Item Total & Remove */}
              <div className="flex items-center gap-4">
                <span className="text-lg sm:text-xl font-bold text-primary">
                  ${totalPrice.toFixed(2)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => removeItem(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Stock Warning */}
            {quantity >= product.stock && (
              <p className="text-xs text-orange-600 dark:text-orange-400">
                Maximum available quantity reached
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
