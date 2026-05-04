import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected routes that require authentication
const protectedRoutes = ['/cart', '/checkout', '/orders', '/profile']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute) {
    // Check for auth token in cookies or headers
    const authCookie = request.cookies.get('auth-token')
    
    // For client-side auth (localStorage), we can't check here
    // So we'll let the ProtectedRoute component handle it
    // This middleware is just for additional server-side protection
    
    // You can add server-side token validation here if needed
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/cart/:path*', '/checkout/:path*', '/orders/:path*', '/profile/:path*'],
}
