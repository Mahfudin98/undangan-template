import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      // {
      //   protocol: "https",
      //   hostname: "invitation.lsskincare.id", // ← uncomment ini
      // },
      // {
      //   protocol: "http",
      //   hostname: "localhost", // ← untuk dev
      // },
    ],
  },
};

export default nextConfig;
