import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Check for the access token cookie we set in the action
  const token = request.cookies.get('sb-access-token')?.value

  const { pathname } = request.nextUrl

  // 2. Define protected paths
  const isAuthPage = pathname.startsWith('/login')
  const isAdminPage = pathname.startsWith('/admin')
  const isUserPage = pathname === '/' || pathname.startsWith('/library')

  // 3. Logic: If NO token and trying to access protected pages -> Redirect to Login
  if (!token && (isAdminPage || isUserPage)) {
    const loginUrl = new URL('/login', request.url)
    // Optional: Add ?next= param to redirect back after login
    return NextResponse.redirect(loginUrl)
  }

  // 4. Logic: If HAS token and trying to access Login -> Redirect to Dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // 5. (Optional) Admin Protection
  // Note: Middleware can't easily decode JWTs to check roles without external libs.
  // It is better to do Role checks in the Layout or Page Server Component.
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}