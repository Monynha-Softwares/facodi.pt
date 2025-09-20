import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true
  },
  images: {
    formats: ['image/avif', 'image/webp']
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false
  }
}

export default withBundleAnalyzer(nextConfig)
