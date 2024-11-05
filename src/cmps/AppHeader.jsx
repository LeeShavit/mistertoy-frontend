import Menu from '@mui/icons-material/Menu';

import { UserMsg } from './UserMsg.jsx'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoginSignup } from './LoginSignup.jsx';
import BasicMenu from './BasicMenu.jsx';
import { logout } from '../store/actions/user.action.js'


export function AppHeader() {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await logout()
            navigate('/')
            showSuccessMsg('Logged out')
        } catch (err) {
            showErrorMsg('OOPs try again')
        }
    }

    return (

        <header className="app-header full main-layout">
            {isMenuOpen && <div className='backdrop' onClick={() => setIsMenuOpen(false)}></div>}
            <section className="header-container full">
                <img src='./src/assets/img/icon.svg' />
                <nav className={`app-nav ${isMenuOpen ? 'active' : ''}`}>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Toys</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    {loggedInUser &&
                        <BasicMenu fullname={loggedInUser.fullname} onLogout={onLogout} />
                    }
                    <UserMsg />
                </nav>
                <button className={`menu-btn ${isMenuOpen ? '' : 'active'}`} onClick={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)}><Menu /></button>
            </section>
            {!loggedInUser && <LoginSignup />}
            <UserMsg />
        </header>

    )
}