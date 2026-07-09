import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/error-boundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amhara Sint Woreda - Official Portal",
  description:
    "Official portal for Amhara Sint Woreda, South Wollo Zone, Amhara Region, Ethiopia. Explore news, services, bids, vacancies, development statistics, and government information.",
  keywords: [
    "Amhara Sint",
    "Woreda",
    "South Wollo",
    "Amhara",
    "Ethiopia",
    "Woreda Administration",
    "Government",
    "News",
    "Vacancies",
    "Bids",
    "Tenders",
    "Development",
    "Statistics",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Amhara Sint Woreda - Official Portal",
    description:
      "Official portal for Amhara Sint Woreda, South Wollo Zone, Amhara Region, Ethiopia. Explore news, services, and government information.",
    type: "website",
    locale: "en_US",
    siteName: "Amhara Sint Woreda",
    images: [
      {
        url: "https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg",
        width: 1200,
        height: 630,
        alt: "Amhara Sint Woreda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amhara Sint Woreda - Official Portal",
    description:
      "Official portal for Amhara Sint Woreda, South Wollo Zone, Amhara Region, Ethiopia.",
    images: ["https://sfile.chatglm.cn/images-ppt/d57be5c1e89d.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}