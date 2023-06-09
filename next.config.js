/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: '**.githubusercontent.com'
            }
        ]
    }
}

module.exports = nextConfig
