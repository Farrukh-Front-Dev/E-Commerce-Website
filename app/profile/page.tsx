'use client'

import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { ProfileInfo } from '@/features/auth/components/profile-info'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Package } from 'lucide-react'

function ProfileContent() {
  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Account</h1>
        <p className="text-muted-foreground">Manage your profile and view your activity</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
        <ProfileInfo />
        
        <div className="space-y-3">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <Link href="/orders">
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-accent hover:border-primary/50 transition-all">
              <Package className="h-5 w-5 mr-3 shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm">My Orders</p>
                <p className="text-xs text-muted-foreground">View order history</p>
              </div>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="outline" className="w-full justify-start h-auto p-4 hover:bg-accent hover:border-primary/50 transition-all">
              <ShoppingBag className="h-5 w-5 mr-3 shrink-0" />
              <div className="text-left">
                <p className="font-semibold text-sm">Shopping Cart</p>
                <p className="text-xs text-muted-foreground">View items in cart</p>
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
