/** @type {import('next').NextConfig} */
// const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
const nonce = "jFdJouinWvtez3LI";
const cspHeader = `
        script-src 'self' 'unsafe-inline' ${
			process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
		};
        img-src 'self' blob: data:;
    `;

const nextConfig = {
	reactStrictMode: false,
	output: "standalone",
	async headers() {
		return [
			{
				// matching all API routes
				source: "/(.*)",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: `*`,
					},
					{
						key: "Access-Control-Allow-Headers",
						value: `*`,
					},
					{
						key: "Access-Control-Allow-Header",
						value: `*`,
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=63072000; includeSubDomains; preload",
					},
					{
						key: "Referrer-Policy",
						value: "origin-when-cross-origin",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
					},
					{
						key: "Content-Security-Policy",
						value: cspHeader.replace(/\n/g, ""),
					},
				],
			},
		];
	},
};

export default nextConfig;
