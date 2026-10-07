import { pool } from '../config/database.js'
import { validateDrink, drinkValues } from '../utilities/drinks.js'

const validId = (req, res) => {
    const id = Number(req.params.id)
    if (!/^\d+$/.test(req.params.id) || !Number.isSafeInteger(id) || id < 1 || id > 2147483647) {
        res.status(400).json({ error: 'Drink ID must be a positive integer.' })
        return null
    }
    return id
}

const handle = (operation) => async (req, res, next) => {
    try { await operation(req, res) } catch (error) { next(error) }
}

export const getDrinks = handle(async (_req, res) => {
    const { rows } = await pool.query('SELECT * FROM drinks ORDER BY created_at DESC, id DESC')
    res.json(rows)
})

export const getDrink = handle(async (req, res) => {
    const id = validId(req, res)
    if (id === null) return
    const { rows } = await pool.query('SELECT * FROM drinks WHERE id = $1', [id])
    if (!rows.length) return res.status(404).json({ error: 'Drink not found.' })
    res.json(rows[0])
})

export const createDrink = handle(async (req, res) => {
    const error = validateDrink(req.body)
    if (error) return res.status(400).json({ error })
    const { rows } = await pool.query(`
        INSERT INTO drinks (name, tea_base, size, milk, sweetness, ice, toppings, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `, drinkValues(req.body))
    res.status(201).json(rows[0])
})

export const updateDrink = handle(async (req, res) => {
    const id = validId(req, res)
    if (id === null) return
    const error = validateDrink(req.body)
    if (error) return res.status(400).json({ error })
    const { rows } = await pool.query(`
        UPDATE drinks SET name = $1, tea_base = $2, size = $3, milk = $4,
            sweetness = $5, ice = $6, toppings = $7, price = $8
        WHERE id = $9 RETURNING *
    `, [...drinkValues(req.body), id])
    if (!rows.length) return res.status(404).json({ error: 'Drink not found.' })
    res.json(rows[0])
})

export const deleteDrink = handle(async (req, res) => {
    const id = validId(req, res)
    if (id === null) return
    const { rowCount } = await pool.query('DELETE FROM drinks WHERE id = $1', [id])
    if (!rowCount) return res.status(404).json({ error: 'Drink not found.' })
    res.status(204).end()
})
