/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  transpilePackages: ['react-syntax-highlighter', "umb-tiptap", "ui"],
  images: {
    loader: 'custom',
    loaderFile: './src/utils/image-loader.ts',
    remotePatterns: [{
      protocol: "https",
      hostname: "localhost",
      port: '44362',
    }]
  }
};

module.exports = nextConfig;
