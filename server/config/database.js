import pg from 'pg'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'

// Load server/.env regardless of which directory runs the command.
dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })

const requiredVariables = ['PGUSER', 'PGPASSWORD', 'PGHOST', 'PGPORT', 'PGDATABASE']
const missingVariables = requiredVariables.filter((name) => !process.env[name])

if (missingVariables.length > 0) {
    throw new Error(`Missing database settings: ${missingVariables.join(', ')}. Fill in server/.env first.`)
}

export const pool = new pg.Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000
})
