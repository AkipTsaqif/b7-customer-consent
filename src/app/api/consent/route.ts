import { NextResponse } from "next/server";
import ExecuteQuery from "@/lib/db";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	console.log("searchParams:", searchParams);
	const url = new URL(request.url);
	console.log("Full URL:", url.toString());
	const uniqueIdentifier = searchParams.get("uid");

	const query = `SELECT json_data FROM tbl_trx_json_identifier WHERE uid = '${uniqueIdentifier}'`;
	console.log("QUERY:", query);

	const jsonData = await ExecuteQuery(query);

	console.log("=============================");
	console.log("JSON DATA RECORD SETS:", jsonData.recordsets);
	console.log("JSON DATA RECORD SET:", jsonData.recordset);
	console.log("JSON DATA ROWS AFFECTED:", jsonData.rowsAffected);
	console.log("=============================");

	if (
		!jsonData ||
		!Array.isArray(jsonData.recordsets) ||
		!jsonData.recordsets.length
	) {
		console.log(
			"================================ NO JSON DATA IS CORRECT HERE =========================================="
		);
		return NextResponse.json({ error: "No data found" }, { status: 404 });
	}

	const rows = jsonData.recordsets[0];
	console.log("ROWS:", rows);

	if (!rows || !rows.length) {
		return NextResponse.json({ error: "No data found" }, { status: 404 });
	}

	const jsonResponse = JSON.parse(rows[0].json_data);
	console.log("JSON RESPONSE:", jsonResponse);
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
			status: 201, // No Content
			headers,
		});
	}

	try {
		const jsonData = await request.json();
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
            VALUES ('${uid}', '${JSON.stringify(jsonData)}')
            `;

		const result = await ExecuteQuery(query);

		if (result.rowsAffected && result.rowsAffected[0] > 0) {
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
