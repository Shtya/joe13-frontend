import withNextIntl from 'next-intl/plugin';

const nextConfig = {
    images: {
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
};
export default withNextIntl('./il8n.js')(nextConfig);
