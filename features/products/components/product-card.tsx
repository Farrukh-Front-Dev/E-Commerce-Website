'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/features/cart/store/cart-store'
import { Star } from 'lucide-react'
import type { Product } from '@/shared/types'

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
            />
            {product.discountPercentage > 0 && (
              <Badge className="absolute top-3 right-3 shadow-lg" variant="destructive">
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">
                Only {product.stock} left
              </Badge>
            )}
          </div>

          {/* Content Container */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-base leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.title}
            </h3>

            {/* Rating & Stock */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
              </div>
              <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ${discountedPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full h-11 font-semibold"
            size="lg"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
