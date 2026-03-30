import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
  remotePatterns:[
    {
      protocol:'https',
      hostname:'*'
    }
  ]
 },
 experimental: {
    serverActions: {
      bodySizeLimit: "100mb", // 👈 increase limit
    },
  },
};

export default nextConfig;
