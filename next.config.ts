import path from 'node:path';
import type {NextConfig} from 'next';
import { fileURLToPath } from 'node:url';

const configRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
    ],
  },
  output: 'standalone',
  outputFileTracingRoot: configRoot,
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // Allow HMR to be disabled in constrained editing environments.
    // File watching can be turned off to avoid rebuild loops during automated edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
