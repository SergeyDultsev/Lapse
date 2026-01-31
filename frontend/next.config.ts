import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpackDevMiddleware: (config) => {
        config.watchOptions = {
            poll: 2000,
            aggregateTimeout: 300,
        };
        return config;
    },
};

export default nextConfig;
