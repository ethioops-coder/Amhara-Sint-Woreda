import { NextResponse } from "next/server";
import { getNews, getBids, getVacancies } from "@/lib/storage";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Content from JSON files (news, bids, vacancies)
    const news = getNews();
    const bids = getBids();
    const vacancies = getVacancies();

    // Dynamic data from PostgreSQL
    const [
      appCount,
      msgCount,
      subscriberCount,
      visitorStat,
    ] = await Promise.all([
      prisma.application.count().catch(() => 0),
      prisma.contactMessage.count().catch(() => 0),
      prisma.subscriber.count().catch(() => 0),
      prisma.visitorStat.findUnique({ where: { id: "main" } }).catch(() => null),
    ]);

    const today = new Date().toISOString().split("T")[0];
    const month = today.substring(0, 7);

    const [todayVisits, monthVisits] = await Promise.all([
      prisma.visitLog.count({ where: { daily: today } }).catch(() => 0),
      prisma.visitLog.count({ where: { monthly: month } }).catch(() => 0),
    ]);

    const newsByMonth: Record<string, number> = {};
    news.forEach((n) => {
      const m = n.date?.substring(0, 7) || n.createdAt?.substring(0, 7) || "2026-06";
      newsByMonth[m] = (newsByMonth[m] || 0) + 1;
    });

    const recentActivity = [
      ...news.slice(0, 3).map((n) => ({ type: "news" as const, message: `News: ${n.title.substring(0, 50)}`, date: n.createdAt })),
      ...bids.slice(0, 2).map((b) => ({ type: "bid" as const, message: `Bid ${b.status}: ${b.title.substring(0, 50)}`, date: b.createdAt })),
      ...vacancies.slice(0, 2).map((v) => ({ type: "vacancy" as const, message: `Vacancy: ${v.title.substring(0, 50)}`, date: v.createdAt })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

    return NextResponse.json({
      totalNews: news.length,
      totalBids: bids.length,
      totalVacancies: vacancies.length,
      totalSubscribers: subscriberCount,
      totalApplications: appCount,
      totalMessages: msgCount,
      openBids: bids.filter((b) => b.status === "Open").length,
      publishedNews: news.filter((n) => n.status === "published").length,
      newsByMonth,
      recentActivity,
      totalVisits: visitorStat?.totalVisits || 0,
      uniqueVisitors: visitorStat?.uniqueVisitors || 0,
      pageViews: visitorStat?.pageViews || 0,
      todayVisits,
      monthVisits,
      dailyVisitorStats: {},
    });
  } catch (e: any) {
    console.error("Stats error:", e);
    return NextResponse.json({
      totalNews: 0, totalBids: 0, totalVacancies: 0, totalSubscribers: 0,
      totalApplications: 0, totalMessages: 0, openBids: 0, publishedNews: 0,
      newsByMonth: {}, recentActivity: [],
      totalVisits: 0, uniqueVisitors: 0, pageViews: 0, todayVisits: 0, monthVisits: 0, dailyVisitorStats: {},
    });
  }
}
