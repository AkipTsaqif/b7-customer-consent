import { NextResponse } from "next/server";
import ExecuteQuery from "@/lib/db-pg";
import { saveConsent, sendEmail } from "@/app/actions/sql";
import { verifyToken } from "@/lib/jwt";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const uniqueIdentifier = searchParams.get("uid");

	const query = `SELECT json_data FROM tbl_trx_json_identifier WHERE uid = $1`;
	const values = [uniqueIdentifier];

	const jsonData = await ExecuteQuery(query, values);

	console.log("=============================");
	console.log("JSON DATA ROWS:", jsonData.rows);
	console.log("=============================");

	if (!jsonData || !Array.isArray(jsonData.rows) || !jsonData.rows.length) {
		console.log("========== NO JSON DATA FOUND =============");
		return NextResponse.json(
			{ error: "UID tidak cocok dengan database!" },
			{ status: 404 }
		);
	}

	const row = jsonData.rows[0];

	if (!row || !row.json_data) {
		return NextResponse.json(
			{ error: "UID tidak cocok dengan database!" },
			{ status: 404 }
		);
	}

	const jsonResponse = JSON.parse(row.json_data);
	return NextResponse.json(jsonResponse);
}

export async function POST(request: Request) {
	const headers = new Headers({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "Content-Type",
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Content-Type": "application/json",
	});

	if (request.method === "OPTIONS") {
		return new Response(null, {
			status: 204,
			headers,
		});
	}

	const authHeader = request.headers.get("authorization");
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return NextResponse.json(
			{ message: "Token not provided" },
			{ status: 401 }
		);
	}

	const access = verifyToken(token);
	if (!access) {
		return NextResponse.json(
			{ message: "Token is not valid" },
			{ status: 403 }
		);
	}

	try {
		const url = new URL(request.url);
		const shouldRedirect = url.searchParams.get("redirectCCB7");
		const jsonData = await request.json();
		const referer = request.headers.get("referer");

		if (shouldRedirect === "no") {
			const formData = new FormData();
			formData.append("name", jsonData.name);
			formData.append("email", jsonData.email);
			formData.append("phone", jsonData.phone);
			formData.append("address", jsonData.address || "");
			formData.append("other_info", jsonData.other_info || "");
			formData.append("agreeTerms", "true");
			formData.append("user_data_json", JSON.stringify(jsonData));
			formData.append("referer", referer || "");

			console.log("FORM DATA", formData);

			const result = await saveConsent(formData);
			await sendEmail(formData);

			if (result.status === 201) {
				return NextResponse.json(
					{ message: "JSON data sent successfully" },
					{ status: 201 }
				);
			} else {
				return NextResponse.json(
					{ error: "Failed to insert data." },
					{ status: 500 }
				);
			}
		}

		const uid = "10000000-1000-4000-8000-100000000000".replace(
			/[018]/g,
			(c) =>
				(
					+c ^
					(crypto.getRandomValues(new Uint8Array(1))[0] &
						(15 >> (+c / 4)))
				).toString(16)
		);

		const query = `
			INSERT INTO tbl_trx_json_identifier (uid, json_data) 
			VALUES ($1, $2)
		`;

		const values = [uid, JSON.stringify(jsonData)];

		const result = await ExecuteQuery(query, values);

		if (result.rowCount && result.rowCount > 0) {
			return NextResponse.json(
				{ message: "JSON data sent successfully", uid },
				{ status: 201 }
			);
		} else {
			return NextResponse.json(
				{ error: "Failed to insert data." },
				{ status: 500 }
			);
		}
	} catch (error) {
		console.error("Error processing request:", error);
		return NextResponse.json(
			{ error: "Internal server error." },
			{ status: 500, headers }
		);
	}
}
