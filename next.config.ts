import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: false,
  compress: true,
  poweredByHeader: false,

  // Aggressive HTTP caching for static assets
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
        ],
      },
      {
        source: '/(:path*\\.png|:path*\\.jpg|:path*\\.jpeg|:path*\\.svg|:path*\\.ico|:path*\\.webp)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        // Cache all public read API responses for 60 seconds at CDN edge
        source: '/api/(bids|vacancies|news|seed)',
        headers: [{ key: 'Cache-Control', value: 's-maxage=60, stale-while-revalidate=300' }],
      },
      {
        // Cache admin read-only data for 30 seconds
        source: '/api/admin/(sliders|cabinet-members|projects|hotels|announcements|site-images|site-settings)',
        headers: [{ key: 'Cache-Control', value: 's-maxage=30, stale-while-revalidate=120' }],
      },
    ]
  },

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Bundle optimizations
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@radix-ui/react-dialog',
      '@radix-ui/react-select',
      '@radix-ui/react-dropdown-menu',
      'recharts',
    ],
  },
};

export default nextConfig;
