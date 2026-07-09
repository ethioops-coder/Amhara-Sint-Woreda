import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";

function parseUserAgent(ua: string) {
  let browser = "Unknown";
  if (ua.includes("Chrome") && !ua.includes("Edg") && !ua.includes("OPR")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";

  let os = "Unknown";
  if (ua.includes("Windows NT")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  let device = "Desktop";
  if (ua.includes("Mobile")) device = "Mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device = "Tablet";

  return { browser, os, device };
}

async function getLocation(ip: string): Promise<{ country: string; city: string }> {
  if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.")) {
    return { country: "Local", city: "Local" };
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,status`, {
      signal: AbortSignal.timeout(2000),
    });
    const data = await res.json();
    if (data.status === "success") return { country: data.country || "Unknown", city: data.city || "Unknown" };
  } catch {}
  return { country: "Unknown", city: "Unknown" };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const page = (body.page as string) || "/";
    const referrer = (body.referrer as string) || "Direct";

    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    const ua = request.headers.get("user-agent") || "";
    const { browser, os, device } = parseUserAgent(ua);

    const cookieStore = await cookies();
    const visitorId = cookieStore.get("visitor_id")?.value;
    const isNew = !visitorId;

    const location = await getLocation(ip);

    const now = new Date();
    const daily = now.toISOString().split("T")[0];
    const monthly = daily.substring(0, 7);

    // Upsert the aggregate stats row (always id = "main")
    const stat = await prisma.visitorStat.upsert({
      where: { id: "main" },
      create: {
        id: "main",
        totalVisits: 1,
        uniqueVisitors: isNew ? 1 : 0,
        pageViews: 1,
      },
      update: {
        totalVisits: { increment: 1 },
        uniqueVisitors: { increment: isNew ? 1 : 0 },
        pageViews: { increment: 1 },
      },
    });

    // Log the visit
    await prisma.visitLog.create({
      data: {
        page: page.substring(0, 100),
        ip: ip.replace(/\.\d+$/, ".***"),
        country: location.country,
        city: location.city,
        browser,
        os,
        device,
        isNew,
        referrer: referrer.substring(0, 100),
        daily,
        monthly,
      },
    });

    // Delete old logs (keep last 1000)
    const count = await prisma.visitLog.count();
    if (count > 1000) {
      const oldest = await prisma.visitLog.findMany({
        orderBy: { timestamp: "asc" },
        take: count - 1000,
        select: { id: true },
      });
      await prisma.visitLog.deleteMany({ where: { id: { in: oldest.map((l) => l.id) } } });
    }

    const response = NextResponse.json({
      success: true,
      totalVisits: stat.totalVisits,
      uniqueVisitors: stat.uniqueVisitors,
      pageViews: stat.pageViews,
    });

    if (isNew) {
      const newId = `v-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      response.cookies.set("visitor_id", newId, {
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      });
    }

    return response;
  } catch (e: any) {
    console.error("Track error:", e);
    return NextResponse.json({ success: false, totalVisits: 0 }, { status: 500 });
  }
}

export async function GET() {
  try {
    const stat = await prisma.visitorStat.findUnique({ where: { id: "main" } });
    const today = new Date().toISOString().split("T")[0];
    const month = today.substring(0, 7);

    const todayVisits = await prisma.visitLog.count({ where: { daily: today } });
    const monthVisits = await prisma.visitLog.count({ where: { monthly: month } });

    return NextResponse.json({
      totalVisits: stat?.totalVisits || 0,
      uniqueVisitors: stat?.uniqueVisitors || 0,
      pageViews: stat?.pageViews || 0,
      todayVisits,
      monthVisits,
    });
  } catch {
    return NextResponse.json({ totalVisits: 0, uniqueVisitors: 0, pageViews: 0, todayVisits: 0, monthVisits: 0 });
  }
}
