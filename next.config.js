/** @type {import('next').NextConfig} */

const nextConfig = {
  /// Must uncomment this if using dockerfile
  // output: 'standalone',

  images: {
    formats: ['image/webp', 'image/avif'],
  },
}

if (process.env.REMOVE_LOGS === 'true') {
  nextConfig.compiler = {
    removeConsole: {
      exclude: ['error'],
    },
  }
}

module.exports = nextConfig
