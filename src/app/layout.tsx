import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/error-boundary";
import SeoContent from "@/components/seo-content";

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
    // Primary search terms — exactly what people type
    "Amhara Sint",
    "Amhara Saint",
    "Sint Ethiopia",
    "Saint Ethiopia",
    "Sayint",
    "Amhara Sayint",
    "Amhara Sint Woreda",
    "Sayint Woreda",
    "Sint Woreda",

    // Town names
    "Ajibar",
    "Ajibar Ethiopia",
    "Ajibar town",
    "Mehal Sayint",
    "Mehal Sayint Ethiopia",

    // Famous landmark — very searchable
    "Tadbaba Maryam",
    "Tadbaba Maryam monastery",
    "Tadbaba Maryam Ethiopia",
    "Tadbaba Maryam church",
    "Tadbabe Maryam",
    "Tadbaba Mary",
    "Debre Tsige Tadbaba Maryam",

    // Tourism & geography
    "Mount Tabor Ethiopia",
    "Tabor mountain South Wollo",
    "Blue Nile canyon Ethiopia",
    "Abay canyon Amhara",
    "Borena Sayint National Park",
    "Borena Sayint park",
    "Ethiopian highland tourism",

    // Location searches
    "South Wollo",
    "South Wollo Zone",
    "South Wollo Ethiopia",
    "Wollo Ethiopia",
    "Wollo region",
    "Amhara Region",
    "Amhara Region Ethiopia",
    "Amhara government",

    // Government & services
    "Ethiopia woreda",
    "woreda administration Ethiopia",
    "Ethiopia government portal",
    "Ethiopia government services",
    "government jobs South Wollo",
    "Ethiopia job vacancies",
    "woreda vacancies Ethiopia",
    "Ethiopia public tender",
    "Ethiopia bid tender",
    "South Wollo development",

    // History & culture
    "Emperor Tewodros mother Ethiopia",
    "Atitegeb Wondbewossen",
    "Battle Wayna Daga",
    "Ethiopian Orthodox monastery",
    "Ethiopia historical sites",
    "Amhara culture",
    "Ethiopian heritage site",

    // Amharic language keywords
    "ሳይንት",
    "ሳይንት ወረዳ",
    "አምሐራ ሳይንት",
    "ደቡብ ወሎ",
    "ጣዕባ ማርያም",
    "አጅባር",
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
      alternateName: ["Sayint Woreda", "Sint Woreda", "Amhara Sayint", "Mehal Sayint"],
      description:
        "Amhara Sint Woreda is located in South Wollo Zone, Amhara Region, Ethiopia. It covers 1,437 km² and has a population of 144,972 people across 37 kebeles. The woreda is home to Tadbaba Maryam monastery, Mount Tabor (4,247m), and the spectacular Blue Nile canyon.",
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
    {
      "@type": "LandmarksOrHistoricalBuildings",
      name: "Tadbaba Maryam Monastery",
      alternateName: ["Tadbabe Maryam", "Debre Tsige Tadbaba Maryam", "Tadbaba Mary"],
      description:
        "One of the most historically significant Ethiopian Orthodox monasteries in Ethiopia, founded during the reign of Emperor Menelik I. Located 28 km from Ajibar town in Amhara Sint Woreda, South Wollo Zone. Houses sacred relics, ancient manuscripts, and royal crowns. The monastery played a key role in the Battle of Wayna Daga (1543).",
      geo: {
        "@type": "GeoCoordinates",
        latitude: 11.114074,
        longitude: 38.753427,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "28 km from Ajibar",
        addressRegion: "South Wollo Zone, Amhara Region",
        addressCountry: "ET",
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Amhara Sint Woreda, South Wollo Zone, Ethiopia",
      },
      url: SITE_URL,
      image: "https://sfile.chatglm.cn/images-ppt/10cf906e32cf.jpg",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Where is Amhara Sint (Sayint) Woreda located?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Amhara Sint Woreda (also called Sayint Woreda) is located in South Wollo Zone, Amhara Region, Ethiopia. The woreda capital is Ajibar town. It covers 1,437 km² and borders the Blue Nile (Abay) canyon to the west.",
          },
        },
        {
          "@type": "Question",
          name: "What is Tadbaba Maryam?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tadbaba Maryam (also spelled Tadbabe Maryam) is a famous Ethiopian Orthodox monastery in Amhara Sint Woreda, South Wollo, Ethiopia. It was founded during the reign of Emperor Menelik I and is one of the most historically important monasteries in Ethiopia, housing ancient manuscripts and royal crowns.",
          },
        },
        {
          "@type": "Question",
          name: "What is the population of Amhara Sint Woreda?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Amhara Sint Woreda has a population of 144,972 people across 37 kebeles (CSA 2007 census). 99.96% are Amhara (Amharic speaking) and 98% practice Ethiopian Orthodox Tewahedo Christianity.",
          },
        },
        {
          "@type": "Question",
          name: "What is the highest mountain in South Wollo Zone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Mount Tabor (Tabor Terara) at 4,247 meters above sea level is the highest peak in South Wollo Zone. It lies on the border of Amhara Sint Woreda and Legambo Woreda, approximately 170 km east of Dessie.",
          },
        },
        {
          "@type": "Question",
          name: "How can I find job vacancies in Amhara Sint Woreda?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Current job vacancies and government employment opportunities in Amhara Sint Woreda are published on this official portal. Visit the Vacancy section at amhara-sint-woreda.onrender.com for all open positions.",
          },
        },
      ],
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
        {!isAdmin && <SeoContent />}
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
