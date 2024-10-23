/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        // pathname: "/uniswap/**",
      },
      {
        protocol: "https",
        hostname: "static.alchemyapi.io",
        port: "",
        // pathname: "/uniswap/**",
      },
      {
        protocol: "https",
        hostname: "static.debank.com",
        port: "",
        // pathname: "/uniswap/**",
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
        // pathname: "/uniswap/**",
      },
    ],
  },
};

export default nextConfig;
