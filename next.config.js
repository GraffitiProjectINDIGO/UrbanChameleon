const withTM = require('next-transpile-modules')(['react-leaflet-cluster']);
const webpack = require('webpack');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  compiler: {
    styledComponents: true,
  },

  /* webpack: (config) => {
    // Resium specific configuration
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('cesium'),
      }),
    );

    config.resolve.fallback = { fs: false };

    return config;
  },*/
};

module.exports = withTM(nextConfig);
