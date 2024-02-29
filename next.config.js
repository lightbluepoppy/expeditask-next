/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  future: {
    webpack5: true,
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
