"use server";

import ExecuteQuery from "@/lib/db";

export const saveConsent = async (data: FormData) => {
	const email = data.get("email");
	const agreeTerms = data.get("agreeTerms");
	const agreeData = data.get("agreeData");

	try {
		const query = `
            INSERT INTO tbl_trx_consent (email, agreeTerms, agreeData)
            VALUES ('${email}', '${agreeTerms}', '${agreeData}')
        `;

		const result = await ExecuteQuery(query);
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
