import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    // keep minimal; app router is default in Next 16
  },
}

export default nextConfig
