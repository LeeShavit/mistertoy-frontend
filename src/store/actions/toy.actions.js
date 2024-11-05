import { toyService } from "../../services/toy.service";
import { store } from "../store.js"
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY } from "../reducers/toy.reducer.js"

export async function loadToys(filterBy) {
    try {
        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
        return toys
    } catch (err) {
        console.log('car action -> cannot load toys', err)
        throw err
    }
}

export async function removeToy(toyId) {
    try {
        const toys = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log(`toy action -> cannot remove toy ${toyId}`, err)
        throw err
    }
}

export async function saveToy(toy) {
    try {
        const savedToy = toyService.save(toy)
        const type = toy._id ? UPDATE_TOY : ADD_TOY
        store.dispatch({ type, savedToy })
        return savedToy
    } catch (err) {
        console.log('toy action -> cannot save toy', err)
            throw err
    }
}