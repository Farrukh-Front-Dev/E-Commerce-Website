'use client'

import Link from 'next/link'
import { CartButton } from '@/features/cart/components/cart-button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">E-Shop</span>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Products
          </Link>
          <CartButton />
        </nav>
      </div>
    </header>
  )
}
