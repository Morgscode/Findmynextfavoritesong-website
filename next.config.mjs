/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:  "i.scdn.co",
      },
    ],
  },
};

export default nextConfig;
