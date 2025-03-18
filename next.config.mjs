/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/version-test/api/:path*',
        destination: 'https://controle-bc.bubbleapps.io/version-test/api/:path*',
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/version-test/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://burgers-culture.tenhopedido.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
        ],
      },
    ]
  },
}

export default nextConfig

