/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://krawl-backend.herokuapp.com/:path*`,
      },
      {
        source: '/home',
        destination: '/1',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/1', // Matched parameters can be used in the destination
        permanent: false,
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
