/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- This enables Static Export
  
  // Note: Standard Next.js Image Optimization won't work with static export 
  // unless you use a third-party loader (like Cloudinary) or disable it:
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;