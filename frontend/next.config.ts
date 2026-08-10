import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    turbopack: {},
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 180,
        },
    },
};

export default nextConfig;
