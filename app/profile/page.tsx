'use client'

import { ProtectedRoute } from '@/features/auth/components/protected-route'
import { ProfileInfo } from '@/features/auth/components/profile-info'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Package } from 'lucide-react'

function ProfileContent() {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <ProfileInfo />
        
        <div className="space-y-4">
          <Link href="/orders">
            <Button variant="outline" className="w-full justify-start h-auto p-6">
              <Package className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-semibold">My Orders</p>
                <p className="text-sm text-muted-foreground">View order history</p>
              </div>
            </Button>
          </Link>

          <Link href="/cart">
            <Button variant="outline" className="w-full justify-start h-auto p-6">
              <ShoppingBag className="h-5 w-5 mr-3" />
              <div className="text-left">
                <p className="font-semibold">Shopping Cart</p>
                <p className="text-sm text-muted-foreground">View items in cart</p>
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
