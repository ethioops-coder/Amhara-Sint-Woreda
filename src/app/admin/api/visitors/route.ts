import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "50");
    const filter = url.searchParams.get("filter") || "all";

    const where = filter === "new" ? { isNew: true } : filter === "returning" ? { isNew: false } : {};

    const [logs, total] = await Promise.all([
      prisma.visitLog.findMany({
        where,
        orderBy: { timestamp: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.visitLog.count({ where }),
    ]);

    return NextResponse.json({ logs, total, pages: Math.ceil(total / limit), page });
  } catch (e: any) {
    return NextResponse.json({ logs: [], total: 0, pages: 0 });
  }
}

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session")?.value;
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    await prisma.visitLog.deleteMany({});
    await prisma.visitorStat.updateMany({ data: { totalVisits: 0, uniqueVisitors: 0, pageViews: 0 } });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
