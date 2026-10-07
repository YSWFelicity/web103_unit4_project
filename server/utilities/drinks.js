// Prices are in cents to avoid floating-point rounding during calculation.
export const options = {
    tea_base: { thai: 550, black: 500, green: 500, taro: 575 },
    size: { medium: 0, large: 100 },
    milk: { whole: 0, oat: 75, coconut: 75 },
    sweetness: [0, 25, 50, 75, 100],
    ice: ['regular', 'less', 'none', 'hot'],
    toppings: { boba: 75, grass_jelly: 75, pudding: 100 }
}

export const validateDrink = (body) => {
    if (!body || typeof body !== 'object' || Array.isArray(body)) return 'A drink object is required.'
    if (typeof body.name !== 'string' || !body.name.trim() || body.name.trim().length > 80) {
        return 'Give your drink a name between 1 and 80 characters.'
    }
    for (const field of ['tea_base', 'size', 'milk']) {
        if (typeof body[field] !== 'string' || !Object.hasOwn(options[field], body[field])) {
            return `Choose a valid ${field.replace('_', ' ')}.`
        }
    }
    if (!options.sweetness.includes(body.sweetness)) return 'Choose a valid sweetness level.'
    if (!options.ice.includes(body.ice)) return 'Choose a valid ice level.'
    if (!Array.isArray(body.toppings) || body.toppings.some((item) =>
        typeof item !== 'string' || !Object.hasOwn(options.toppings, item))) {
        return 'Choose valid toppings.'
    }
    if (new Set(body.toppings).size !== body.toppings.length) return 'Each topping can only be selected once.'
    if (body.ice === 'hot' && body.toppings.includes('pudding')) {
        return 'Pudding is only available in cold drinks. Remove pudding or choose a cold drink.'
    }
    return null
}

export const drinkValues = (body) => {
    const cents = options.tea_base[body.tea_base] + options.size[body.size] + options.milk[body.milk]
        + body.toppings.reduce((total, topping) => total + options.toppings[topping], 0)
    return [body.name.trim(), body.tea_base, body.size, body.milk,
        body.sweetness, body.ice, body.toppings, cents / 100]
}
