import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    RAZORPAY_KEY: process.env.RAZORPAY_KEY,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
  },
  reactCompiler: true,
};

export default nextConfig;
