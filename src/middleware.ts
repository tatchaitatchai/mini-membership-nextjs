import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === '/login'
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')
  const isPublicPath = request.nextUrl.pathname === '/'

  if (isDashboard && isLoginPage) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
