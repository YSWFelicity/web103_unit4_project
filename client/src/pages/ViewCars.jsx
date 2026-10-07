import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDrinks, deleteDrink } from '../services/DrinksAPI'
import DrinkPreview from '../components/DrinkPreview'
import { labels, money } from '../utilities/drinks'

const ViewCars = () => {
    const [drinks, setDrinks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleting, setDeleting] = useState(null)
    const [notice, setNotice] = useState('')
    const load = async () => {
        setLoading(true); setError('')
        try { setDrinks(await getDrinks()) } catch (err) { setError(err.message) }
        finally { setLoading(false) }
    }
    useEffect(() => { load() }, [])
    const remove = async (drink) => {
        if (!window.confirm(`Delete “${drink.name}”? This cannot be undone.`)) return
        setDeleting(drink.id); setError(''); setNotice('')
        try {
            await deleteDrink(drink.id)
            setDrinks(current => current.filter(item => item.id !== drink.id))
            setNotice(`Deleted “${drink.name}”.`)
        } catch (err) { setError(err.message) }
        finally { setDeleting(null) }
    }
    return <main className="studio">
        <header className="page-heading"><p className="eyebrow">YOUR PERSONAL TEA MENU</p><h1>A collection worth sipping.</h1><p>Your saved creations, ready for another little twist.</p><Link className="button-link" to="/">Create a tea</Link></header>
        {notice && <p className="notice success" role="status">{notice}</p>}
        {error && <div className="notice error" role="alert">{error} <button onClick={load}>Retry loading</button></div>}
        {loading ? <p role="status">Loading your teas…</p> : !error && !drinks.length ? <section className="empty-state"><h2>Your tea menu starts here.</h2><p>Customize your first cup and save it to your collection.</p><Link className="text-link" to="/">Make my first tea →</Link></section> :
        <div className="tea-grid">{drinks.map(drink => <article className="tea-card" key={drink.id}>
            <Link to={`/drinks/${drink.id}`} aria-label={`View ${drink.name}`}><DrinkPreview drink={drink} /></Link>
            <div className="tea-card-body"><p className="eyebrow">{labels[drink.tea_base]}</p><h2><Link to={`/drinks/${drink.id}`}>{drink.name}</Link></h2><p>{labels[drink.size]} · {labels[drink.milk]}</p><strong>{money(drink.price)}</strong><div className="card-actions"><Link className="text-link" to={`/drinks/${drink.id}`}>Details</Link><Link className="text-link" to={`/drinks/${drink.id}/edit`}>Edit</Link><button className="delete-button" disabled={deleting !== null} onClick={() => remove(drink)}>{deleting === drink.id ? 'Deleting…' : 'Delete'}</button></div></div>
        </article>)}</div>}
    </main>
}
export default ViewCars
