import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AmharaSayint@2026";
const SESSION_MAX_AGE = 60 * 10; // 10 minutes

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username: rawUsername, password: rawPassword } = body;

    // ── DEBUG LOGGING (temporary — remove after diagnosing login issue) ──
    const username = typeof rawUsername === "string" ? rawUsername.trim() : rawUsername;
    const password = typeof rawPassword === "string" ? rawPassword.trim() : rawPassword;

    console.log("[AUTH DEBUG] incoming username:", username);
    console.log("[AUTH DEBUG] incoming password length:", typeof password === "string" ? password.length : "N/A",
      "| first 2 chars:", typeof password === "string" ? JSON.stringify(password.slice(0, 2)) : "N/A");

    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;
    console.log("[AUTH DEBUG] process.env.ADMIN_USERNAME:", envUser !== undefined ? envUser : "(not set — using fallback: admin)");
    console.log("[AUTH DEBUG] process.env.ADMIN_PASSWORD set:", envPass !== undefined,
      "| length:", envPass !== undefined ? envPass.length : "(not set — fallback length: " + "AmharaSayint@2026".length + ")");

    const usernameMatch = username === ADMIN_USERNAME;
    const passwordMatch = password === ADMIN_PASSWORD;
    console.log("[AUTH DEBUG] username match:", usernameMatch);
    console.log("[AUTH DEBUG] password match:", passwordMatch);
    // ── END DEBUG LOGGING ──

    if (usernameMatch && passwordMatch) {
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
