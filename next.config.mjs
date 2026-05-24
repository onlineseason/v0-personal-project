/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Cloudflare Pages compatibility
  experimental: {
    isrMemoryCacheSize: 0,
  },
  // Required for Cloudflare Pages
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ],
}

export default nextConfig
