/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "i.annihil.us",
        port: "",
      },
    ],
  },
};

export default nextConfig;
