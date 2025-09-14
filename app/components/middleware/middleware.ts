// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define route groups
  const protectedRoutes = ['/dashboard'];
  const authRoutes = ['/log-in', '/register/admin'];

  // 2. The check for initial setup (staffCount === 0) has been removed from here.
  //    This logic is now handled on the client-side by the AuthProvider.

  // 3. Handle normal operation routing based on the presence of the auth token
  const authToken = request.cookies.get('access_token')?.value;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  // If trying to access a protected route without a token, redirect to login
  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  // If trying to access an auth page (like login) with a token, redirect to dashboard
  if (isAuthRoute && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. Allow all other requests to pass
  return NextResponse.next();
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
};