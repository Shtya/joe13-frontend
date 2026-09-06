import withNextIntl from 'next-intl/plugin';

const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8095',
                pathname: '/uploads/**',
            },
            {
                protocol: 'https',
                hostname: 'back.joe13th.com',
                pathname: '/uploads/**',
            },
        ],
    },
};
export default withNextIntl('./il8n.js')(nextConfig);
