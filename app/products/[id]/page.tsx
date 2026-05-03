import Image from 'next/image'
import Link from 'next/link'
import { productsApi } from '@/features/products/api/products'
import { AddToCartButton } from '@/features/products/components/add-to-cart-button'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params

  let product
  try {
    product = await productsApi.getProduct(id)
  } catch (error) {
    notFound()
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <div className="container py-8">
      <Link href="/products">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-md overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
            </div>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive">
                      -{product.discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span className="font-medium">{product.rating.toFixed(1)}</span>
                </div>
                <div className="text-muted-foreground">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : 'Out of stock'}
                </div>
              </div>

              <AddToCartButton product={product} />
            </CardContent>
          </Card>

          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
