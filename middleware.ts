import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  // Handle admin routes that require authentication
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Skip login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for session in cookies
    const sbAccessToken = request.cookies.get('sb-access-token')?.value
    const sbRefreshToken = request.cookies.get('sb-refresh-token')?.value

    // If no tokens, redirect to login
    if (!sbAccessToken || !sbRefreshToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // For authenticated routes, allow through
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
