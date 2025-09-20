import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn']
    }
  },
  eslint: {
    ignoreDuringBuilds: false
  },
  poweredByHeader: false
};

export default withBundleAnalyzer(nextConfig);
