import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "arial"],
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  fallback: ["monospace"],
  preload: false,
});

/* ── Site constants ──────────────────────────────────────────── */
const SITE_URL = "https://amhara-sint-woreda.onrender.com";
const SITE_NAME = "Amhara Sint Woreda Administration";
const OG_IMAGE = "https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg";

/* ── Viewport ────────────────────────────────────────────────── */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B3D2E" },
    { media: "(prefers-color-scheme: dark)", color: "#0B3D2E" },
  ],
};

/* ── Full SEO Metadata ───────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Amhara Sint Woreda | Official Government Portal — South Wollo, Ethiopia",
    template: "%s | Amhara Sint Woreda",
  },

  description:
    "Official government portal for Amhara Sint (Sayint) Woreda, South Wollo Zone, Amhara Region, Ethiopia. Find news, job vacancies, bids & tenders, public services, development statistics, health, education, agriculture, and administrative information.",

  keywords: [
    // Core identity
    "Amhara Sint Woreda",
    "Sayint Woreda",
    "Sint Woreda",
    "Amhara Sayint",
    "Mehal Sayint",
    "Ajibar",
    // Location
    "South Wollo Zone",
    "Amhara Region",
    "Ethiopia government",
    "Amhara Region administration",
    "Ethiopia woreda",
    // Services people search for
    "woreda job vacancies Ethiopia",
    "government jobs South Wollo",
    "bid tenders Ethiopia woreda",
    "Ethiopia public tender",
    "Ethiopia government services",
    // Development & news
    "Amhara Sint news",
    "South Wollo development",
    "Ethiopia highland development",
    "Tadbaba Maryam monastery",
    "Mount Tabor Ethiopia",
    "Blue Nile canyon Ethiopia",
    "Borena Sayint National Park",
    // Language variants
    "ሳይንት ወረዳ",
    "አምሐራ ሳይንት",
    "ደቡብ ወሎ",
  ],

  authors: [
    { name: "Meseret Akalu", url: "https://www.linkedin.com/in/meseret-akalu-76363121b/" },
    { name: "Amhara Sint Woreda Administration" },
  ],

  creator: "Meseret Akalu",
  publisher: "Amhara Sint Woreda Administration",

  category: "Government",

  classification: "Government / Public Administration",

  /* ── Canonical & Alternates ─────────────────────────────────── */
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-US": SITE_URL,
      "am-ET": SITE_URL,
    },
  },

  /* ── Open Graph (Facebook, WhatsApp, Telegram sharing) ──────── */
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["am_ET"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Amhara Sint Woreda | Official Government Portal",
    description:
      "Official portal for Amhara Sint (Sayint) Woreda, South Wollo, Ethiopia. News, vacancies, bids, public services, development statistics and government information.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Amhara Sint Woreda — The highlands of South Wollo, Ethiopia",
        type: "image/jpeg",
      },
      {
        url: "https://sfile.chatglm.cn/images-ppt/5d712c5b8f44.jpg",
        width: 1200,
        height: 630,
        alt: "Welcome to Amhara Sint Woreda",
        type: "image/jpeg",
      },
    ],
  },

  /* ── Twitter / X Card ───────────────────────────────────────── */
  twitter: {
    card: "summary_large_image",
    site: "@AmharaSint",
    creator: "@MeseretAkalu",
    title: "Amhara Sint Woreda | Official Government Portal",
    description:
      "Official government portal for Amhara Sint Woreda, South Wollo Zone, Ethiopia. News, vacancies, bids, and public services.",
    images: [OG_IMAGE],
  },

  /* ── Icons ──────────────────────────────────────────────────── */
  icons: {
    icon: [
      { url: "/logo-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-64.png", sizes: "64x64", type: "image/png" },
      { url: "/logo.png", sizes: "any" },
    ],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/logo.png",
  },

  /* ── Manifest (PWA) ─────────────────────────────────────────── */
  manifest: "/manifest.json",

  /* ── Robots ─────────────────────────────────────────────────── */
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  /* ── Verification (add your actual codes after verification) ── */
  verification: {
    google: "google-site-verification-add-your-code-here",
    // yandex: "yandex-verification-code",
  },

  /* ── App info ───────────────────────────────────────────────── */
  applicationName: "Amhara Sint Woreda Portal",
  referrer: "origin-when-cross-origin",
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/* ── JSON-LD Structured Data ─────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "GovernmentOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Amhara Sint Woreda Administration",
      alternateName: ["Sayint Woreda", "Sint Woreda", "Amhara Sayint Woreda"],
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      image: OG_IMAGE,
      description:
        "Official government administration for Amhara Sint Woreda, South Wollo Zone, Amhara Region, Ethiopia. Serving 144,972 residents across 37 kebeles.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ajibar",
        addressRegion: "South Wollo Zone, Amhara Region",
        addressCountry: "ET",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Amhara Sint Woreda",
        geo: {
          "@type": "GeoShape",
          description: "Amhara Sint Woreda, South Wollo Zone, Amhara Region, Ethiopia",
        },
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+251-33-440-1000",
          contactType: "customer service",
          areaServed: "ET",
          availableLanguage: ["Amharic", "English"],
        },
      ],
      sameAs: [
        "https://www.facebook.com/100066823706013",
        "https://www.youtube.com/@AmharaSint",
        "https://t.me/AmharaSint",
        "https://www.linkedin.com/in/meseret-akalu-76363121b/",
      ],
      numberOfEmployees: {
        "@type": "QuantitativeValue",
        value: 500,
      },
      foundingDate: "1995",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Amhara Sint Woreda Official Portal",
      description:
        "Official government portal for Amhara Sint Woreda — news, vacancies, bids, services, and community information.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: ["en-US", "am-ET"],
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Amhara Sint Woreda | Official Government Portal",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      description:
        "Official government portal for Amhara Sint Woreda, South Wollo Zone, Amhara Region, Ethiopia.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_URL,
          },
        ],
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      inLanguage: "en-US",
      potentialAction: {
        "@type": "ReadAction",
        target: [SITE_URL],
      },
    },
    {
      "@type": "Place",
      name: "Amhara Sint Woreda",
      alternateName: "Sayint Woreda",
      description:
        "Amhara Sint Woreda is located in South Wollo Zone, Amhara Region, Ethiopia. It covers 1,437 km² and has a population of 144,972 people across 37 kebeles.",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 10.95,
        longitude: 38.93,
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "South Wollo Zone, Amhara Region, Ethiopia",
      },
      hasMap: "https://maps.google.com/?q=Amhara+Sint+Woreda+Ethiopia",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external image CDN for faster loading */}
        <link rel="preconnect" href="https://sfile.chatglm.cn" />
        <link rel="preconnect" href="https://ui-avatars.com" />
        <link rel="dns-prefetch" href="https://sfile.chatglm.cn" />
        {/* Geo meta tags */}
        <meta name="geo.region" content="ET-AM" />
        <meta name="geo.placename" content="Amhara Sint Woreda, South Wollo, Ethiopia" />
        <meta name="geo.position" content="10.95;38.93" />
        <meta name="ICBM" content="10.95, 38.93" />
        {/* Language */}
        <meta httpEquiv="content-language" content="en, am" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
