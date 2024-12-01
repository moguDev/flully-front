import withPWA from "next-pwa";
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    minimumCacheTTL: 86400,
    unoptimized: true,
    domains: ["s3.ap-northeast-1.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);