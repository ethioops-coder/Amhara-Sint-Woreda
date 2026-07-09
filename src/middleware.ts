import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Public API routes — never block these ──────────────────
  // Allow file uploads from public (vacancy applications)
  if (pathname === "/admin/api/upload") return NextResponse.next();
  // Allow auth and logout
  if (pathname.startsWith("/admin/api/auth")) return NextResponse.next();
  if (pathname.startsWith("/admin/api/logout")) return NextResponse.next();
  // Allow all other admin APIs (they handle their own auth)
  if (pathname.startsWith("/admin/api/")) return NextResponse.next();

  // ── Login page ─────────────────────────────────────────────
  if (pathname === "/admin/login" || pathname.startsWith("/admin/login/")) {
    const session = request.cookies.get("admin_session")?.value;
    if (session) return NextResponse.redirect(new URL("/admin", request.url));
    return NextResponse.next();
  }

  // ── Protect admin UI pages ─────────────────────────────────
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("admin_session")?.value;
    if (!session) return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
