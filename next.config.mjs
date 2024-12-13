/** @type {import('next').NextConfig} */
// const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

import nextSafe from "next-safe";
const isDev = process.env.NODE_ENV !== "production";

const nextConfig = {
	reactStrictMode: false,
	output: "standalone",
	async headers() {
		const securityHeaders = nextSafe({ isDev });
		return [
			{
				source: "/(.*)",
				headers: [
					...securityHeaders,
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,POST,PUT,DELETE,OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "Content-Type, Authorization",
					},
				],
			},
		];
	},
};

export default nextConfig;
