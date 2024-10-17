import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
	const nonce = "jFdJouinWvtez3LI";
	const cspHeader = `
        script-src 'self' 'unsafe-inline' ${
			process.env.NODE_ENV === "production" ? "" : `'unsafe-eval'`
		};
        img-src 'self' blob: data:;
    `;

	const contentSecurityPolicyHeaderValue = cspHeader
		.replace(/\s{2,}/g, " ")
		.trim();

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-nonce", nonce);

	requestHeaders.set(
		"Content-Security-Policy",
		contentSecurityPolicyHeaderValue
	);

	const response = NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
	response.headers.set(
		"Content-Security-Policy",
		contentSecurityPolicyHeaderValue
	);

	return response;
}
