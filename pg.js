const { Pool } = require('pg')

const pool = new Pool({
	connectionString: 'postgres://ovnbgtan:VLU1y9ApCrF-wZvZOLN5wij1z9uoFeB7@john.db.elephantsql.com:5432/ovnbgtan',
})

const rows = async (SQL, ...params) => {

	const client = await pool.connect()

	try {
		const { rows } = await client.query(SQL, params)
		return rows
	}
	finally {
		client.release()
	}
}

module.exports.rows = rows
