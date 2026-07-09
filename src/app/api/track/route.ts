import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

const DATA_FILE = path.join(process.cwd(), "data", "visitors.json");

interface VisitorData {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  dailyStats: Record<string, number>;
  monthlyStats: Record<string, number>;
  topPages: Record<string, number>;
  lastUpdated: string;
}

function readData(): VisitorData {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return {
        totalVisits: 0, uniqueVisitors: 0, pageViews: 0,
        dailyStats: {}, monthlyStats: {}, topPages: {}, lastUpdated: new Date().toISOString(),
      };
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return {
      totalVisits: 0, uniqueVisitors: 0, pageViews: 0,
      dailyStats: {}, monthlyStats: {}, topPages: {}, lastUpdated: new Date().toISOString(),
    };
  }
}

function writeData(data: VisitorData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {}
}

// POST — record a visit
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const page = (body.page as string) || "/";

    const data = readData();
    const now = new Date();
    const today = now.toISOString().split("T")[0]; // YYYY-MM-DD
    const month = today.substring(0, 7); // YYYY-MM

    // Check visitor cookie (unique visitor tracking)
    const cookieStore = await cookies();
    const visitorId = cookieStore.get("visitor_id")?.value;
    const isNew = !visitorId;

    // Increment counters
    data.totalVisits += 1;
    data.pageViews += 1;
    if (isNew) data.uniqueVisitors += 1;

    // Daily stats
    data.dailyStats[today] = (data.dailyStats[today] || 0) + 1;

    // Monthly stats
    data.monthlyStats[month] = (data.monthlyStats[month] || 0) + 1;

    // Top pages
    const pageKey = page.length > 50 ? page.substring(0, 50) : page;
    data.topPages[pageKey] = (data.topPages[pageKey] || 0) + 1;

    // Keep only last 90 days of daily stats
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    Object.keys(data.dailyStats).forEach((d) => {
      if (new Date(d) < cutoff) delete data.dailyStats[d];
    });

    data.lastUpdated = now.toISOString();
    writeData(data);

    const response = NextResponse.json({
      success: true,
      totalVisits: data.totalVisits,
      uniqueVisitors: data.uniqueVisitors,
      pageViews: data.pageViews,
    });

    // Set visitor cookie if new (30 days)
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
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// GET — return current stats (public, for the counter widget)
export async function GET() {
  try {
    const data = readData();
    const today = new Date().toISOString().split("T")[0];
    const month = today.substring(0, 7);

    return NextResponse.json({
      totalVisits: data.totalVisits,
      uniqueVisitors: data.uniqueVisitors,
      pageViews: data.pageViews,
      todayVisits: data.dailyStats[today] || 0,
      monthVisits: data.monthlyStats[month] || 0,
    });
  } catch {
    return NextResponse.json({ totalVisits: 0, uniqueVisitors: 0, pageViews: 0, todayVisits: 0, monthVisits: 0 });
  }
}
