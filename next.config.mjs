/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https",
  //       hostname: "raw.githubusercontent.com",
  //       port: "",
  //       pathname: "/uniswap/**",
  //     },
  //   ],
  // },
};

export default nextConfig;
