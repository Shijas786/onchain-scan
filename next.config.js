/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: false,
      encoding: false,
      'pino-pretty': false
    };
    
    // Resolve the nested @wagmi/connectors to use the root one
    config.resolve.alias = {
      ...config.resolve.alias,
      '@wagmi/connectors': require.resolve('@wagmi/connectors'),
    };
    
    // Ignore the porto/internal import that doesn't exist in wagmi v2
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'porto/internal': false,
      };
    }
    
    return config;
  }
};

module.exports = nextConfig;
