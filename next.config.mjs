/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self' *.kalbe.co.id kalbe.co.id *.bintang7.com;
    script-src http://b7-cam-dev-cam-micro.apps.alpha.kalbe.co.id *.kalbe.co.id kalbe.co.id *.bintang7.com 'nonce-403rHDzb5M1eDsnb';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
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
