import sql from "mssql";

// connection configs
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

export default async function ExecuteQuery(query: string, options?: any) {
	try {
		let pool = await sql.connect(config);
		let products = await pool.request().query(query);
		return products.recordsets;
	} catch (error) {
		console.log(error);
	}
}
