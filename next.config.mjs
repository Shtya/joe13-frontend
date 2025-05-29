import withNextIntl from "next-intl/plugin";

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
        protocol: 'http',
        hostname: '146.190.169.246',
        port: '8085',
        pathname: '/uploads/**',
      },
    ],
    domains: ["backend.joe13th.com" ],
  },
};
export default withNextIntl("./il8n.js")(nextConfig);
