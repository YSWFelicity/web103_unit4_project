const request = async (path, settings) => {
    const response = await fetch(`/api/drinks${path}`, settings)
    const data = response.status === 204 ? null : await response.json()
    if (!response.ok) throw new Error(data.error || 'Unable to complete your request.')
    return data
}

export const getOptions = () => request('/options')
export const getDrinks = () => request('')
export const getDrink = (id) => request(`/${id}`)
export const deleteDrink = (id) => request(`/${id}`, { method: 'DELETE' })
export const updateDrink = (id, drink) => request(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(drink)
})
export const createDrink = (drink) => request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(drink)
})
