import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDrink, deleteDrink } from '../services/DrinksAPI'
import DrinkPreview from '../components/DrinkPreview'
import { labels, money } from '../utilities/drinks'

const CarDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [drink, setDrink] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [deleting, setDeleting] = useState(false)
    const load = async () => {
        setLoading(true); setError(''); setDrink(null)
        try { setDrink(await getDrink(id)) } catch (err) { setError(err.message) }
        finally { setLoading(false) }
    }
    useEffect(() => { load() }, [id])
    const remove = async () => {
        if (!window.confirm(`Delete “${drink.name}”? This cannot be undone.`)) return
        setDeleting(true); setError('')
        try { await deleteDrink(id); navigate('/drinks') }
        catch (err) { setError(err.message); setDeleting(false) }
    }
    return <main className="studio">
        <Link className="text-link" to="/drinks">← All my teas</Link>
        {loading ? <p role="status">Loading your tea…</p> : <>
            {error && <div className="notice error" role="alert">{error} <button onClick={load}>Retry</button></div>}
            {drink && <><header className="page-heading detail-heading"><p className="eyebrow">YOUR SAVED RECIPE</p><h1>{drink.name}</h1></header><div className="builder">
                <section className="preview-panel"><DrinkPreview drink={drink} /><h2>{labels[drink.tea_base]}</h2><div className="price-row"><span>Total price</span><strong>{money(drink.price)}</strong></div></section>
                <section className="customize-panel"><h2>The perfect mix</h2><dl className="recipe-details">{[['Tea base', labels[drink.tea_base]], ['Cup size', labels[drink.size]], ['Milk', labels[drink.milk]], ['Sweetness', `${drink.sweetness}%`], ['Ice & temperature', labels[drink.ice]], ['Toppings', drink.toppings.map(t => labels[t]).join(', ') || 'No toppings']].map(([title, value]) => <div key={title}><dt>{title}</dt><dd>{value}</dd></div>)}</dl><div className="detail-actions"><Link className="button-link" to={`/drinks/${id}/edit`}>Edit recipe</Link><button className="delete-button" disabled={deleting} onClick={remove}>{deleting ? 'Deleting…' : 'Delete tea'}</button></div></section>
            </div></>}
        </>}
    </main>
}
export default CarDetails
