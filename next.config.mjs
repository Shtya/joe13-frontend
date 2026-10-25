import withNextIntl from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production';

const securityHeaders = [
    // CSP only in production: dev needs http://localhost:8081 and the HMR websocket.
    ...(isProd ? [{ key: 'Content-Security-Policy', value: "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval';" }] : []),
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
];

const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000,
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8081',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'back.joe13th.com',
                pathname: '/uploads/**',
            },
        ],
    },
    async headers() {
        return [{ source: '/:path*', headers: securityHeaders }];
    },
};
export default withNextIntl('./il8n.js')(nextConfig);
