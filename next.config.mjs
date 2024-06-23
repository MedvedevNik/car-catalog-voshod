/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["test.taxivoshod.ru"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    loader: "default",
    path: "/_next/image",
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
