const nextConfig = {
  poweredByHeader: false,
  transpilePackages: ['react-syntax-highlighter'],
  images: {
    loader: 'custom',
    loaderFile: './src/utils/image-loader.ts',
    remotePatterns: [{
      protocol: "https",
      hostname: "localhost",
      port: '44362',
    }]
  }
}

export default nextConfig
