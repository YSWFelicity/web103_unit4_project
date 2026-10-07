import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDrink } from '../services/DrinksAPI'
import CreateCar from './CreateCar'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [drink, setDrink] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const load = async () => {
        setLoading(true); setError(''); setDrink(null)
        try { setDrink(await getDrink(id)) } catch (err) { setError(err.message) }
        finally { setLoading(false) }
    }
    useEffect(() => { load() }, [id])
    if (loading) return <main className="studio"><p role="status">Loading your recipe…</p></main>
    if (error) return <main className="studio"><Link className="text-link" to="/drinks">← All my teas</Link><p className="notice error" role="alert">{error}</p><button onClick={load}>Retry</button></main>
    return <CreateCar key={id} initialDrink={drink} onSaved={saved => navigate(`/drinks/${saved.id}`)} />
}
export default EditCar
