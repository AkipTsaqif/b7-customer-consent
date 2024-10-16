import sql from "mssql";

const config = {
	user: "sab7",
	password: "sqlb7",
	server: "10.100.19.52",
	database: "Customer_Consent",
	port: 1433,
	options: {
		encrypt: false,
	},
};

type QueryResult = {
	recordsets?: sql.IRecordSet<Record<string, string>>[];
	recordset?: sql.IRecordSet<Record<string, string>>;
	rowsAffected?: number[];
};

export default async function ExecuteQuery(
	query: string
): Promise<QueryResult> {
	try {
		const pool = await sql.connect(config);
		const result = await pool.request().query(query);

		if (Array.isArray(result.recordsets) && result.recordsets.length > 0) {
			return {
				recordsets: result.recordsets as sql.IRecordSet<
					Record<string, string>
				>[],
			};
		} else if (result.recordset) {
			return { recordset: result.recordset };
		} else {
			return { rowsAffected: result.rowsAffected };
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.log("ERROR: ", error.message);
		} else {
			console.log("Unexpected error: ", error);
		}
		return {};
	}
}
