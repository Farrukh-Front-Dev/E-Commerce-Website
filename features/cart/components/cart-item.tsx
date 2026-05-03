'use client'

import Image from 'next/image'
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
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{product.title}</h3>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-bold">${discountedPrice.toFixed(2)}</span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeItem(product.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(product.id, quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(product.id, quantity + 1)}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
