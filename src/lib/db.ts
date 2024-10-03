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

export default async function ExecuteQuery(query: string) {
	try {
		const pool = await sql.connect(config);
		const products = await pool.request().query(query);
		return products.recordsets;
	} catch (error: any) {
		console.log("ERROR: ", error);
	}
}
