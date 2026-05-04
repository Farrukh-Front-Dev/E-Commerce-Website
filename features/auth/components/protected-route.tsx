'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/auth-store'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const user = useAuthStore((state) => state.user)
  const token = useAuthStore((state) => state.token)

  // Wait for client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Redirect if not authenticated (only on client)
  useEffect(() => {
    if (isClient && (!user || !token)) {
      router.push('/login')
    }
  }, [isClient, user, token, router])

  // Show loading during SSR and initial client render
  if (!isClient) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // Show loading while redirecting
  if (!user || !token) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // Render protected content
  return <>{children}</>
}
