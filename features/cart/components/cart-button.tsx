'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCartStore } from '../store/cart-store'
import { useMounted } from '@/shared/hooks/use-mounted'

export function CartButton() {
  const mounted = useMounted()
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <Link href="/cart">
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {mounted && totalItems > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  )
}
