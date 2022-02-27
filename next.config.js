/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HTTP_ONLY: false,
  },
  async rewrites() {
    return [
      {
        destination: 'https://krawl-backend.herokuapp.com/:path*',
        source: '/api/:path*',
      },
    ];
  }
}

module.exports = nextConfig
