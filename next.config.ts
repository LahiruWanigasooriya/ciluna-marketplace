import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables React Strict Mode
  swcMinify: true, // Enables SWC compiler for minification
  webpack: (config, { isServer }) => {
    // Prevent bundling server-side modules in the client build
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Ignore 'fs' module
        path: false, // Ignore 'path' module
      };
    }
    return config;
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cloudinary domain
      },
      {
        protocol: "https",
        hostname: "example.com",
      },

      {
        protocol: "https",
        hostname: "http://localhost:3000", // Add the external domain you're using
      },
      {
        protocol: "https",
        hostname: "http://localhost:3001", // Add the external domain you're using
      },
      {
        protocol: "https",
        hostname: "anotherdomain.com", // Add another domain if needed
      },
    ],
  },
};

export default nextConfig;
