import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/api/"],
      },
      {
        // Let Google Images crawl all images
        userAgent: "Googlebot-Image",
        allow: "/",
      },
    ],
    sitemap: "https://amhara-sint-woreda.onrender.com/sitemap.xml",
    host: "https://amhara-sint-woreda.onrender.com",
  };
}
