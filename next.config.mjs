/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbo optimization
  turbo: {},

  // Redirects to prevent 404s after URL migration
  async redirects() {
    return [
      { source: '/admin', destination: '/dashboard/admin', permanent: true },
      { source: '/doctor', destination: '/dashboard/doctor', permanent: true },
      { source: '/pharmacy', destination: '/dashboard/pharmacy', permanent: true },
      { source: '/clinic', destination: '/dashboard/clinic', permanent: true },
      { source: '/patient', destination: '/dashboard/patient', permanent: true },
      { source: '/admin/:path*', destination: '/dashboard/admin/:path*', permanent: true },
      { source: '/doctor/:path*', destination: '/dashboard/doctor/:path*', permanent: true },
    ]
  }
};

export default nextConfig;
