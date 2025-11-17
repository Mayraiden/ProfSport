import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '1337',
				pathname: '/img**',
			},
			{
				protocol: 'https',
				hostname: 'api.sbis.ru',
				pathname: '/disk/api/v1/**',
			},
		],
	},
}

export default nextConfig
