'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/features/cart/store/cart-store'
import type { Product } from '@/shared/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="relative aspect-square mb-4">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {product.discountPercentage > 0 && (
              <Badge className="absolute top-2 right-2" variant="destructive">
                -{product.discountPercentage}%
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>⭐ {product.rating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
