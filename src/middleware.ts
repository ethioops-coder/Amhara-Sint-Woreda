import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip all API routes — they handle their own auth
  if (pathname.startsWith("/admin/api/")) {
    return NextResponse.next();
  }

  // Skip login page
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    const session = request.cookies.get("admin_session")?.value;
    // Already logged in → go to admin
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // Protect all other /admin/* pages
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session")?.value;
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
