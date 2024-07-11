/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "1337",
          pathname: "/uploads/**/*",
        },
        {
          protocol: "https",
          hostname: "placehold.co",
        },
        {
          protocol: "https",
          hostname: "smart-chicken-8b603436b1.media.strapiapp.com",
        },
      ],
    },
  };
  
  export default nextConfig;