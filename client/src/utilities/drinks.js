export const labels = {
    thai: 'Thai Milk Tea', black: 'Classic Black Tea', green: 'Jasmine Green Tea', taro: 'Taro Milk Tea',
    medium: 'Medium', large: 'Large', whole: 'Whole milk', oat: 'Oat milk', coconut: 'Coconut milk',
    regular: 'Regular ice', less: 'Less ice', none: 'No ice', hot: 'Hot',
    boba: 'Boba pearls', grass_jelly: 'Grass jelly', pudding: 'Pudding'
}

export const colors = { thai: '#e99539', black: '#bd8a61', green: '#b8c891', taro: '#b9a0d2' }
export const money = (amount) => `$${Number(amount).toFixed(2)}`
export const calculatePrice = (drink, options) => {
    if (!options) return 0
    return (options.tea_base[drink.tea_base] + options.size[drink.size] + options.milk[drink.milk]
        + drink.toppings.reduce((total, topping) => total + options.toppings[topping], 0)) / 100
}
export const validateCombination = (drink) => drink.ice === 'hot' && drink.toppings.includes('pudding')
    ? 'Pudding is only available in cold drinks. Choose a cold drink or remove pudding.' : ''
