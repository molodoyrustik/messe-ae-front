import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable compression for better performance
  compress: true,
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'lovely-idea-e9a72cf425.strapiapp.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lovely-idea-e9a72cf425.media.strapiapp.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'steadfast-beauty-abdbb5f016.media.strapiapp.com',
        pathname: '/**',
      },
    ],
  },
  
  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              name: 'vendors',
              priority: 20,
            },
            mui: {
              test: /[\\/]node_modules[\\/]@mui[\\/]/,
              chunks: 'all',
              name: 'mui',
              priority: 30,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
