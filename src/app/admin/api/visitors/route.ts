import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs";
import path from "path";

const LOGS_FILE = path.join(process.cwd(), "data", "visit-logs.json");

function isAuthenticated(request: Request): boolean {
  // Check session cookie via headers
  const cookieHeader = request.headers.get("cookie") || "";
  return cookieHeader.includes("admin_session=");
}

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const filter = url.searchParams.get("filter") || "all"; // all | new | returning

    if (!fs.existsSync(LOGS_FILE)) return NextResponse.json({ logs: [], total: 0, pages: 0 });

    let logs = JSON.parse(fs.readFileSync(LOGS_FILE, "utf-8"));

    // Filter
    if (filter === "new") logs = logs.filter((l: any) => l.isNew);
    if (filter === "returning") logs = logs.filter((l: any) => !l.isNew);

    const total = logs.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const paginated = logs.slice(start, start + limit);

    return NextResponse.json({ logs: paginated, total, pages, page });
  } catch {
    return NextResponse.json({ logs: [], total: 0, pages: 0 });
  }
}

// DELETE — clear all logs
export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    fs.writeFileSync(LOGS_FILE, "[]", "utf-8");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
