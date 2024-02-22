/** @type {import('next').NextConfig} */
const nextConfig = {

  // Redirect to registration page as default
  async redirects() {
    return [
      {
        source: "/",
        destination: "/register",
        permanent: true, // cache
      },
    ];
  },
};

export default nextConfig;
