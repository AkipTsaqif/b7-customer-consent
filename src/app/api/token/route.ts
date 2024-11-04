import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/jwt";
import { randomizeString } from "@/lib/utils";

export async function POST(req: NextRequest) {
	// const { clientId, clientSecret } = await req.json();
	const client = "b7-cust-consent-client";

	// if (
	// 	clientId === process.env.CLIENT_ID &&
	// 	clientSecret === process.env.CLIENT_SECRET
	// ) {
	const token = generateToken(randomizeString(client));
	return NextResponse.json({ token });
	// } else {
	// 	return NextResponse.json(
	// 		{ message: "Invalid credentials" },
	// 		{ status: 401 }
	// 	);
	// }
}
