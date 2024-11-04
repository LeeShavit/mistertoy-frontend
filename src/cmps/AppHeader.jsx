import Menu from '@mui/icons-material/Menu';

import { UserMsg } from './UserMsg.jsx'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';


export function AppHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (

        <header className="app-header full main-layout">
            {isMenuOpen && <div className='backdrop' onClick={()=> setIsMenuOpen(false)}></div>}
            <section className="header-container">
                <h1>Toys!!</h1>
                <nav className={`app-nav ${isMenuOpen ? 'active' : ''}`}>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
                <button className={`menu-btn ${isMenuOpen ? '' : 'active'}`} onClick={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}><Menu /></button>
            </section>
            <UserMsg />
        </header>

    )
}