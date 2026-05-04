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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            E-Shop
          </span>
        </Link>
        
        <nav className="flex items-center gap-2 md:gap-4">
          <Link
            href="/products"
            className="text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-accent"
          >
            Products
          </Link>

          {mounted && (
            <>
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent"
                  >
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{user.firstName}</span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
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

          <div className="flex items-center gap-1 ml-2 pl-2 border-l">
            <ThemeToggle />
            <CartButton />
          </div>
        </nav>
      </div>
    </header>
  )
}
