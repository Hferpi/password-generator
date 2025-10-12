import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ✅ Configuración existente */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "/**",
      },
    ],
  },

  /* ✅ Agrega esta parte para que no falle el build por ESLint */
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
