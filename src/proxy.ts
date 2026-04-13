import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
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
        set(name: string, value: string, options: CookieOptions) {
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
        remove(name: string, options: CookieOptions) {
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

  const { data: { user } } = await supabase.auth.getUser()

  const isAuthPage = request.nextUrl.pathname.startsWith('/(auth)') || request.nextUrl.pathname === '/login'
  const isProtectedPage = request.nextUrl.pathname.includes('/(dashboard)') || 
                          request.nextUrl.pathname.startsWith('/admin') ||
                          request.nextUrl.pathname.startsWith('/doctor') ||
                          request.nextUrl.pathname.startsWith('/patient') ||
                          request.nextUrl.pathname.startsWith('/pharmacy')

  // 1. If no user and trying to access protected content -> redirect to login (or portal)
  if (!user && (isProtectedPage)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 2. If user exists, fetch their role and redirect to their specific dashboard if they are on an generic path
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role || 'patient'
    
    // Redirect logic: If logged in, send to their specific dashboard if they visit home or login
    if (request.nextUrl.pathname === '/' || isAuthPage) {
      return NextResponse.redirect(new URL(`/${role}`, request.url))
    }

    // Role protection: Prevent user from accessing other dashboards
    const paths = ['admin', 'doctor', 'patient', 'pharmacy', 'clinic']
    for (const p of paths) {
      if (request.nextUrl.pathname.startsWith(`/${p}`) && role !== p) {
        return NextResponse.redirect(new URL(`/${role}`, request.url))
      }
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
