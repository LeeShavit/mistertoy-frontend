import { TextField } from '@mui/material'
import { useState } from 'react'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.action.js'

export function LoginSignup() {

    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())


    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }

    function onEnterCredentials() {
        isSignup ? onSignup(credentials) : onLogin(credentials)
    }

    async function onLogin(credentials) {
        try {
            await login(credentials)
            showSuccessMsg('Signed in successfully')
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    async function onSignup(credentials) {
        try {
            await signup(credentials)
            showSuccessMsg('Signed in successfully')
        } catch (err) {
            showErrorMsg('Oops try again')
        }
    }

    return (
        <div className="login-signup full">
            <TextField
                value={credentials.username}
                onChange={handleChange}
                name="username"
                label="Username"
                variant="standard"
                size='small'
                required
            />
            <TextField
                value={credentials.password}
                type="password"
                onChange={handleChange}
                name="password"
                label="Password"
                variant="standard"
                size='small'
                required
            />
            {isSignup && (
                <TextField
                    value={credentials.fullname}
                    onChange={handleChange}
                    name="fullname"
                    label="Full name"
                    variant="standard"
                    size='small'
                    required
                />
            )}
            <button className="btn btn-sm" onClick={() => onEnterCredentials()}> {isSignup ? 'Signup' : 'Login '}</button>
            <button
                onClick={() => setIsSignUp(!isSignup)}
                className="btn btn-sm" >
                {isSignup ? 'Already a member?' : 'New user?'}
            </button>
        </div >
    )
}
