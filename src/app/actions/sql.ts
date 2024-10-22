"use server";

import ExecuteQuery from "@/lib/db-pg";

export const saveConsent = async (data: FormData) => {
	const name = data.get("name");
	const email = data.get("email");
	const phone = data.get("phone") || null;
	const address = data.get("address") || null;
	const otherInfo = data.get("other_info") || null;
	const agreeTerms = data.get("agreeTerms") ? 1 : 0;

	const userData =
		data.get("user_data_json") !== "null"
			? data.get("user_data_json")
			: null;
	const referer = data.get("referer") || null;

	try {
		const query = `
			INSERT INTO tbl_trx_consent (name, email, phone, address, other_info, user_data_json, referer, agree_terms)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		`;

		const values = [
			name || null,
			email || null,
			phone || null,
			address || null,
			otherInfo || null,
			userData || null,
			referer || null,
			agreeTerms,
		];

		const result = await ExecuteQuery(query, values);
		console.log("RESULT", result);
		return {
			status: 201,
			message: "Consent saved successfully",
			data: result,
		};
	} catch {
		return {
			status: 500,
			message: "Internal server error",
		};
	}
};

export const updateConsent = async (email: string) => {
	try {
		const query = `
			UPDATE tbl_trx_consent
			SET agree_terms = false, objected = true, objected_at = CURRENT_TIMESTAMP
			WHERE email = $1
		`;

		const values = [email];

		console.log("QUERY", query);

		const result = await ExecuteQuery(query, values);
		console.log("RESULT", result);
		return {
			status: 200,
			message: "Consent updated successfully",
			data: result,
		};
	} catch {
		return {
			status: 500,
			message: "Internal server error",
		};
	}
};

export const removeTempConsent = async (uid: string) => {
	try {
		const query = `
			DELETE FROM tbl_trx_json_identifier
			WHERE uid = '${uid}'
		`;

		const result = await ExecuteQuery(query);
		console.log("RESULT", result);
		return {
			status: 200,
			message: "Temp consent removed successfully",
			data: result,
		};
	} catch {
		return {
			status: 500,
			message: "Internal server error",
		};
	}
};

export const sendEmail = async (data: FormData) => {
	await fetch("https://portal.bintang7.com/API_Email/api/sendemail", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			data: [
				{
					from: "customer.consent@bintang7.com",
					to: data.get("email"),
					subject: "Consent Confirmation (Persetujuan Pelanggan)",
					cc: "",
					bcc: "",
					isHTML: true,
					body: `
						<p>Terima kasih bapak/ibu atas konfirmasi terhadap Formulir Persetujuan Pelanggan.</p>
						<p>Jika anda merasa tidak melakukan persetujuan tersebut bisa klik link dibawah ini.</p>
						<a href="https://cust-consent.bintang7.com/object?email=${data.get(
							"email"
						)}">Link pembatalan persetujuan</a>
						<p>Terima kasih.</p>
						<br />
						<p style="font-weight: bold; font-style: italic; font-size: small">Note: Tolong jangan membalas pesan ini. Surat yang dikirim ke alamat ini tidak dapat dibalas.</p>
					`,
					priority: "low",
				},
			],
		}),
	}).then((response) => {
		console.log("RESPONSE", response);
	});
};
