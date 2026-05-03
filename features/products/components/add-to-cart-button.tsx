'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/features/cart/store/cart-store'
import type { Product } from '@/shared/types'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <Button
      size="lg"
      className="w-full"
      disabled={product.stock === 0}
      onClick={() => addItem(product)}
    >
      Add to Cart
    </Button>
  )
}
