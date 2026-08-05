"use client";

import { useEffect, useState, useCallback } from "react";

/* ─── types ─── */
type AdminPage = "dashboard" | "news" | "news-new" | "news-edit" | "bids" | "bids-new" | "bids-edit" | "vacancy" | "vacancy-new" | "vacancy-edit" | "menus" | "applications" | "subscribers" | "settings" | "content" | "pages" | "pages-new" | "pages-edit" | "contact-messages" | "visitors";

interface DashboardStats {
  totalNews: number;
  totalBids: number;
  totalVacancies: number;
  totalSubscribers: number;
  totalApplications: number;
  totalMessages: number;
  openBids: number;
  publishedNews: number;
  newsByMonth: Record<string, number>;
  recentActivity: { type: string; message: string; date: string }[];
}

interface NewsItem { id: string; title: string; summary: string; category: string; author: string; status: string; featured: boolean; date: string; content?: string; imageUrl?: string; }
interface BidItem { id: string; title: string; description: string; budget: string; budgetAmount: number; deadline: string; status: string; }
interface VacancyItem { id: string; title: string; department: string; type: string; deadline: string; description?: string; requirements?: string; }
interface Subscriber { id: string; email: string; subscribedAt: string; }

const CATEGORIES = ["Education", "Health", "Agriculture", "Infrastructure", "Governance", "Water", "Finance", "Transport", "Other"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/* ─── spinner ─── */
function Spinner() {
  return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-[3px] border-[#0B3D2E]/20 border-t-[#0B3D2E] rounded-full animate-spin" /></div>;
}

/* ─── SIDEBAR ─── */
function Sidebar({ page, nav, onLogout }: { page: AdminPage; nav: (p: AdminPage) => void; onLogout: () => void }) {
  const items: { label: string; key: AdminPage; icon: string }[] = [
    { label: "Dashboard", key: "dashboard", icon: "📊" },
    { label: "Visitors", key: "visitors", icon: "👁️" },
    { label: "News", key: "news", icon: "📰" },
    { label: "Bids & Tenders", key: "bids", icon: "💼" },
    { label: "Vacancies", key: "vacancy", icon: "📋" },
    { label: "Menu Manager", key: "menus", icon: "📑" },
    { label: "Applications", key: "applications", icon: "📋" },
    { label: "Content", key: "content", icon: "📝" },
    { label: "Custom Pages", key: "pages", icon: "📄" },
    { label: "Messages", key: "contact-messages", icon: "💬" },
    { label: "Subscribers", key: "subscribers", icon: "✉️" },
    { label: "Settings", key: "settings", icon: "⚙️" },
  ];

  const active = (key: AdminPage) => {
    if (key === "dashboard") return page === "dashboard";
    return page === key || page === (key + "-new" as AdminPage) || page === (key + "-edit" as AdminPage);
  };

  return (
    <>
      <div id="sidebar-overlay" className="fixed inset-0 bg-black/50 z-40 hidden lg:hidden" onClick={() => { const s = document.getElementById("admin-sidebar"); const o = document.getElementById("sidebar-overlay"); if (s) s.classList.add("-translate-x-full"); if (o) o.classList.add("hidden"); }} />
      <aside id="admin-sidebar" className="fixed top-0 left-0 z-50 w-64 h-screen bg-[#0B3D2E] flex flex-col -translate-x-full lg:translate-x-0 transition-transform duration-300">
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <button onClick={() => nav("dashboard")} className="flex items-center gap-3">
            <img src="/logo.png" alt="AS" className="w-9 h-9 rounded-lg shadow-md ring-1 ring-white/20 object-contain" />
            <div>
              <div className="text-white font-bold text-sm leading-tight">Admin Panel</div>
              <div className="text-[#86EFAC] text-[10px] font-medium">Amhara Sayint</div>
            </div>
          </button>
          <button onClick={() => { const s = document.getElementById("admin-sidebar"); const o = document.getElementById("sidebar-overlay"); if (s) s.classList.add("-translate-x-full"); if (o) o.classList.add("hidden"); }} className="lg:hidden text-white/60 hover:text-white p-1">✕</button>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <button key={item.key} onClick={() => nav(item.key)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${active(item.key) ? "bg-[#EAB308]/15 text-[#EAB308]" : "text-white/60 hover:text-white hover:bg-white/8"}`}>
              <span className="w-[18px] text-center shrink-0">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-4 space-y-1 border-t border-white/10 pt-3">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all duration-200">
            <span className="w-[18px] text-center">↗</span> Back to Website
          </a>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-300/80 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200">
            <span className="w-[18px] text-center">↩</span> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* ─── DASHBOARD ─── */
function DashboardPage({ nav }: { nav: (p: AdminPage) => void }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  useEffect(() => { fetch("/admin/api/stats").then(r => r.json()).then(setStats); }, []);
  if (!stats) return <Spinner />;

  const maxCount = Math.max(...Object.values(stats.newsByMonth), 1);
  const barData = MONTHS.map((m, i) => { const key = `2026-${String(i + 1).padStart(2, "0")}`; return { month: m, count: stats.newsByMonth[key] || 0 }; });

  const cards = [
    { label: "Total News", value: stats.totalNews, icon: "📰", gradient: "from-[#0B3D2E] to-[#145A44]", text: "text-white", sub: "text-white/60", iconBg: "bg-white/15", click: () => nav("news") },
    { label: "Applications", value: stats.totalApplications || 0, icon: "📋", gradient: "from-blue-50 to-indigo-50", text: "text-blue-800", sub: "text-blue-400", iconBg: "bg-blue-100", click: () => nav("applications") },
    { label: "Messages", value: stats.totalMessages || 0, icon: "💬", gradient: "from-rose-50 to-pink-50", text: "text-rose-800", sub: "text-rose-400", iconBg: "bg-rose-100", click: () => nav("contact-messages") },
    { label: "Open Bids", value: stats.openBids || 0, icon: "💼", gradient: "from-amber-50 to-yellow-50", text: "text-amber-800", sub: "text-amber-400", iconBg: "bg-amber-100", click: () => nav("bids") },
  ];

  const actions = [
    { label: "Add News", desc: "Create a new news article", page: "news-new" as AdminPage },
    { label: "Add Bid", desc: "Post a new tender", page: "bids-new" as AdminPage },
    { label: "Add Vacancy", desc: "Post a job opening", page: "vacancy-new" as AdminPage },
    { label: "View Subscribers", desc: "Manage email list", page: "subscribers" as AdminPage },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Overview of your woreda administration</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => nav("news-new")} className="bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] text-sm font-semibold shadow-sm px-4 py-2 rounded-lg transition-colors">＋ New Post</button>
          <button onClick={() => nav("bids-new")} className="border border-gray-200 hover:bg-gray-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">＋ New Bid</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <button key={c.label} onClick={c.click}
            className={`bg-gradient-to-br ${c.gradient} rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 text-left group hover:-translate-y-0.5`}>
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${c.iconBg} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300`}>{c.icon}</div>
              <span className={`text-xs font-semibold ${c.sub} opacity-0 group-hover:opacity-100 transition-opacity`}>→ View</span>
            </div>
            <p className={`text-3xl font-black ${c.text} leading-none mb-1.5 tabular-nums`}>{c.value.toLocaleString()}</p>
            <p className={`text-xs font-semibold uppercase tracking-wider ${c.sub}`}>{c.label}</p>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-2 h-5 rounded-full bg-[#0B3D2E] inline-block" />
              Posts Over Time
            </h3>
            <span className="text-xs text-gray-400 font-medium">2026</span>
          </div>
          <div className="flex items-end gap-1.5 h-44 mt-2">
            {barData.map((d) => {
              const pct = Math.max((d.count / maxCount) * 100, d.count > 0 ? 8 : 4);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] text-gray-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">{d.count > 0 ? d.count : ""}</span>
                  <div className="relative w-full rounded-t-lg transition-all duration-700 min-h-[4px] overflow-hidden"
                    style={{ height: `${pct}%`, backgroundColor: d.count > 0 ? "#0B3D2E" : "#f3f4f6" }}>
                    {d.count > 0 && <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-t-lg" />}
                  </div>
                  <span className="text-[9px] text-gray-400 font-medium">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {actions.map((a) => (
              <button key={a.page} onClick={() => nav(a.page)} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left">
                <div>
                  <p className="text-sm font-medium text-gray-900">{a.label}</p>
                  <p className="text-xs text-gray-400">{a.desc}</p>
                </div>
                <span className="text-gray-300 group-hover:text-[#0B3D2E] transition-colors">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {stats.recentActivity.length === 0 && <p className="text-sm text-gray-400 text-center py-6">No recent activity</p>}
          {stats.recentActivity.map((a, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${a.type === "news" ? "bg-blue-50 text-blue-600" : a.type === "bid" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{a.type}</span>
              <p className="text-sm text-gray-600 flex-1 truncate">{a.message}</p>
              <span className="text-xs text-gray-400 shrink-0">{new Date(a.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── NEWS LIST ─── */
function NewsListPage({ nav }: { nav: (p: AdminPage) => void }) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const load = () => { fetch("/admin/api/news").then(r => r.json()).then(setNews).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const handleDelete = async (id: string) => { if (!confirm("Delete this article?")) return; await fetch(`/admin/api/news?id=${id}`, { method: "DELETE" }); load(); };
  const filtered = news.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.category.toLowerCase().includes(search.toLowerCase()));
  if (loading) return <Spinner />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">News Management</h1><p className="text-sm text-gray-500 mt-1">{news.length} articles total</p></div>
        <button onClick={() => nav("news-new")} className="bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] text-sm font-semibold shadow-sm px-4 py-2 rounded-lg transition-colors">＋ Add News</button>
      </div>
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input placeholder="Search news..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {item.featured && <span className="bg-[#EAB308]/10 text-[#A16207] text-[10px] px-1.5 py-0.5 rounded font-medium">Featured</span>}
                      <span className="font-medium text-gray-900 truncate max-w-[250px] block">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell"><span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">{item.category}</span></td>
                  <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{item.date}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-0.5 rounded ${item.status === "published" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{item.status === "published" ? "👁 Published" : "🚫 Draft"}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { nav("news-edit"); (window as unknown as { __adminEditId: string }).__adminEditId = item.id; }} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors text-sm">✏️</button>
                      <button onClick={() => handleDelete(item.id)} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-gray-400">No news articles found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── NEWS FORM (new + edit) ─── */
function NewsForm({ editId, onBack }: { editId: string | null; onBack: () => void }) {
  const [loading, setLoading] = useState(!!editId);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "", summary: "", content: "", category: "Education",
    author: "", imageUrl: "", featured: false,
    status: "draft" as "published" | "draft",
    date: new Date().toISOString().split("T")[0]
  });

  useEffect(() => {
    if (!editId) return;
    fetch("/admin/api/news").then(r => r.json()).then((items: NewsItem[]) => {
      const item = items.find(n => n.id === editId);
      if (item) setForm({
        title: item.title || "", summary: item.summary || "",
        content: item.content || "", category: item.category || "Education",
        author: item.author || "", imageUrl: item.imageUrl || "",
        featured: item.featured || false, status: item.status || "draft",
        date: item.date || ""
      });
    }).finally(() => setLoading(false));
  }, [editId]);

  // Upload a single image and return the URL
  const uploadImage = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/admin/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url || null;
  };

  // Handle cover image upload
  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      if (url) setForm(f => ({ ...f, imageUrl: url }));
    } catch { alert("Upload failed"); }
    finally { setUploading(false); e.target.value = ""; }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await fetch("/admin/api/news", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { id: editId, ...form } : form)
      });
      onBack();
    } catch { alert("Failed to save article"); }
    finally { setSaving(false); }
  };

  if (loading) return <Spinner />;
  const u = (k: string, v: string | boolean) => setForm({ ...form, [k]: v });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900">{editId ? "Edit" : "Add"} News Article</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-5">
          <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">📝 Article Details</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title *</label>
            <input value={form.title} onChange={e => u("title", e.target.value)} placeholder="Enter article title" required
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select value={form.category} onChange={e => u("category", e.target.value)}
                className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Author</label>
              <input value={form.author} onChange={e => u("author", e.target.value)} placeholder="e.g. Communication Office"
                className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Publish Date</label>
            <input type="date" value={form.date} onChange={e => u("date", e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Summary</label>
            <textarea value={form.summary} onChange={e => u("summary", e.target.value)} placeholder="Brief summary shown in news list..." rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] resize-none" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Content</label>
            <textarea value={form.content} onChange={e => u("content", e.target.value)} placeholder="Full article text..." rows={10}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] resize-y" />
          </div>
        </div>

        {/* Cover Image */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">🖼️ Cover Image</h3>

          {/* Upload button */}
          <label className="flex items-center gap-3 w-full cursor-pointer border-2 border-dashed border-gray-200 hover:border-[#0B3D2E]/40 rounded-xl p-4 transition-colors group">
            <div className="w-10 h-10 bg-[#0B3D2E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0B3D2E]/20 transition-colors">
              {uploading ? <div className="w-5 h-5 border-2 border-[#0B3D2E]/30 border-t-[#0B3D2E] rounded-full animate-spin" /> : <span className="text-xl">📷</span>}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-700">{uploading ? "Uploading..." : "Click to upload cover photo"}</p>
              <p className="text-xs text-gray-400">JPG, PNG — max 10MB</p>
            </div>
            <input type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" disabled={uploading} />
          </label>

          {/* OR paste URL */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400 font-medium">OR paste image URL</span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>
          <input value={form.imageUrl} onChange={e => u("imageUrl", e.target.value)} placeholder="https://example.com/photo.jpg"
            className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />

          {/* Preview */}
          {form.imageUrl && (
            <div className="relative rounded-xl overflow-hidden h-48 bg-gray-100">
              <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              <button type="button" onClick={() => u("imageUrl", "")}
                className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs font-bold flex items-center justify-center">✕</button>
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">Cover Image Preview</div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <h3 className="text-base font-semibold text-gray-900 border-b border-gray-100 pb-3">⚙️ Settings</h3>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-700">Featured Article</p>
              <p className="text-xs text-gray-400">Appears prominently on homepage</p>
            </div>
            <button type="button" onClick={() => u("featured", !form.featured)}
              className={`relative w-11 h-6 rounded-full transition-colors ${form.featured ? "bg-[#0B3D2E]" : "bg-gray-300"}`}>
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${form.featured ? "translate-x-5" : ""}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-sm font-medium text-gray-700">Visibility</p>
              <p className="text-xs text-gray-400">Draft = not visible to public</p>
            </div>
            <select value={form.status} onChange={e => u("status", e.target.value)}
              className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm font-medium">
              <option value="draft">📄 Draft</option>
              <option value="published">✅ Published</option>
            </select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 pb-6">
          <button type="submit" disabled={saving || !form.title.trim()}
            className="flex-1 sm:flex-none bg-[#0B3D2E] hover:bg-[#145A44] disabled:opacity-50 text-white font-semibold text-sm px-8 py-3 rounded-xl transition-colors shadow-md">
            {saving ? "⏳ Saving..." : editId ? "✅ Save Changes" : "🚀 Publish Article"}
          </button>
          <button type="button" onClick={onBack}
            className="border border-gray-200 hover:bg-gray-50 text-sm font-semibold px-6 py-3 rounded-xl transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── BIDS LIST ─── */
function BidsListPage({ nav }: { nav: (p: AdminPage) => void }) {
  const [bids, setBids] = useState<BidItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const load = () => { fetch("/admin/api/bids").then(r => r.json()).then(setBids).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const handleDelete = async (id: string) => { if (!confirm("Delete this bid?")) return; await fetch(`/admin/api/bids?id=${id}`, { method: "DELETE" }); load(); };
  const filtered = bids.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));
  const statusColor = (s: string) => s === "Open" ? "bg-green-50 text-green-600" : s === "Closed" ? "bg-gray-100 text-gray-500" : "bg-amber-50 text-amber-600";
  if (loading) return <Spinner />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Bids & Tenders</h1><p className="text-sm text-gray-500 mt-1">{bids.length} total bids</p></div>
        <button onClick={() => nav("bids-new")} className="bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] text-sm font-semibold shadow-sm px-4 py-2 rounded-lg transition-colors">＋ Add Bid</button>
      </div>
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input placeholder="Search bids..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Budget</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">Deadline</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4"><span className="font-medium text-gray-900 truncate max-w-[250px] block">{item.title}</span></td>
                  <td className="py-3 px-4 text-gray-600 hidden md:table-cell font-medium">{item.budget}</td>
                  <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{item.deadline}</td>
                  <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded ${statusColor(item.status)}`}>{item.status}</span></td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { nav("bids-edit"); (window as unknown as { __adminEditId: string }).__adminEditId = item.id; }} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors text-sm">✏️</button>
                      <button onClick={() => handleDelete(item.id)} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-gray-400">No bids found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── BID FORM (new + edit) ─── */
function BidForm({ editId, onBack }: { editId: string | null; onBack: () => void }) {
  const [loading, setLoading] = useState(!!editId);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", budget: "", budgetAmount: 0, deadline: "", status: "Open" as "Open" | "Closed" | "Awarded" });

  useEffect(() => {
    if (!editId) return;
    fetch("/admin/api/bids").then(r => r.json()).then((items: BidItem[]) => {
      const item = items.find(b => b.id === editId);
      if (item) setForm({ title: item.title || "", description: item.description || "", budget: item.budget || "", budgetAmount: item.budgetAmount || 0, deadline: item.deadline || "", status: item.status || "Open" });
    }).finally(() => setLoading(false));
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await fetch("/admin/api/bids", { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editId ? { id: editId, ...form } : form) });
      onBack();
    } catch { alert("Failed to save bid"); } finally { setSaving(false); }
  };
  const u = (k: string, v: string | number) => setForm({ ...form, [k]: v });
  if (loading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900">{editId ? "Edit" : "Add"} Bid / Tender</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Bid Details</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Title *</label><input value={form.title} onChange={e => u("title", e.target.value)} placeholder="Enter bid title" required className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Description</label><textarea value={form.description} onChange={e => u("description", e.target.value)} placeholder="Describe the bid..." rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] resize-none" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Budget Label</label><input value={form.budget} onChange={e => u("budget", e.target.value)} placeholder="e.g. ETB 5 Million" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Budget Amount (ETB)</label><input type="number" value={form.budgetAmount || ""} onChange={e => u("budgetAmount", Number(e.target.value))} placeholder="e.g. 5000000" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Deadline</label><input type="date" value={form.deadline} onChange={e => u("deadline", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Status</label><select value={form.status} onChange={e => u("status", e.target.value)} className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"><option value="Open">Open</option><option value="Closed">Closed</option><option value="Awarded">Awarded</option></select></div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving || !form.title.trim()} className="bg-[#0B3D2E] hover:bg-[#145A44] disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">{saving ? "⏳ Saving..." : editId ? "Save Changes" : "Create Bid"}</button>
            <button type="button" onClick={onBack} className="border border-gray-200 hover:bg-gray-50 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── VACANCY LIST ─── */
function VacancyListPage({ nav }: { nav: (p: AdminPage) => void }) {
  const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const load = () => { fetch("/admin/api/vacancies").then(r => r.json()).then(setVacancies).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const handleDelete = async (id: string) => { if (!confirm("Delete this vacancy?")) return; await fetch(`/admin/api/vacancies?id=${id}`, { method: "DELETE" }); load(); };
  const filtered = vacancies.filter(v => v.title.toLowerCase().includes(search.toLowerCase()) || v.department.toLowerCase().includes(search.toLowerCase()));
  if (loading) return <Spinner />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Vacancies</h1><p className="text-sm text-gray-500 mt-1">{vacancies.length} total vacancies</p></div>
        <button onClick={() => nav("vacancy-new")} className="bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] text-sm font-semibold shadow-sm px-4 py-2 rounded-lg transition-colors">＋ Add Vacancy</button>
      </div>
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input placeholder="Search vacancies..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Department</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">Deadline</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4"><span className="font-medium text-gray-900 truncate max-w-[250px] block">{item.title}</span></td>
                  <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{item.department}</td>
                  <td className="py-3 px-4 hidden sm:table-cell"><span className="bg-[#0B3D2E] text-white text-xs px-2 py-0.5 rounded">{item.type}</span></td>
                  <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{item.deadline}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { nav("vacancy-edit"); (window as unknown as { __adminEditId: string }).__adminEditId = item.id; }} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors text-sm">✏️</button>
                      <button onClick={() => handleDelete(item.id)} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="py-12 text-center text-gray-400">No vacancies found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── VACANCY FORM (new + edit) ─── */
function VacancyForm({ editId, onBack }: { editId: string | null; onBack: () => void }) {
  const [loading, setLoading] = useState(!!editId);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", department: "", type: "Full-Time" as "Full-Time" | "Part-Time" | "Contract", deadline: "", description: "", requirements: "" });

  useEffect(() => {
    if (!editId) return;
    fetch("/admin/api/vacancies").then(r => r.json()).then((items: VacancyItem[]) => {
      const item = items.find(v => v.id === editId);
      if (item) setForm({ title: item.title || "", department: item.department || "", type: item.type || "Full-Time", deadline: item.deadline || "", description: item.description || "", requirements: item.requirements || "" });
    }).finally(() => setLoading(false));
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await fetch("/admin/api/vacancies", { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editId ? { id: editId, ...form } : form) });
      onBack();
    } catch { alert("Failed to save vacancy"); } finally { setSaving(false); }
  };
  const u = (k: string, v: string) => setForm({ ...form, [k]: v });
  if (loading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900">{editId ? "Edit" : "Add"} Vacancy</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Vacancy Details</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Title *</label><input value={form.title} onChange={e => u("title", e.target.value)} placeholder="e.g. Health Extension Workers" required className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Department</label><input value={form.department} onChange={e => u("department", e.target.value)} placeholder="e.g. Health Office" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
            <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Type</label><select value={form.type} onChange={e => u("type", e.target.value)} className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm"><option value="Full-Time">Full-Time</option><option value="Part-Time">Part-Time</option><option value="Contract">Contract</option></select></div>
          </div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Application Deadline</label><input type="date" value={form.deadline} onChange={e => u("deadline", e.target.value)} className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Description</label><textarea value={form.description} onChange={e => u("description", e.target.value)} placeholder="Job description..." rows={4} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] resize-none" /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Requirements</label><textarea value={form.requirements} onChange={e => u("requirements", e.target.value)} placeholder="Required qualifications..." rows={3} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] resize-none" /></div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving || !form.title.trim()} className="bg-[#0B3D2E] hover:bg-[#145A44] disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">{saving ? "⏳ Saving..." : editId ? "Save Changes" : "Create Vacancy"}</button>
            <button type="button" onClick={onBack} className="border border-gray-200 hover:bg-gray-50 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── SUBSCRIBERS ─── */
function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const load = () => { fetch("/admin/api/subscribers").then(r => r.json()).then(setSubscribers).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const handleDelete = async (id: string) => { if (!confirm("Delete this subscriber?")) return; await fetch(`/admin/api/subscribers?id=${id}`, { method: "DELETE" }); load(); };
  const handleExport = () => {
    const csv = ["Email,Subscribed At", ...subscribers.map(s => `${s.email},${s.subscribedAt}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "subscribers.csv"; a.click();
    URL.revokeObjectURL(url);
  };
  const filtered = subscribers.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));
  if (loading) return <Spinner />;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Subscribers</h1><p className="text-sm text-gray-500 mt-1">{subscribers.length} email subscribers</p></div>
        <button onClick={handleExport} className="border border-gray-200 hover:bg-gray-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">📥 Export CSV</button>
      </div>
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input placeholder="Search subscribers..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden sm:table-cell">Subscribed At</th>
              <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0 text-xs">✉️</div>
                      <span className="font-medium text-gray-900">{sub.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{new Date(sub.subscribedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</td>
                  <td className="py-3 px-4"><div className="flex items-center justify-end"><button onClick={() => handleDelete(sub.id)} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm">🗑️</button></div></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={3} className="py-12 text-center text-gray-400">No subscribers found.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── MENU MANAGER ─── */
interface MenuItem { id: string; label: string; href: string; order: number; children?: { id: string; label: string; href: string; order: number }[]; }

function MenusPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { fetch("/admin/api/menu").then(r => r.json()).then(d => { setMenus(Array.isArray(d) ? d : []); setLoading(false); }); }, []);

  const updateMenu = (idx: number, field: string, value: string | number) => {
    const m = [...menus];
    (m[idx] as any)[field] = value;
    setMenus(m); setSaved(false);
  };
  const updateChild = (pIdx: number, cIdx: number, field: string, value: string | number) => {
    const m = [...menus];
    if (m[pIdx].children) { (m[pIdx].children![cIdx] as any)[field] = value; }
    setMenus(m); setSaved(false);
  };
  const addChild = (pIdx: number) => {
    const m = [...menus];
    if (!m[pIdx].children) m[pIdx].children = [];
    m[pIdx].children!.push({ id: Date.now().toString(), label: "New Item", href: "", order: m[pIdx].children!.length });
    setMenus(m); setSaved(false);
  };
  const removeChild = (pIdx: number, cIdx: number) => {
    const m = [...menus];
    m[pIdx].children?.splice(cIdx, 1);
    setMenus(m); setSaved(false);
  };
  const addMenu = () => {
    setMenus([...menus, { id: Date.now().toString(), label: "New Menu", href: "", order: menus.length, children: [] }]);
    setSaved(false);
  };
  const removeMenu = (idx: number) => {
    const m = [...menus]; m.splice(idx, 1);
    setMenus(m); setSaved(false);
  };
  const moveMenu = (idx: number, dir: -1 | 1) => {
    const target = idx + dir;
    if (target < 0 || target >= menus.length) return;
    const m = [...menus];
    [m[idx], m[target]] = [m[target], m[idx]];
    m.forEach((item, i) => item.order = i);
    setMenus(m); setSaved(false);
  };
  const save = async () => {
    setSaving(true);
    try {
      const res = await fetch("/admin/api/menu", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(menus) });
      if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-gray-900">Menu Manager</h1><p className="text-sm text-gray-500 mt-1">Manage navigation menus and sub-menus</p></div>
        <div className="flex gap-2">
          <button onClick={addMenu} className="px-4 py-2 bg-[#0B3D2E] text-white text-sm font-medium rounded-lg hover:bg-[#145A44] transition-colors">+ Add Menu</button>
          <button onClick={save} disabled={saving} className="px-4 py-2 bg-[#EAB308] text-[#0B3D2E] text-sm font-bold rounded-lg hover:bg-[#CA8A04] transition-colors disabled:opacity-60 flex items-center gap-2">
            {saving ? "Saving..." : saved ? "✓ Saved!" : "💾 Save All"}
          </button>
        </div>
      </div>
      <div className="space-y-4">
        {menus.map((menu, idx) => (
          <div key={menu.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center gap-3 flex-wrap">
              <div className="flex flex-col gap-1">
                <input type="text" value={menu.label} onChange={e => updateMenu(idx, "label", e.target.value)} className="text-sm font-bold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#0B3D2E] focus:outline-none px-1 py-0.5 transition-colors w-48" />
                <input type="text" value={menu.href} onChange={e => updateMenu(idx, "href", e.target.value)} className="text-xs text-gray-400 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#0B3D2E] focus:outline-none px-1 py-0.5 transition-colors w-48" placeholder="Page ID (href)" />
              </div>
              <div className="ml-auto flex items-center gap-1">
                <span className="text-[10px] text-gray-400 mr-1">Order: {idx}</span>
                <button onClick={() => moveMenu(idx, -1)} disabled={idx === 0} className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-30 text-xs">↑</button>
                <button onClick={() => moveMenu(idx, 1)} disabled={idx === menus.length - 1} className="w-7 h-7 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 disabled:opacity-30 text-xs">↓</button>
                <button onClick={() => addChild(idx)} className="ml-1 px-2.5 py-1 text-xs font-medium text-[#0B3D2E] bg-[#F0FDF4] rounded-lg hover:bg-[#dcfce7] transition-colors">+ Sub</button>
                <button onClick={() => removeMenu(idx)} className="ml-1 px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">Delete</button>
              </div>
            </div>
            {menu.children && menu.children.length > 0 && (
              <div className="divide-y divide-gray-50">
                {menu.children.map((child, cIdx) => (
                  <div key={child.id} className="px-4 py-3 ml-8 flex items-center gap-3">
                    <span className="text-gray-300 text-xs">↳</span>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <input type="text" value={child.label} onChange={e => updateChild(idx, cIdx, "label", e.target.value)} className="text-sm text-gray-700 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#0B3D2E] focus:outline-none px-1 py-0.5 transition-colors" />
                      <input type="text" value={child.href} onChange={e => updateChild(idx, cIdx, "href", e.target.value)} className="text-xs text-gray-400 bg-transparent border-b border-transparent hover:border-gray-200 focus:border-[#0B3D2E] focus:outline-none px-1 py-0.5 transition-colors w-48" placeholder="Page ID (href)" />
                    </div>
                    <button onClick={() => removeChild(idx, cIdx)} className="px-2 py-0.5 text-xs text-red-500 hover:bg-red-50 rounded transition-colors">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── APPLICATIONS PAGE ─── */
interface ApplicationItem { id: string; fullName: string; email: string; phone: string; gender: string; education: string; institution: string; experienceYears: string; currentEmployer: string; currentPosition: string; keyQualifications: string; cvName: string; coverLetterName: string; vacancyTitle: string; vacancyId: string; appliedAt: string; status: string; }

function ApplicationsPage() {
  const [apps, setApps] = useState<ApplicationItem[]>([]);
  const [selected, setSelected] = useState<ApplicationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const d = localStorage.getItem("amharasayint_applications");
      setApps(d ? JSON.parse(d) : []);
    } catch { setApps([]); }
    setLoading(false);
  }, []);

  const updateStatus = (id: string, status: string) => {
    const updated = apps.map(a => a.id === id ? { ...a, status } : a);
    setApps(updated);
    localStorage.setItem("amharasayint_applications", JSON.stringify(updated));
  };

  const deleteApp = (id: string) => {
    if (!confirm("Delete this application?")) return;
    const updated = apps.filter(a => a.id !== id);
    setApps(updated);
    localStorage.setItem("amharasayint_applications", JSON.stringify(updated));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = apps.filter(a =>
    a.fullName.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.vacancyTitle.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Applications Management</h1><p className="text-sm text-gray-500 mt-1">{apps.length} total applications received</p></div>
        <div className="flex gap-2">
          {["Under Review", "Shortlisted", "Interviewed", "Rejected"].map(s => (
            <span key={s} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">{s}: {apps.filter(a => a.status === s).length}</span>
          ))}
        </div>
      </div>
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input placeholder="Search by name, email, or position..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
      </div>

      {selected ? (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <button onClick={() => setSelected(null)} className="text-sm text-gray-500 hover:text-gray-900 mb-4 flex items-center gap-1">← Back to list</button>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">{selected.fullName}</h3>
              <div className="space-y-2">
                {[
                  ["Email", selected.email], ["Phone", selected.phone], ["Gender", selected.gender],
                  ["Education", selected.education], ["Institution", selected.institution],
                  ["Experience", selected.experienceYears], ["Current Employer", selected.currentEmployer || "N/A"],
                  ["Current Position", selected.currentPosition || "N/A"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{k}</span><span className="text-sm font-medium text-gray-900">{v || "N/A"}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Applied For</h4>
                <p className="text-base font-bold text-[#0B3D2E]">{selected.vacancyTitle}</p>
                <p className="text-xs text-gray-500 mt-1">Applied: {new Date(selected.appliedAt).toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Key Qualifications</h4>
                <p className="text-sm text-gray-600">{selected.keyQualifications}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Documents</h4>
                <p className="text-sm text-gray-600">CV: {selected.cvName}</p>
                <p className="text-sm text-gray-600">Cover Letter: {selected.coverLetterName}</p>
              </div>
              <div className="flex gap-2">
                {["Under Review", "Shortlisted", "Interviewed", "Rejected"].map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selected.status === s ? (s === "Rejected" ? "bg-red-100 text-red-700" : "bg-[#0B3D2E] text-white") : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Applicant</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden md:table-cell">Position</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden lg:table-cell">Education</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(app => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelected(app)}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#0B3D2E] text-white flex items-center justify-center shrink-0 text-xs font-bold">{app.fullName.split(" ").map(n => n[0]).join("")}</div>
                        <div><span className="font-medium text-gray-900">{app.fullName}</span><div className="text-xs text-gray-400">{app.email}</div></div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{app.vacancyTitle}</td>
                    <td className="py-3 px-4 text-gray-500 hidden lg:table-cell">{app.education}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${app.status === "Shortlisted" || app.status === "Interviewed" ? "bg-green-50 text-green-700" : app.status === "Rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"}`}>{app.status}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4"><button onClick={(e) => { e.stopPropagation(); deleteApp(app.id); }} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm">🗑️</button></td>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-gray-400">No applications found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── SETTINGS ─── */
function SettingsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div><h1 className="text-2xl font-bold text-gray-900">Settings</h1><p className="text-sm text-gray-500 mt-1">Admin panel configuration</p></div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">System Information</h3>
        <div className="space-y-4">
          {[["Application", "Amhara Sayint Woreda Portal"], ["Version", "1.0.0"], ["Framework", "Next.js 16"], ["Storage", "JSON File Storage"]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-600">{k}</span>
              <span className="text-sm font-medium text-gray-900">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-base font-semibold text-gray-900 mb-2">Admin Access</h3>
        <p className="text-sm text-gray-500">Admin authentication is password-based. The password is configured via the <code className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs mx-1">ADMIN_PASSWORD</code> environment variable.</p>
      </div>
    </div>
  );
}

/* ─── CONTACT MESSAGES ─── */
function ContactMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => { fetch("/admin/api/contact-messages").then(r => r.json()).then(setMessages).finally(() => setLoading(false)); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/admin/api/contact-messages?id=${id}`, { method: "DELETE" });
    setMessages(messages.filter(m => m.id !== id));
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1><p className="text-sm text-gray-500 mt-1">{messages.length} messages received</p></div>
      </div>
      {messages.length === 0 ? <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-400">No messages yet. Messages from the contact form will appear here.</div> : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${msg.read ? "bg-gray-100 text-gray-500" : "bg-[#0B3D2E] text-white"}`}>
                  {msg.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 text-sm">{msg.name}</span>
                    {!msg.read && <span className="bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{msg.subject} — {msg.email}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{new Date(msg.createdAt).toLocaleDateString()}</span>
                <button onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); }} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm shrink-0">🗑️</button>
              </div>
              {expanded === msg.id && (
                <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-2">
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>📧 {msg.email}</span>
                    <span>📅 {new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">{msg.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── CONTENT MANAGER ─── */
function ContentManagerPage() {
  const [content, setContent] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [openSection, setOpenSection] = useState<string>("slides");

  useEffect(() => { fetch("/admin/api/content").then(r => r.json()).then(setContent); }, []);

  const save = async () => {
    setSaving(true);
    try {
      await fetch("/admin/api/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally { setSaving(false); }
  };

  if (!content) return <Spinner />;

  const uSlide = (i: number, k: string, v: string) => {
    const s = [...content.heroSlides];
    (s[i] as any)[k] = v;
    setContent({ ...content, heroSlides: s });
    setSaved(false);
  };
  const addSlide = () => setContent({ ...content, heroSlides: [...content.heroSlides, { image: "", title: "New Slide", subtitle: "Description" }] });
  const removeSlide = (i: number) => setContent({ ...content, heroSlides: content.heroSlides.filter((_: any, idx: number) => idx !== i) });

  const uSetting = (k: string, v: string) => {
    const s = { ...content.siteSettings };
    (s as any)[k] = v;
    setContent({ ...content, siteSettings: s });
    setSaved(false);
  };
  const uSocial = (k: string, v: string) => {
    const sl = { ...content.siteSettings.socialLinks };
    (sl as any)[k] = v;
    setContent({ ...content, siteSettings: { ...content.siteSettings, socialLinks: sl } });
    setSaved(false);
  };

  const sections = [
    { key: "slides", label: "Hero Slider Images", count: content.heroSlides?.length || 0 },
    { key: "settings", label: "Site Settings & Social Links", count: null },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Content Manager</h1><p className="text-sm text-gray-500 mt-1">Edit homepage content and site settings</p></div>
        <button onClick={save} disabled={saving} className="px-4 py-2 bg-[#EAB308] text-[#0B3D2E] text-sm font-bold rounded-lg hover:bg-[#CA8A04] transition-colors disabled:opacity-60">
          {saving ? "Saving..." : saved ? "✓ Saved!" : "💾 Save All Changes"}
        </button>
      </div>

      <div className="space-y-3">
        {sections.map((sec) => (
          <div key={sec.key} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button onClick={() => setOpenSection(openSection === sec.key ? "" : sec.key)} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-base">{sec.key === "slides" ? "🖼️" : "⚙️"}</span>
                <span className="font-semibold text-gray-900 text-sm">{sec.label}</span>
                {sec.count !== null && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{sec.count} items</span>}
              </div>
              <span className={`text-gray-400 transition-transform ${openSection === sec.key ? "rotate-180" : ""}`}>▼</span>
            </button>
            {openSection === sec.key && (
              <div className="px-4 pb-4 border-t border-gray-50">
                {sec.key === "slides" && (
                  <div className="space-y-4 mt-4">
                    {content.heroSlides?.map((slide: any, i: number) => (
                      <div key={i} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-gray-500">Slide {i + 1}</span>
                          <button onClick={() => removeSlide(i)} className="text-xs text-red-500 hover:text-red-700">Remove</button>
                        </div>
                        <div className="space-y-2">
                          <input value={slide.image} onChange={e => uSlide(i, "image", e.target.value)} placeholder="Image URL" className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
                          <input value={slide.title} onChange={e => uSlide(i, "title", e.target.value)} placeholder="Title" className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
                          <input value={slide.subtitle} onChange={e => uSlide(i, "subtitle", e.target.value)} placeholder="Subtitle" className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
                        </div>
                      </div>
                    ))}
                    <button onClick={addSlide} className="w-full py-2 border-2 border-dashed border-gray-200 rounded-xl text-sm text-gray-500 hover:text-[#0B3D2E] hover:border-[#0B3D2E] transition-colors">+ Add Slide</button>
                  </div>
                )}
                {sec.key === "settings" && (
                  <div className="space-y-4 mt-4">
                    <h4 className="text-sm font-bold text-gray-700">General Settings</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1"><label className="text-xs text-gray-500">Site Name</label><input value={content.siteSettings.siteName} onChange={e => uSetting("siteName", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
                      <div className="space-y-1"><label className="text-xs text-gray-500">Tagline</label><input value={content.siteSettings.tagline} onChange={e => uSetting("tagline", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
                      <div className="space-y-1"><label className="text-xs text-gray-500">Developer Name</label><input value={content.siteSettings.developerName} onChange={e => uSetting("developerName", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
                      <div className="space-y-1"><label className="text-xs text-gray-500">Developer Phone</label><input value={content.siteSettings.developerPhone} onChange={e => uSetting("developerPhone", e.target.value)} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
                    </div>
                    <h4 className="text-sm font-bold text-gray-700 mt-4">Social Media Links</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {Object.entries(content.siteSettings.socialLinks).map(([k, v]) => (
                        <div key={k} className="space-y-1">
                          <label className="text-xs text-gray-500 capitalize">{k}</label>
                          <input value={v} onChange={e => uSocial(k, e.target.value)} className="w-full h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── CUSTOM PAGES ─── */
interface CustomPage { id: string; title: string; slug: string; content: string; status: string; createdAt: string; }

function CustomPagesList({ nav }: { nav: (p: AdminPage) => void }) {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const load = () => { fetch("/admin/api/pages").then(r => r.json()).then(setPages).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this page?")) return;
    await fetch(`/admin/api/pages?id=${id}`, { method: "DELETE" }); load();
  };

  if (loading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Custom Pages</h1><p className="text-sm text-gray-500 mt-1">{pages.length} pages</p></div>
        <button onClick={() => nav("pages-new")} className="bg-[#EAB308] hover:bg-[#CA8A04] text-[#0B3D2E] text-sm font-semibold shadow-sm px-4 py-2 rounded-lg transition-colors">＋ Add Page</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 border-b border-gray-100">
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600 hidden md:table-cell">Slug</th>
            <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
            <th className="text-right py-3 px-4 font-semibold text-gray-600">Actions</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {pages.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-gray-900">{p.title}</td>
                <td className="py-3 px-4 text-gray-500 hidden md:table-cell font-mono text-xs">/{p.slug}</td>
                <td className="py-3 px-4"><span className={`text-xs px-2 py-0.5 rounded ${p.status === "published" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{p.status}</span></td>
                <td className="py-3 px-4 text-right">
                  <button onClick={() => { nav("pages-edit"); (window as unknown as { __adminEditId: string }).__adminEditId = p.id; }} className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-[#0B3D2E] hover:bg-gray-100 transition-colors text-sm mr-1">✏️</button>
                  <button onClick={() => handleDelete(p.id)} className="h-8 w-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm">🗑️</button>
                </td>
              </tr>
            ))}
            {pages.length === 0 && <tr><td colSpan={4} className="py-12 text-center text-gray-400">No custom pages yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomPageForm({ editId, onBack }: { editId: string | null; onBack: () => void }) {
  const [loading, setLoading] = useState(!!editId);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", content: "", status: "draft" as "published" | "draft" });

  useEffect(() => {
    if (!editId) return;
    fetch("/admin/api/pages").then(r => r.json()).then((items: CustomPage[]) => {
      const p = items.find(x => x.id === editId);
      if (p) setForm({ title: p.title, slug: p.slug, content: p.content, status: p.status });
    }).finally(() => setLoading(false));
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      await fetch("/admin/api/pages", { method: editId ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editId ? { id: editId, ...form } : form) });
      onBack();
    } catch { alert("Failed"); } finally { setSaving(false); }
  };

  if (loading) return <Spinner />;
  const u = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm">← Back</button>
        <h1 className="text-2xl font-bold text-gray-900">{editId ? "Edit" : "Add"} Custom Page</h1>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Title *</label><input value={form.title} onChange={e => { u("title", e.target.value); if (!editId) u("slug", e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")); }} placeholder="Page Title" required className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">URL Slug</label><input value={form.slug} onChange={e => u("slug", e.target.value)} placeholder="my-page-slug" className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" /></div>
          <div className="space-y-2"><label className="text-sm font-medium text-gray-700">Content</label><textarea value={form.content} onChange={e => u("content", e.target.value)} placeholder="Write your page content here..." rows={12} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E] resize-y" /></div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <p className="text-sm font-medium text-gray-700">Status</p>
            <select value={form.status} onChange={e => u("status", e.target.value)} className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-sm"><option value="draft">Draft</option><option value="published">Published</option></select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving || !form.title.trim()} className="bg-[#0B3D2E] hover:bg-[#145A44] disabled:opacity-50 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">{saving ? "Saving..." : editId ? "Save Changes" : "Create Page"}</button>
            <button type="button" onClick={onBack} className="border border-gray-200 hover:bg-gray-50 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── UPGRADED APPLICATIONS (with CV download) ─── */
interface AppItem { id: string; fullName: string; email: string; phone: string; gender: string; education: string; institution: string; experienceYears: string; currentEmployer: string; currentPosition: string; keyQualifications: string; cvName: string; cvFile: string; coverLetterName: string; coverLetterFile: string; vacancyTitle: string; vacancyId: string; appliedAt: string; status: string; }

function ApplicationsPageV2() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selected, setSelected] = useState<AppItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { fetch("/admin/api/applications-admin").then(r => r.json()).then(setApps).finally(() => setLoading(false)); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/admin/api/applications-admin", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) });
    setApps(apps.map(a => a.id === id ? { ...a, status } : a));
    if (selected?.id === id) setSelected({ ...selected, status });
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Delete this application?")) return;
    await fetch(`/admin/api/applications-admin?id=${id}`, { method: "DELETE" });
    setApps(apps.filter(a => a.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = apps.filter(a => a.fullName.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()) || a.vacancyTitle.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <Spinner />;

  const statusColor = (s: string) => s === "Shortlisted" || s === "Interviewed" ? "bg-green-50 text-green-700" : s === "Rejected" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700";

  if (selected) {
    return (
      <div className="space-y-6">
        <button onClick={() => setSelected(null)} className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1">← Back to list</button>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">{selected.fullName}</h3>
              <div className="space-y-2 text-sm">
                {[["Email", selected.email], ["Phone", selected.phone], ["Gender", selected.gender], ["Education", selected.education], ["Institution", selected.institution], ["Experience", selected.experienceYears + " years"], ["Current Employer", selected.currentEmployer || "N/A"], ["Current Position", selected.currentPosition || "N/A"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-gray-50"><span className="text-gray-500">{k}</span><span className="font-medium text-gray-900">{v || "N/A"}</span></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Applied For</h4>
                <p className="font-bold text-[#0B3D2E]">{selected.vacancyTitle}</p>
                <p className="text-xs text-gray-500 mt-1">Applied: {new Date(selected.appliedAt).toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="text-sm font-bold text-gray-700 mb-2">Key Qualifications</h4>
                <p className="text-sm text-gray-600">{selected.keyQualifications}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="text-sm font-bold text-blue-800 mb-3">📎 Documents</h4>
                {selected.cvFile && (
                  <a href={`/admin/api/download?file=${encodeURIComponent(selected.cvFile)}`} target="_blank" className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 mb-2 underline">
                    📄 CV: {selected.cvName || selected.cvFile} ↗
                  </a>
                )}
                {selected.cvName && !selected.cvFile && <p className="text-sm text-gray-500 mb-2">📄 CV: {selected.cvName}</p>}
                {selected.coverLetterFile && (
                  <a href={`/admin/api/download?file=${encodeURIComponent(selected.coverLetterFile)}`} target="_blank" className="flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900 underline">
                    📄 Cover Letter: {selected.coverLetterName || selected.coverLetterFile} ↗
                  </a>
                )}
                {selected.coverLetterName && !selected.coverLetterFile && <p className="text-sm text-gray-500">📄 Cover Letter: {selected.coverLetterName}</p>}
                {!selected.cvName && !selected.cvFile && !selected.coverLetterName && !selected.coverLetterFile && <p className="text-sm text-gray-400">No documents uploaded</p>}
              </div>
              <div className="flex flex-wrap gap-2">
                {["Under Review", "Shortlisted", "Interviewed", "Rejected"].map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selected.status === s ? (s === "Rejected" ? "bg-red-100 text-red-700" : "bg-[#0B3D2E] text-white") : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-gray-900">Applications ({apps.length})</h1><p className="text-sm text-gray-500 mt-1">Click a row to view details & download CV</p></div>
      </div>
      <div className="relative max-w-sm">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input placeholder="Search name, email, position..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-3 h-10 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D2E]/20 focus:border-[#0B3D2E]" />
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase">Applicant</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase hidden md:table-cell">Position</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase hidden lg:table-cell">CV</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-500 text-xs uppercase hidden sm:table-cell">Date</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(app => (
              <tr key={app.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setSelected(app)}>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#0B3D2E] text-white flex items-center justify-center shrink-0 text-xs font-bold">{app.fullName.split(" ").map((n: string) => n[0]).join("")}</div>
                    <div><span className="font-medium text-gray-900">{app.fullName}</span><div className="text-xs text-gray-400">{app.email}</div></div>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600 hidden md:table-cell">{app.vacancyTitle}</td>
                <td className="py-3 px-4 hidden lg:table-cell">
                  {(app.cvFile || app.cvName) ? <span className="text-xs text-blue-600 font-medium">📎 {app.cvName || "Uploaded"}</span> : <span className="text-xs text-gray-400">None</span>}
                </td>
                <td className="py-3 px-4"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(app.status)}`}>{app.status}</span></td>
                <td className="py-3 px-4 text-gray-500 hidden sm:table-cell">{new Date(app.appliedAt).toLocaleDateString()}</td>
                <td className="py-3 px-4"><button onClick={e => { e.stopPropagation(); deleteApp(app.id); }} className="h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors text-sm">🗑️</button></td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} className="py-12 text-center text-gray-400">No applications found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── VISITORS PAGE ─── */
function VisitorsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const load = useCallback((page = 1, f = "all") => {
    setLoading(true);
    fetch(`/admin/api/visitors?page=${page}&limit=50&filter=${f}`)
      .then(r => r.json())
      .then(data => { setLogs(data.logs || []); setTotal(data.total || 0); setPages(data.pages || 1); setCurrentPage(page); })
      .catch(() => { setLogs([]); setTotal(0); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(1, filter); }, [filter, load]);

  const clearLogs = async () => {
    if (!confirm("Clear all visitor logs? This cannot be undone.")) return;
    setClearing(true);
    await fetch("/admin/api/visitors", { method: "DELETE" });
    setLogs([]); setTotal(0); setPages(1); setCurrentPage(1);
    setClearing(false);
  };

  const deviceIcon = (d: string) => d === "Mobile" ? "📱" : d === "Tablet" ? "📟" : "🖥️";
  const flagEmoji = (country: string) => {
    const flags: Record<string, string> = { "Ethiopia": "🇪🇹", "United States": "🇺🇸", "United Kingdom": "🇬🇧", "Germany": "🇩🇪", "France": "🇫🇷", "Canada": "🇨🇦", "Australia": "🇦🇺", "Local": "🏠", "Unknown": "🌍" };
    return flags[country] || "🌍";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0B3D2E]">Visitor Logs</h1>
          <p className="text-sm text-gray-500 mt-0.5">Total {total.toLocaleString()} visits recorded</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Filter */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200">
            {[["all", "All"], ["new", "New"], ["returning", "Returning"]].map(([v, l]) => (
              <button key={v} onClick={() => setFilter(v)}
                className={`px-3 py-2 text-xs font-semibold transition-all ${filter === v ? "bg-[#0B3D2E] text-white" : "bg-white text-gray-500 hover:bg-gray-50"}`}>
                {l}
              </button>
            ))}
          </div>
          <button onClick={clearLogs} disabled={clearing || logs.length === 0}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 border border-red-200 transition-all disabled:opacity-40">
            {clearing ? "Clearing..." : "🗑️ Clear"}
          </button>
          <button onClick={() => load(currentPage, filter)}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#0B3D2E] text-white hover:bg-[#145A44] transition-all">
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Visits", value: total, icon: "👁️", gradient: "from-blue-50 to-indigo-50", text: "text-blue-700", border: "border-blue-100" },
          { label: "New Visitors", value: logs.filter(l => l.isNew).length, icon: "🆕", gradient: "from-emerald-50 to-green-50", text: "text-emerald-700", border: "border-emerald-100" },
          { label: "Mobile Users", value: logs.filter(l => l.device === "Mobile").length, icon: "📱", gradient: "from-purple-50 to-violet-50", text: "text-purple-700", border: "border-purple-100" },
          { label: "Countries", value: new Set(logs.map(l => l.country).filter(c => c !== "Unknown" && c !== "Local")).size, icon: "🌍", gradient: "from-amber-50 to-yellow-50", text: "text-amber-700", border: "border-amber-100" },
        ].map(s => (
          <div key={s.label} className={`bg-gradient-to-br ${s.gradient} rounded-2xl border ${s.border} p-5 flex flex-col gap-2`}>
            <div className="text-2xl">{s.icon}</div>
            <div className={`text-3xl font-black ${s.text} tabular-nums leading-none`}>{s.value.toLocaleString()}</div>
            <div className={`text-xs font-semibold uppercase tracking-wide opacity-60 ${s.text}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">Loading visitor logs...</div>
        ) : logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-gray-400">
            <span className="text-4xl mb-3">👁️</span>
            <p className="font-medium">No visits recorded yet</p>
            <p className="text-xs mt-1">Visits will appear here as people browse the website</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">#</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Page</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Device</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Browser</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log, i) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-400">{(currentPage - 1) * 50 + i + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-xs font-medium text-gray-800">{new Date(log.timestamp).toLocaleDateString()}</div>
                      <div className="text-[10px] text-gray-400">{new Date(log.timestamp).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{flagEmoji(log.country)}</span>
                        <div>
                          <div className="text-xs font-medium text-gray-800">{log.country}</div>
                          <div className="text-[10px] text-gray-400">{log.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-600 font-mono bg-gray-100 px-2 py-0.5 rounded max-w-[150px] truncate block">{log.page || "/"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm">{deviceIcon(log.device)}</span>
                      <span className="text-[10px] text-gray-400 ml-1">{log.os}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{log.browser}</td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${log.isNew ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                        {log.isNew ? "🆕 New" : "↩ Return"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => load(currentPage - 1)} disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30">← Prev</button>
          <span className="text-sm text-gray-500">Page {currentPage} of {pages}</span>
          <button onClick={() => load(currentPage + 1)} disabled={currentPage === pages}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-30">Next →</button>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN ─── */
export default function AdminPage() {
  const [page, setPage] = useState<AdminPage>("dashboard");
  const [editId, setEditId] = useState<string | null>(null);

  const nav = useCallback((p: AdminPage) => {
    if (p === "news-edit" || p === "bids-edit" || p === "vacancy-edit" || p === "pages-edit") {
      setEditId((window as unknown as { __adminEditId: string }).__adminEditId || null);
    } else {
      setEditId(null);
    }
    setPage(p);
    // close mobile sidebar
    const s = document.getElementById("admin-sidebar");
    const o = document.getElementById("sidebar-overlay");
    if (s) s.classList.add("-translate-x-full");
    if (o) o.classList.add("hidden");
  }, []);

  const handleLogout = async () => {
    await fetch("/admin/api/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar page={page} nav={nav} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => { const s = document.getElementById("admin-sidebar"); if (s) s.classList.toggle("-translate-x-full"); const o = document.getElementById("sidebar-overlay"); if (o) o.classList.toggle("hidden"); }} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600" aria-label="Toggle menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Amhara Sayint Woreda</h2>
              <p className="text-xs text-gray-400">Administration Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <form action="/admin/api/logout" method="POST"><button type="submit" className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              Logout
            </button></form>
            <a href="/" target="_blank" className="text-xs text-gray-500 hover:text-[#0B3D2E] flex items-center gap-1 transition-colors">View Website <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {page === "dashboard" && <DashboardPage nav={nav} />}
          {page === "visitors" && <VisitorsPage />}
          {page === "news" && <NewsListPage nav={nav} />}
          {page === "news-new" && <NewsForm editId={null} onBack={() => nav("news")} />}
          {page === "news-edit" && <NewsForm editId={editId} onBack={() => nav("news")} />}
          {page === "bids" && <BidsListPage nav={nav} />}
          {page === "bids-new" && <BidForm editId={null} onBack={() => nav("bids")} />}
          {page === "bids-edit" && <BidForm editId={editId} onBack={() => nav("bids")} />}
          {page === "vacancy" && <VacancyListPage nav={nav} />}
          {page === "vacancy-new" && <VacancyForm editId={null} onBack={() => nav("vacancy")} />}
          {page === "vacancy-edit" && <VacancyForm editId={editId} onBack={() => nav("vacancy")} />}
          {page === "subscribers" && <SubscribersPage />}
          {page === "menus" && <MenusPage />}
          {page === "applications" && <ApplicationsPageV2 />}
          {page === "content" && <ContentManagerPage />}
          {page === "pages" && <CustomPagesList nav={nav} />}
          {page === "pages-new" && <CustomPageForm editId={null} onBack={() => nav("pages")} />}
          {page === "pages-edit" && <CustomPageForm editId={editId} onBack={() => nav("pages")} />}
          {page === "contact-messages" && <ContactMessagesPage />}
          {page === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}