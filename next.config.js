const withTM = require('next-transpile-modules')(['react-leaflet-cluster']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  compiler: {
    styledComponents: true,
  },

  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = withTM(nextConfig);
