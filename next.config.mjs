/** @type {import('next').NextConfig} */
const nextConfig = {
  // Redirects to prevent 404s after URL migration
  async redirects() {
    return [
      { source: '/admin', destination: '/dashboard/admin', permanent: true },
      { source: '/doctor', destination: '/dashboard/doctor', permanent: true },
      { source: '/pharmacy', destination: '/dashboard/pharmacy', permanent: true },
      { source: '/clinic', destination: '/dashboard/clinic', permanent: true },
      { source: '/patient', destination: '/dashboard/patient', permanent: true },
    ]
  }
};

export default nextConfig;
