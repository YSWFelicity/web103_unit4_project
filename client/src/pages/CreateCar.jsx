import React, { useEffect, useState } from 'react'
import DrinkPreview from '../components/DrinkPreview'
import { getOptions, createDrink } from '../services/DrinksAPI'
import { labels, money, calculatePrice, validateCombination } from '../utilities/drinks'
import '../App.css'

const CreateCar = () => {
    const [drink, setDrink] = useState({ name: '', tea_base: 'thai', size: 'medium', milk: 'whole', sweetness: 50, ice: 'regular', toppings: [] })
    const [options, setOptions] = useState(null)
    const [error, setError] = useState('')
    const [saved, setSaved] = useState(null)
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(true)
    const loadOptions = async () => {
        setLoading(true); setError('')
        try { setOptions(await getOptions()) } catch { setError('Could not load the menu. Check that the backend is running, then retry.') }
        finally { setLoading(false) }
    }
    useEffect(() => { loadOptions() }, [])
    const update = (field, value) => {
        setDrink(current => ({ ...current, [field]: value }))
        setSaved(null); setError('')
    }
    const combinationError = validateCombination(drink)
    const submit = async (event) => {
        event.preventDefault()
        if (saving || combinationError) return
        setSaving(true); setError(''); setSaved(null)
        try { setSaved(await createDrink(drink)) }
        catch (err) { setError(err.message) }
        finally { setSaving(false) }
    }
    const select = (field, title) => <label>{title}<select value={drink[field]} onChange={e => update(field, e.target.value)}>
        {Object.entries(options[field]).map(([value, cents]) => <option key={value} value={value}>{labels[value]}{cents ? ` · ${field === 'tea_base' ? '' : '+'}${money(cents / 100)}` : ''}</option>)}
    </select></label>

    return <main className="studio">
        <header className="page-heading"><p className="eyebrow">YOUR CUP, YOUR WAY</p><h1>A little tea. A lot of you.</h1><p>Build your perfect milk tea, one delicious detail at a time.</p></header>
        {loading ? <p role="status">Loading the tea menu…</p> : !options ? <div className="notice error" role="alert">{error}<button onClick={loadOptions}>Retry</button></div> :
        <div className="builder">
            <section className="preview-panel"><p className="eyebrow">FRESHLY IMAGINED</p><DrinkPreview drink={drink} /><h2>{labels[drink.tea_base]}</h2><p>{labels[drink.milk]} · {drink.sweetness}% sweetness</p><div className="price-row"><span>Your creation</span><strong>{money(calculatePrice(drink, options))}</strong></div><small>Preview is an illustration of your selections.</small></section>
            <form className="customize-panel" onSubmit={submit}>
                <h2>Make it yours</h2><p>Start with Thai tea, or find a new favorite.</p>
                <fieldset disabled={saving}>
                    <label>Name your drink<input required maxLength={80} value={drink.name} onChange={e => update('name', e.target.value)} placeholder="My afternoon Thai tea" /></label>
                    {select('tea_base', 'Tea base')}
                    <div className="form-grid">{select('size', 'Cup size')}{select('milk', 'Milk')}</div>
                    <div className="form-grid"><label>Sweetness<select value={drink.sweetness} onChange={e => update('sweetness', Number(e.target.value))}>{options.sweetness.map(value => <option key={value} value={value}>{value}%{value === 0 ? ' · Unsweetened' : ''}</option>)}</select></label><label>Ice & temperature<select value={drink.ice} onChange={e => update('ice', e.target.value)}>{options.ice.map(value => <option key={value} value={value}>{labels[value]}</option>)}</select></label></div>
                    <fieldset className="topping-options"><legend>A little extra</legend>{Object.entries(options.toppings).map(([value, cents]) => <label key={value}><input type="checkbox" checked={drink.toppings.includes(value)} disabled={drink.ice === 'hot' && value === 'pudding' && !drink.toppings.includes(value)} onChange={e => update('toppings', e.target.checked ? [...drink.toppings, value] : drink.toppings.filter(t => t !== value))} />{labels[value]}<span>+{money(cents / 100)}</span></label>)}<small>Pudding is available with cold drinks only.</small></fieldset>
                    {combinationError && <p className="notice error" role="alert">{combinationError}</p>}
                    {error && <p className="notice error" role="alert">{error}</p>}
                    {saved && <p className="notice success" role="status">Saved “{saved.name}” for {money(saved.price)}! You can create another cup.</p>}
                    <button type="submit" disabled={saving || !!combinationError}>{saving ? 'Saving your tea…' : `Save my tea · ${money(calculatePrice(drink, options))}`}</button>
                </fieldset>
            </form>
        </div>}
    </main>
}

export default CreateCar
