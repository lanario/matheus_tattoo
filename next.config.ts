import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Configuração para permitir carregamento e otimização de imagens de CDNs externas futuras
    /*
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com", // Exemplo: Bucket S3
        port: "",
        pathname: "/seu-bucket/**",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com", // Exemplo: CDN do Instagram
      }
    ]
    */
  }
};

export default nextConfig;
