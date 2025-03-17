/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 빌드 중 ESLint 오류 무시
  },
  images: {
    domains: ["localhost", "*", "file.koreafilm.or.kr"],
  },
  reactStrictMode: true,
};

export default nextConfig;
