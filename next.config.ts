import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose', 'bcryptjs'],
  turbopack: {},
  webpack: (config) => {
    config.externals.push({
      'mongoose': 'commonjs mongoose',
      'bcryptjs': 'commonjs bcryptjs',
    });
    return config;
  },
};

export default nextConfig;
