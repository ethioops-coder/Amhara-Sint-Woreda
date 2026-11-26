import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  imageUrl: string;
  featured: boolean;
  status: "published" | "draft";
  date: string;
  createdAt: string;
}

export interface BidItem {
  id: string;
  title: string;
  description: string;
  budget: string;
  budgetAmount: number;
  deadline: string;
  status: "Open" | "Closed" | "Awarded";
  createdAt: string;
}

export interface VacancyItem {
  id: string;
  title: string;
  department: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  salary: string;
  deadline: string;
  description: string;
  requirements: string;
  status: "Open" | "Closed" | "Awarded";
  createdAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

function readJson<T>(filename: string): T[] {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T[];
}

function writeJson<T>(filename: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}

// ── News ──────────────────────────────────────────────────────
export function getNews(): NewsItem[] {
  return readJson<NewsItem>("news.json");
}

export function getNewsById(id: string): NewsItem | undefined {
  return getNews().find((n) => n.id === id);
}

export function createNews(data: Omit<NewsItem, "id" | "createdAt">): NewsItem {
  const news = getNews();
  const item: NewsItem = {
    ...data,
    id: generateId("news"),
    createdAt: new Date().toISOString(),
  };
  news.unshift(item);
  writeJson("news.json", news);
  return item;
}

export function updateNews(id: string, data: Partial<NewsItem>): NewsItem | null {
  const news = getNews();
  const idx = news.findIndex((n) => n.id === id);
  if (idx === -1) return null;
  news[idx] = { ...news[idx], ...data };
  writeJson("news.json", news);
  return news[idx];
}

export function deleteNews(id: string): boolean {
  const news = getNews();
  const filtered = news.filter((n) => n.id !== id);
  if (filtered.length === news.length) return false;
  writeJson("news.json", filtered);
  return true;
}

// ── Bids ──────────────────────────────────────────────────────
export function getBids(): BidItem[] {
  return readJson<BidItem>("bids.json");
}

export function getBidById(id: string): BidItem | undefined {
  return getBids().find((b) => b.id === id);
}

export function createBid(data: Omit<BidItem, "id" | "createdAt">): BidItem {
  const bids = getBids();
  const item: BidItem = {
    ...data,
    id: generateId("bid"),
    createdAt: new Date().toISOString(),
  };
  bids.unshift(item);
  writeJson("bids.json", bids);
  return item;
}

export function updateBid(id: string, data: Partial<BidItem>): BidItem | null {
  const bids = getBids();
  const idx = bids.findIndex((b) => b.id === id);
  if (idx === -1) return null;
  bids[idx] = { ...bids[idx], ...data };
  writeJson("bids.json", bids);
  return bids[idx];
}

export function deleteBid(id: string): boolean {
  const bids = getBids();
  const filtered = bids.filter((b) => b.id !== id);
  if (filtered.length === bids.length) return false;
  writeJson("bids.json", filtered);
  return true;
}

// ── Vacancies ─────────────────────────────────────────────────
export function getVacancies(): VacancyItem[] {
  return readJson<VacancyItem>("vacancies.json");
}

export function getVacancyById(id: string): VacancyItem | undefined {
  return getVacancies().find((v) => v.id === id);
}

export function createVacancy(data: Omit<VacancyItem, "id" | "createdAt">): VacancyItem {
  const vacancies = getVacancies();
  const item: VacancyItem = {
    ...data,
    id: generateId("vac"),
    createdAt: new Date().toISOString(),
  };
  vacancies.unshift(item);
  writeJson("vacancies.json", vacancies);
  return item;
}

export function updateVacancy(id: string, data: Partial<VacancyItem>): VacancyItem | null {
  const vacancies = getVacancies();
  const idx = vacancies.findIndex((v) => v.id === id);
  if (idx === -1) return null;
  vacancies[idx] = { ...vacancies[idx], ...data };
  writeJson("vacancies.json", vacancies);
  return vacancies[idx];
}

export function deleteVacancy(id: string): boolean {
  const vacancies = getVacancies();
  const filtered = vacancies.filter((v) => v.id !== id);
  if (filtered.length === vacancies.length) return false;
  writeJson("vacancies.json", filtered);
  return true;
}

// ── Subscribers ───────────────────────────────────────────────
export function getSubscribers(): Subscriber[] {
  return readJson<Subscriber>("subscribers.json");
}

export function addSubscriber(email: string): Subscriber {
  const subscribers = getSubscribers();
  const existing = subscribers.find((s) => s.email === email);
  if (existing) return existing;
  const item: Subscriber = {
    id: generateId("sub"),
    email,
    subscribedAt: new Date().toISOString(),
  };
  subscribers.push(item);
  writeJson("subscribers.json", subscribers);
  return item;
}

export function deleteSubscriber(id: string): boolean {
  const subscribers = getSubscribers();
  const filtered = subscribers.filter((s) => s.id !== id);
  if (filtered.length === subscribers.length) return false;
  writeJson("subscribers.json", filtered);
  return true;
}

// ── Gallery ───────────────────────────────────────────────────
export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export function getGallery(): GalleryItem[] {
  return readJson<GalleryItem>("gallery.json");
}

export function createGalleryItem(data: Omit<GalleryItem, "id" | "createdAt">): GalleryItem {
  const items = getGallery();
  const item: GalleryItem = {
    ...data,
    id: generateId("gal"),
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  writeJson("gallery.json", items);
  return item;
}

export function updateGalleryItem(id: string, data: Partial<GalleryItem>): GalleryItem | null {
  const items = getGallery();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  writeJson("gallery.json", items);
  return items[idx];
}

export function deleteGalleryItem(id: string): boolean {
  const items = getGallery();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  writeJson("gallery.json", filtered);
  return true;
}

// ── Applications ──────────────────────────────────────────────
export interface ApplicationItem {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  gender?: string;
  education: string;
  institution?: string;
  experienceYears?: string;
  currentEmployer?: string;
  currentPosition?: string;
  keyQualifications?: string;
  experience: string;
  coverLetter: string;
  cvPath: string;
  cvOriginalName: string;
  cvFile?: string;
  cvName?: string;
  coverLetterName?: string;
  coverLetterFile?: string;
  appliedAt?: string;
  status: string;
  notes: string;
  createdAt: string;
}

export function getApplications(): ApplicationItem[] {
  return readJson<ApplicationItem>("applications.json");
}

export function getApplicationById(id: string): ApplicationItem | undefined {
  return getApplications().find((a) => a.id === id);
}

export function getApplicationsByVacancyId(vacancyId: string): ApplicationItem[] {
  return getApplications().filter((a) => a.vacancyId === vacancyId);
}

export function createApplication(data: Omit<ApplicationItem, "id" | "createdAt">): ApplicationItem {
  const applications = getApplications();
  const item: ApplicationItem = {
    ...data,
    id: generateId("app"),
    createdAt: new Date().toISOString(),
  };
  applications.unshift(item);
  writeJson("applications.json", applications);
  return item;
}

export function updateApplication(id: string, data: Partial<ApplicationItem>): ApplicationItem | null {
  const applications = getApplications();
  const idx = applications.findIndex((a) => a.id === id);
  if (idx === -1) return null;
  applications[idx] = { ...applications[idx], ...data };
  writeJson("applications.json", applications);
  return applications[idx];
}

export function deleteApplication(id: string): boolean {
  const applications = getApplications();
  const filtered = applications.filter((a) => a.id !== id);
  if (filtered.length === applications.length) return false;
  writeJson("applications.json", filtered);
  return true;
}

// ── Announcements ─────────────────────────────────────────────
export interface AnnouncementItem {
  id: string;
  title: string;
  content: string;
  priority: string;
  status: "published" | "draft";
  createdAt: string;
}

export function getAnnouncements(): AnnouncementItem[] {
  return readJson<AnnouncementItem>("announcements.json");
}

export function createAnnouncement(data: Omit<AnnouncementItem, "id" | "createdAt">): AnnouncementItem {
  const items = getAnnouncements();
  const item: AnnouncementItem = {
    ...data,
    id: generateId("ann"),
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  writeJson("announcements.json", items);
  return item;
}

export function updateAnnouncement(id: string, data: Partial<AnnouncementItem>): AnnouncementItem | null {
  const items = getAnnouncements();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  writeJson("announcements.json", items);
  return items[idx];
}

export function deleteAnnouncement(id: string): boolean {
  const items = getAnnouncements();
  const filtered = items.filter((i) => i.id !== id);
  if (filtered.length === items.length) return false;
  writeJson("announcements.json", filtered);
  return true;
}

// ── Seed Defaults ─────────────────────────────────────────────
export function seedDefaults(): void {
  // No-op: default data is handled at the route level
}