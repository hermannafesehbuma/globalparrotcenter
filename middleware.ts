import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Only protect admin routes
  if (!request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow access to login page
  if (request.nextUrl.pathname === '/admin/login') {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If no user, redirect to login
  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    // If accessing /admin, redirect to /admin/dashboard after login, otherwise keep the original path
    const redirectPath = request.nextUrl.pathname === '/admin' ? '/admin/dashboard' : request.nextUrl.pathname
    url.searchParams.set('redirect', redirectPath)
    return NextResponse.redirect(url)
  }
  
  // Redirect /admin to /admin/dashboard if authenticated
  if (request.nextUrl.pathname === '/admin') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/dashboard'
    return NextResponse.redirect(url)
  }

  // Check if user has admin access (by email or UID)
  const adminEmail = (process.env.NEXT_PUBLIC_ADMIN_EMAIL || process.env.ADMIN_EMAIL || 'parrotlovers04@gmail.com').toLowerCase().trim()
  const adminUid = (process.env.NEXT_PUBLIC_ADMIN_UID || process.env.ADMIN_UID)?.trim()
  
  const userEmail = (user.email || '').toLowerCase().trim()
  const userUid = user.id?.trim()
  
  const isAdmin = userEmail === adminEmail || (adminUid && userUid === adminUid)
  
  if (!isAdmin) {
    // User is authenticated but not an admin
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('error', 'unauthorized')
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
}

