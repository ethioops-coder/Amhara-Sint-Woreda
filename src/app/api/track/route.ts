import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

const DATA_FILE = path.join(process.cwd(), "data", "visitors.json");
const LOGS_FILE = path.join(process.cwd(), "data", "visit-logs.json");
const MAX_LOGS = 1000; // Keep last 1000 visits

interface VisitorData {
  totalVisits: number;
  uniqueVisitors: number;
  pageViews: number;
  dailyStats: Record<string, number>;
  monthlyStats: Record<string, number>;
  topPages: Record<string, number>;
  lastUpdated: string;
}

interface VisitLog {
  id: string;
  timestamp: string;
  page: string;
  ip: string;
  country: string;
  city: string;
  browser: string;
  os: string;
  device: string;
  isNew: boolean;
  referrer: string;
}

function readData(): VisitorData {
  try {
    if (!fs.existsSync(DATA_FILE)) return defaultData();
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch { return defaultData(); }
}

function defaultData(): VisitorData {
  return { totalVisits: 0, uniqueVisitors: 0, pageViews: 0, dailyStats: {}, monthlyStats: {}, topPages: {}, lastUpdated: new Date().toISOString() };
}

function writeData(data: VisitorData) {
  try { fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8"); } catch {}
}

function readLogs(): VisitLog[] {
  try {
    if (!fs.existsSync(LOGS_FILE)) return [];
    return JSON.parse(fs.readFileSync(LOGS_FILE, "utf-8"));
  } catch { return []; }
}

function writeLogs(logs: VisitLog[]) {
  try { fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2), "utf-8"); } catch {}
}

function parseUserAgent(ua: string) {
  // Browser
  let browser = "Unknown";
  if (ua.includes("Chrome") && !ua.includes("Edg") && !ua.includes("OPR")) browser = "Chrome";
  else if (ua.includes("Firefox")) browser = "Firefox";
  else if (ua.includes("Safari") && !ua.includes("Chrome")) browser = "Safari";
  else if (ua.includes("Edg")) browser = "Edge";
  else if (ua.includes("OPR") || ua.includes("Opera")) browser = "Opera";
  else if (ua.includes("MSIE") || ua.includes("Trident")) browser = "IE";

  // OS
  let os = "Unknown";
  if (ua.includes("Windows NT")) os = "Windows";
  else if (ua.includes("Mac OS X")) os = "macOS";
  else if (ua.includes("Android")) os = "Android";
  else if (ua.includes("iPhone") || ua.includes("iPad")) os = "iOS";
  else if (ua.includes("Linux")) os = "Linux";

  // Device
  let device = "Desktop";
  if (ua.includes("Mobile") || ua.includes("Android") && ua.includes("Mobile")) device = "Mobile";
  else if (ua.includes("iPad") || ua.includes("Tablet")) device = "Tablet";

  return { browser, os, device };
}

async function getLocationFromIP(ip: string): Promise<{ country: string; city: string }> {
  // Skip private/local IPs
  if (!ip || ip === "::1" || ip.startsWith("127.") || ip.startsWith("192.168.") || ip.startsWith("10.") || ip === "unknown") {
    return { country: "Local", city: "Local" };
  }
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=country,city,status`, { signal: AbortSignal.timeout(2000) });
    const data = await res.json();
    if (data.status === "success") return { country: data.country || "Unknown", city: data.city || "Unknown" };
  } catch {}
  return { country: "Unknown", city: "Unknown" };
}

// POST — record a visit
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const page = (body.page as string) || "/";
    const referrer = (body.referrer as string) || "Direct";

    // Get IP
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "unknown";

    // Parse user agent
    const ua = request.headers.get("user-agent") || "";
    const { browser, os, device } = parseUserAgent(ua);

    // Check visitor cookie
    const cookieStore = await cookies();
    const visitorId = cookieStore.get("visitor_id")?.value;
    const isNew = !visitorId;

    // Get location (non-blocking)
    const location = await getLocationFromIP(ip);

    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const month = today.substring(0, 7);

    // Update aggregate stats
    const data = readData();
    data.totalVisits += 1;
    data.pageViews += 1;
    if (isNew) data.uniqueVisitors += 1;
    data.dailyStats[today] = (data.dailyStats[today] || 0) + 1;
    data.monthlyStats[month] = (data.monthlyStats[month] || 0) + 1;
    const pageKey = page.length > 50 ? page.substring(0, 50) : page;
    data.topPages[pageKey] = (data.topPages[pageKey] || 0) + 1;

    // Keep only last 90 days
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 90);
    Object.keys(data.dailyStats).forEach((d) => { if (new Date(d) < cutoff) delete data.dailyStats[d]; });
    data.lastUpdated = now.toISOString();
    writeData(data);

    // Append visit log
    const logs = readLogs();
    const newLog: VisitLog = {
      id: `v-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: now.toISOString(),
      page,
      ip: ip.replace(/\.\d+$/, ".***"), // Mask last octet for privacy
      country: location.country,
      city: location.city,
      browser,
      os,
      device,
      isNew,
      referrer: referrer.substring(0, 100),
    };
    logs.unshift(newLog); // newest first
    if (logs.length > MAX_LOGS) logs.splice(MAX_LOGS); // keep max
    writeLogs(logs);

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

// GET — return current stats
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
