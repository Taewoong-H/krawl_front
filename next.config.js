/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    HTTP_ONLY: false,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://krawl-backend.herokuapp.com/:path*',
      },
    ];
  }
}

module.exports = nextConfig
