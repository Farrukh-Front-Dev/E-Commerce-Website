'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/features/cart/store/cart-store'
import { showToast } from '@/shared/components/toast'
import type { Product } from '@/shared/types'
import { Check, ShoppingCart } from 'lucide-react'

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)
  const getItemQuantity = useCartStore((state) => state.getItemQuantity)
  const [justAdded, setJustAdded] = useState(false)

  const currentQuantity = getItemQuantity(product.id)
  const canAddMore = currentQuantity < product.stock
  const isOutOfStock = product.stock === 0

  const handleAddToCart = () => {
    if (!canAddMore) {
      showToast(`Maximum quantity (${product.stock}) already in cart`, 'info')
      return
    }
    
    addItem(product)
    showToast(`${product.title} added to cart`, 'success')
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 2000)
  }

  if (isOutOfStock) {
    return (
      <Button size="lg" className="w-full" disabled>
        Out of Stock
      </Button>
    )
  }

  if (!canAddMore) {
    return (
      <Button size="lg" className="w-full" disabled variant="secondary">
        Max Quantity in Cart ({product.stock})
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleAddToCart}
      variant={justAdded ? 'secondary' : 'default'}
    >
      {justAdded ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
