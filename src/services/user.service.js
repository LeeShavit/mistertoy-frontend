
import { httpService } from './http.service.js'

const AUTH_URL = 'auth/'
const BASE_URL = 'user/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateBalance,
    getEmptyCredentials
}


async function login({ username, password }) {
    try {
        const user= await httpService.post(AUTH_URL + 'login', { username, password })
        return _setLoggedinUser(user)
    } catch (err) {
        console.log('Invalid login', err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    try {
        let user=  { username, password, fullname, balance: 100 }
        user= await httpService.post(AUTH_URL + 'signup', user)
        return _setLoggedinUser(user)
    } catch (err) {
        console.log('Invalid signup', err)
        throw err
    }
}


async function logout() {
    try {
        await httpService.post(AUTH_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log('userService-> failed to logout', err)
        throw err
    }
}


async function updateBalance(diff) {
    if (getLoggedinUser().balance + diff < 0) throw 'No credit'
    try {
        const user = await httpService.put(BASE_URL, { diff })
        _setLoggedinUser(user)
        return user.balance
    } catch (err) {
        console.log('userService-> failed to update user balance', err)
        throw err
    }
}

async function getById(userId) {
    try {
        return await httpService.get(BASE_URL + userId)
    } catch (err) {
        console.log('userService-> failed to find user', err)
        throw err
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}
