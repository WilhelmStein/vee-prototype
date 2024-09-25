/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/grants",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
