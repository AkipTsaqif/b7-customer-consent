import { Pool, QueryResult as PgQueryResult } from "pg";

const remote_gcp = "35.240.147.75";
const local_gcp = "localhost";

const config = {
	user: "postgres",
	password: "pg_sqlb7",
	host: local_gcp,
	database: "customer_consent",
	port: 5432,
};

type QueryResult = {
	rows?: Record<string, string>[];
	rowCount?: number | null;
};

const pool = new Pool(config);

export default async function ExecuteQuery(
	query: string,
	params?: any[]
): Promise<QueryResult> {
	try {
		const result: PgQueryResult<Record<string, string>> = await pool.query(
			query,
			params
		);

		if (result.rows && result.rows.length > 0) {
			return { rows: result.rows };
		} else {
			return { rowCount: result.rowCount ?? undefined };
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
