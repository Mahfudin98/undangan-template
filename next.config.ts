import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // domains: [
    //   "lh3.googleusercontent.com",
    //   "invitation.lsskincare.id", // ✅ tambahkan domain production
    //   "localhost", // ✅ untuk dev
    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
