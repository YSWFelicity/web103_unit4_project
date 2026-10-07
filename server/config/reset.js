import { pool } from './database.js'

// Despite the starter's filename, this does not drop or erase existing data.
const createTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS drinks (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL CHECK (length(trim(name)) BETWEEN 1 AND 80),
                tea_base TEXT NOT NULL CHECK (tea_base IN ('thai', 'black', 'green', 'taro')),
                size TEXT NOT NULL CHECK (size IN ('medium', 'large')),
                milk TEXT NOT NULL CHECK (milk IN ('whole', 'oat', 'coconut')),
                sweetness INTEGER NOT NULL CHECK (sweetness IN (0, 25, 50, 75, 100)),
                ice TEXT NOT NULL CHECK (ice IN ('regular', 'less', 'none', 'hot')),
                toppings TEXT[] NOT NULL DEFAULT '{}' CHECK (
                    toppings <@ ARRAY['boba', 'grass_jelly', 'pudding']::TEXT[]
                ),
                price NUMERIC(6, 2) NOT NULL CHECK (price >= 0),
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                CHECK (ice <> 'hot' OR NOT ('pudding' = ANY(toppings)))
            )
        `)
        console.log('Database ready: drinks table exists. Existing drinks were preserved.')
    } catch (error) {
        console.error('Could not create the drinks table:', error.message)
        process.exitCode = 1
    } finally {
        await pool.end()
    }
}

await createTable()
