import { MetadataRoute } from "next";

const BASE_URL = "https://amhara-sayint-woreda.onrender.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    // Core pages — highest priority
    { path: "/", priority: 1.0, changeFreq: "daily" as const },
    { path: "/?page=about-overview", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/?page=about-history", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/?page=about-location", priority: 0.8, changeFreq: "monthly" as const },

    // Government
    { path: "/?page=gov-leadership", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/?page=gov-structure", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/?page=gov-offices", priority: 0.8, changeFreq: "monthly" as const },

    // Services — high value for search
    { path: "/?page=svc-education", priority: 0.85, changeFreq: "monthly" as const },
    { path: "/?page=svc-health", priority: 0.85, changeFreq: "monthly" as const },
    { path: "/?page=svc-agriculture", priority: 0.85, changeFreq: "monthly" as const },
    { path: "/?page=svc-transport", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/?page=svc-water", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/?page=svc-justice", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/?page=svc-finance", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/?page=svc-trade", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/?page=svc-technology", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/?page=svc-construction", priority: 0.8, changeFreq: "monthly" as const },

    // High-traffic pages — jobs, bids, news
    { path: "/?page=vacancy", priority: 0.95, changeFreq: "daily" as const },
    { path: "/?page=bids", priority: 0.95, changeFreq: "daily" as const },
    { path: "/?page=news-news", priority: 0.95, changeFreq: "daily" as const },
    { path: "/?page=news-announcements", priority: 0.9, changeFreq: "daily" as const },

    // Other
    { path: "/?page=gallery", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/?page=contact", priority: 0.7, changeFreq: "monthly" as const },
  ];

  return pages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));
}
