// src/middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- THIS IS THE FIX ---
  // Add the new registration page to the list of protected routes.
  const protectedRoutes = ['/dashboard', '/register/new'];
  const authRoutes = ['/log-in', '/register/admin'];

  const authToken = request.cookies.get('access_token')?.value;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(pathname);

  if (isProtectedRoute && !authToken) {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }

  if (isAuthRoute && authToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};