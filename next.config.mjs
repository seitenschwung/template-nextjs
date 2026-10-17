/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  // The container's root filesystem is read-only, so no image-optimizer cache.
  images: { unoptimized: true },
};

export default nextConfig;
