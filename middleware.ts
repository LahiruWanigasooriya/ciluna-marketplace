import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { clearAuthToken, verifyToken } from "./actions/utils/auth";


export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken")?.value;
  const isAuthPage = request.nextUrl.pathname === '/login';

  // If accessing login page while logged in, redirect to home
  if (isAuthPage && token) {
    const tokenVerification = await verifyToken(token);
    if (tokenVerification.status === 200) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Protected routes that require authentication
  const protectedRoutes = ["/profile", "/dashboard", "/settings", "/orders"];
  const isProtectedRoute = protectedRoutes.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute) {
    if (!token) {
      // No token, redirect to login
      const url = new URL('/login', request.url);
      url.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }

    // Verify token
    const tokenVerification = await verifyToken(token);
    if (tokenVerification.status !== 200) {
      // Invalid or expired token
      const url = new URL('/login', request.url);
      url.searchParams.set('from', request.nextUrl.pathname);
      await clearAuthToken(); // Clear invalid token
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/profile/:path*', 
    '/dashboard/:path*', 
    '/settings/:path*', 
    '/orders/:path*'
  ]
};