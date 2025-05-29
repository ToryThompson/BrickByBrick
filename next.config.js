/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  // basePath: process.env.NODE_ENV === 'production' ? '/BrickByBrick' : '',
  
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  
  // Ensure proper handling of client-side features
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimize font loading
  optimizeFonts: true,
  
  // Ensure proper handling of client-side navigation
  experimental: {
    scrollRestoration: true,
  },
};

module.exports = nextConfig; 