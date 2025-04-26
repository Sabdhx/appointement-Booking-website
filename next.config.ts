import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [
    
      // If you need to support HTTP as well (not recommended for production)
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      }
    ],
  }
};

export default nextConfig;