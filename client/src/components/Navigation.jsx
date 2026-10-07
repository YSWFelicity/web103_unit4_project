import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link className="brand" to="/">Tea Studio <span>✦</span></Link></li>
            </ul>

            <ul>
                <li><Link to='/'>Customize</Link></li>
                <li><Link to='/drinks'>My teas</Link></li>
            </ul>
            
        </nav>
    )
}

export default Navigation
