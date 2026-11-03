import withNextIntl from 'next-intl/plugin';

const isProd = process.env.NODE_ENV === 'production';

// Keep in sync with deploy/nginx/security-headers.conf: nginx serves cached
// pages itself, so these only reach visitors on a cache miss.
const CSP = [
    "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self' https:",
    'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
    // CSP only in production: dev needs http://localhost:8081 and the HMR websocket.
    ...(isProd ? [{ key: 'Content-Security-Policy', value: CSP }] : []),
    { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
];

const nextConfig = {
    poweredByHeader: false,
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
