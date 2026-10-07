import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'

import drinksRouter from './routes/drinks.js'


dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

app.use('/api/drinks', drinksRouter)
app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found.' }))

app.use((error, _req, res, _next) => {
    if (error.type === 'entity.parse.failed') {
        return res.status(400).json({ error: 'Request body must be valid JSON.' })
    }
    console.error('API request failed:', error.message)
    res.status(500).json({ error: 'Unable to complete your request. Please try again.' })
})


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
