import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Enable compression for better performance
  compress: true,
  
  // Partytown configuration
  async headers() {
    return [
      {
        source: '/~partytown/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
      // Allow cross-origin requests for third-party scripts
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
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
            // Separate heavy animation library
            framer: {
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              chunks: 'all',
              name: 'framer',
              priority: 50,
            },
            // Separate markdown processing libraries
            markdown: {
              test: /[\\/]node_modules[\\/](react-markdown|remark-gfm|unified|mdast|micromark)[\\/]/,
              chunks: 'all',
              name: 'markdown',
              priority: 45,
            },
            // Separate CSS-in-JS libraries
            emotion: {
              test: /[\\/]node_modules[\\/]@emotion[\\/]/,
              chunks: 'all',
              name: 'emotion',
              priority: 40,
            },
            // Separate data fetching libraries
            tanstack: {
              test: /[\\/]node_modules[\\/]@tanstack[\\/]/,
              chunks: 'all',
              name: 'tanstack',
              priority: 35,
            },
            // MUI Icons (heaviest part, used less frequently)
            muiIcons: {
              test: /[\\/]node_modules[\\/]@mui[\\/]icons-material[\\/]/,
              chunks: 'all',
              name: 'mui-icons',
              priority: 35,
            },
            // MUI System (theme, sx prop, styling utilities)
            muiSystem: {
              test: /[\\/]node_modules[\\/]@mui[\\/](system|styled-engine|utils|base)[\\/]/,
              chunks: 'all',
              name: 'mui-system',
              priority: 32,
            },
            // MUI Core Components (most commonly used)
            muiCore: {
              test: /[\\/]node_modules[\\/]@mui[\\/]material[\\/]/,
              chunks: 'all',
              name: 'mui-core',
              priority: 30,
            },
            // Partytown (heavy web worker library)
            partytown: {
              test: /[\\/]node_modules[\\/]@qwik\.dev[\\/]partytown[\\/]/,
              chunks: 'all', 
              name: 'partytown',
              priority: 25,
            },
            // React libraries
            react: {
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              chunks: 'all',
              name: 'react',
              priority: 25,
            },
            // Remaining vendor libraries (much smaller now)
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              name: 'vendors',
              priority: 20,
            },
          },
        },
      };
    }
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
