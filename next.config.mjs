/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['tr', 'en'],
        defaultLocale: 'tr',
    },
    images: {
        domains: ['assets.hyperteknoloji.com'],
    },
};

export default nextConfig;