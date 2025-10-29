/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    swcMinify: true,
    experimental: {
        forceSwcTransforms: true
    }
};

export default nextConfig;
