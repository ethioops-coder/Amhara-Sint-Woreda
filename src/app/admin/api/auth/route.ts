import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AmharaSint@2026";
const SESSION_MAX_AGE = 60 * 10; // 10 minutes

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      const token = Buffer.from(`admin:${Date.now()}`).toString("base64");
      cookieStore.set("admin_session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/",
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// Called by the client heartbeat to refresh the session on activity
export async function PUT() {
  try {
    const cookieStore = await cookies();
    const existing = cookieStore.get("admin_session")?.value;
    if (!existing) {
      return NextResponse.json({ valid: false }, { status: 401 });
    }
    // Refresh the cookie — reset the 10-min TTL on every activity ping
    cookieStore.set("admin_session", existing, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 10,
      path: "/",
    });
    return NextResponse.json({ valid: true });
  } catch {
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
