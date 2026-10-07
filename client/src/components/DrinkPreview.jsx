import React from 'react'
import { colors, labels } from '../utilities/drinks'

const DrinkPreview = ({ drink }) => (
    <div className="drink-preview" role="img" aria-label={`${labels[drink.tea_base]}, ${labels[drink.size]}, ${drink.toppings.map(t => labels[t]).join(', ') || 'no toppings'}`}>
        <div className={`cup-scene ${drink.size}`}>
            {drink.ice === 'hot' ? <div className="steam">〰 〰 〰</div> : <div className="straw" />}
            <div className="cup-lid" />
            <div className="tea-cup" style={{ '--tea-color': colors[drink.tea_base] }}>
                {!['none', 'hot'].includes(drink.ice) && <div className="ice-cubes">{Array.from({ length: drink.ice === 'less' ? 2 : 5 }, (_, i) => <span key={i} />)}</div>}
                <div className="cup-label">TEA<br /><small>STUDIO</small></div>
                <div className="toppings-art">
                    {drink.toppings.includes('pudding') && <div className="pudding" />}
                    {drink.toppings.includes('grass_jelly') && <div className="jelly">{Array.from({ length: 6 }, (_, i) => <span key={i} />)}</div>}
                    {drink.toppings.includes('boba') && <div className="pearls">{Array.from({ length: 18 }, (_, i) => <span key={i} />)}</div>}
                </div>
            </div>
        </div>
    </div>
)
export default DrinkPreview
