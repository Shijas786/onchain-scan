/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Disable turbopack for now as it has issues with some Web3 libraries
    experimental: {
        turbo: false,
    },
    webpack: (config, { isServer }) => {
        // Only apply these settings for client-side bundles
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
            };

            // Externalize problematic packages
            config.externals.push('pino-pretty', 'lokijs', 'encoding');
        }

        return config;
    },
};

module.exports = nextConfig;
