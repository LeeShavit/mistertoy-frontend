import { toyService } from "../../services/toy.service";
import { store } from "../store.js"
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY } from "../reducers/toy.reducer.js"

export function loadToys(filterBy) {
    return toyService.query(filterBy)
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
            return toys
        })
        .catch(err => {
            console.log('car action -> cannot load cars', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log(`toy action -> cannot remove toy ${toyId}`, err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> cannot save toy', err)
            throw err
        })
}