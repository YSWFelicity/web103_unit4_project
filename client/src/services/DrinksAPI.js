const request = async (path, settings) => {
    const response = await fetch(`/api/drinks${path}`, settings)
    const data = await response.json()
    if (!response.ok) throw new Error(data.error || 'Unable to complete your request.')
    return data
}

export const getOptions = () => request('/options')
export const createDrink = (drink) => request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(drink)
})
