import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  // publicRuntimeConfig: {
  //   NEXT_PUBLIC_LINK_DEMO_APP: process.env.NEXT_PUBLIC_LINK_DEMO_APP,
  //   NEXT_PUBLIC_LINK: process.env.NEXT_PUBLIC_LINK
  // }
};

export default withNextIntl(nextConfig);