import { NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";
import { randomizeString } from "@/lib/utils";
import { corsHeaders } from "@/lib/cors";

export async function OPTIONS() {
	return new NextResponse(null, {
		status: 204,
		headers: corsHeaders,
	});
}

export async function POST() {
	// const { clientId, clientSecret } = await req.json();
	const client = "b7-cust-consent-client";

	// if (
	// 	clientId === process.env.CLIENT_ID &&
	// 	clientSecret === process.env.CLIENT_SECRET
	// ) {
	const token = generateToken(randomizeString(client));
	return new NextResponse(JSON.stringify({ token }), {
		status: 200,
		headers: corsHeaders,
	});
	// } else {
	// 	return NextResponse.json(
	// 		{ message: "Invalid credentials" },
	// 		{ status: 401 }
	// 	);
	// }
}
