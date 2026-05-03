'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { CartButton } from '@/features/cart/components/cart-button'
import { useAuthStore } from '@/features/auth/store/auth-store'
import { useMounted } from '@/shared/hooks/use-mounted'
import { ThemeToggle } from '@/shared/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { User, LogOut } from 'lucide-react'

export function Header() {
  const mounted = useMounted()
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

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

          {mounted && (
            <>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    {user.firstName}
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </>
          )}

          <ThemeToggle />
          <CartButton />
        </nav>
      </div>
    </header>
  )
}
