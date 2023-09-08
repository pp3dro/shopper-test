/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        NEXT_PUBLIC_APP_PRODUCT_API: 'http://localhost:3000/products'
    }
}

module.exports = nextConfig
