/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  async rewrites() {
    return [
      {
        source: '/discuss',
        destination: '/',
      },
      {
        source: '/bug',
        destination: '/',
      },
      {
        source: '/news',
        destination: '/',
      },
    ]
  },
}

module.exports = nextConfig
