"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  getNews,
  getBids,
  getVacancies,
  getSubscribers,
  createNews,
  updateNews,
  deleteNews,
  createBid,
  updateBid,
  deleteBid,
  createVacancy,
  updateVacancy,
  deleteVacancy,
  addSubscriber,
  deleteSubscriber,
  type NewsItem,
  type BidItem,
  type VacancyItem,
} from "@/lib/storage";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "AmharaSayint@2026";
const SESSION_COOKIE = "admin_session";
const SESSION_MAX_AGE = 60 * 10; // 10 minutes

// ── Auth Actions ──────────────────────────────────────────────
export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    const token = Buffer.from(`admin:${Date.now()}`).toString("base64");
    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    return { success: true };
  }
  return { success: false, error: "Invalid username or password" };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function getSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.has(SESSION_COOKIE);
}

// ── News Actions ──────────────────────────────────────────────
export async function fetchNews(): Promise<NewsItem[]> {
  return getNews();
}

export async function fetchNewsById(id: string): Promise<NewsItem | null> {
  const item = getNewsById(id);
  return item || null;
}

export async function addNews(data: Omit<NewsItem, "id" | "createdAt">): Promise<NewsItem> {
  return createNews(data);
}

export async function editNews(id: string, data: Partial<NewsItem>): Promise<NewsItem | null> {
  return updateNews(id, data);
}

export async function removeNews(id: string): Promise<boolean> {
  return deleteNews(id);
}

// ── Bid Actions ───────────────────────────────────────────────
export async function fetchBids(): Promise<BidItem[]> {
  return getBids();
}

export async function fetchBidById(id: string): Promise<BidItem | null> {
  const item = getBidById(id);
  return item || null;
}

export async function addBid(data: Omit<BidItem, "id" | "createdAt">): Promise<BidItem> {
  return createBid(data);
}

export async function editBid(id: string, data: Partial<BidItem>): Promise<BidItem | null> {
  return updateBid(id, data);
}

export async function removeBid(id: string): Promise<boolean> {
  return deleteBid(id);
}

// ── Vacancy Actions ───────────────────────────────────────────
export async function fetchVacancies(): Promise<VacancyItem[]> {
  return getVacancies();
}

export async function fetchVacancyById(id: string): Promise<VacancyItem | null> {
  const item = getVacancyById(id);
  return item || null;
}

export async function addVacancy(data: Omit<VacancyItem, "id" | "createdAt">): Promise<VacancyItem> {
  return createVacancy(data);
}

export async function editVacancy(id: string, data: Partial<VacancyItem>): Promise<VacancyItem | null> {
  return updateVacancy(id, data);
}

export async function removeVacancy(id: string): Promise<boolean> {
  return deleteVacancy(id);
}

// ── Subscriber Actions ────────────────────────────────────────
export async function fetchSubscribers() {
  return getSubscribers();
}

export async function subscribeEmail(email: string) {
  return addSubscriber(email);
}

export async function removeSubscriber(id: string): Promise<boolean> {
  return deleteSubscriber(id);
}

// ── Dashboard Stats ───────────────────────────────────────────
export async function fetchDashboardStats() {
  const [news, bids, vacancies, subscribers] = await Promise.all([
    getNews(),
    getBids(),
    getVacancies(),
    getSubscribers(),
  ]);

  const newsByMonth: Record<string, number> = {};
  news.forEach((n) => {
    const month = n.date?.substring(0, 7) || "2026-06";
    newsByMonth[month] = (newsByMonth[month] || 0) + 1;
  });

  const recentActivity = [
    ...news.slice(0, 3).map((n) => ({
      type: "news" as const,
      message: `News published: ${n.title.substring(0, 50)}...`,
      date: n.createdAt,
    })),
    ...bids.slice(0, 2).map((b) => ({
      type: "bid" as const,
      message: `Bid ${b.status.toLowerCase()}: ${b.title.substring(0, 50)}...`,
      date: b.createdAt,
    })),
    ...vacancies.slice(0, 2).map((v) => ({
      type: "vacancy" as const,
      message: `Vacancy posted: ${v.title.substring(0, 50)}...`,
      date: v.createdAt,
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 8);

  return {
    totalNews: news.length,
    totalBids: bids.length,
    totalVacancies: vacancies.length,
    totalSubscribers: subscribers.length,
    openBids: bids.filter((b) => b.status === "Open").length,
    publishedNews: news.filter((n) => n.status === "published").length,
    newsByMonth,
    recentActivity,
  };
}