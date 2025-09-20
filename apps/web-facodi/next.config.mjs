/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  transpilePackages: [
    "@monynha/ui",
    "@monynha/config",
    "@monynha/i18n",
    "@monynha/supabase",
    "@monynha/env",
  ],
};

export default nextConfig;
