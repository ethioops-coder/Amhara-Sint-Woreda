import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (but not the login page or auth API)
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login" || pathname.startsWith("/admin/login");
  const isAuthApi = pathname.startsWith("/admin/api/auth") || pathname.startsWith("/admin/api/logout");

  if (isAdminRoute && !isLoginPage && !isAuthApi) {
    const session = request.cookies.get("admin_session")?.value;

    // No session cookie → redirect to login
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect /admin/login to /admin if already logged in
  if (isLoginPage) {
    const session = request.cookies.get("admin_session")?.value;
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
