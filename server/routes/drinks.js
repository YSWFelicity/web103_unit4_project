import express from 'express'
import { getDrinks, getDrink, createDrink, updateDrink, deleteDrink } from '../controllers/drinks.js'
import { options } from '../utilities/drinks.js'

const router = express.Router()

router.get('/options', (_req, res) => res.json(options))
router.get('/', getDrinks)
router.get('/:id', getDrink)
router.post('/', createDrink)
router.put('/:id', updateDrink)
router.delete('/:id', deleteDrink)

export default router
