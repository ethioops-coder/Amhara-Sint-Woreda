import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const checks: Record<string, any> = {};

  // 1. Check DATABASE_URL is set
  checks.database_url_set = !!process.env.DATABASE_URL;

  // 2. Try to connect to database
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database_connected = true;
  } catch (e: any) {
    checks.database_connected = false;
    checks.database_error = e.message;
  }

  // 3. Check tables exist
  try {
    const appCount = await prisma.application.count();
    const visitorCount = await prisma.visitLog.count();
    const subCount = await prisma.subscriber.count();
    const newsCount = await prisma.news.count();
    checks.tables_ok = true;
    checks.counts = { applications: appCount, visitors: visitorCount, subscribers: subCount, news: newsCount };
  } catch (e: any) {
    checks.tables_ok = false;
    checks.tables_error = e.message;
  }

  const allOk = checks.database_connected && checks.tables_ok;

  return NextResponse.json({
    status: allOk ? "✅ Database is working perfectly" : "❌ Database has issues",
    ok: allOk,
    checks,
    timestamp: new Date().toISOString(),
  }, { status: allOk ? 200 : 500 });
}
