/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow maplibre-gl to work properly
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'mapbox-gl': 'maplibre-gl',
    };
    return config;
  },
};

export default nextConfig;
