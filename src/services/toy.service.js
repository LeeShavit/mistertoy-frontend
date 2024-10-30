import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const gLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

const STORAGE_KEY = 'toy key'
_createToys()

export const toyService = {
    query,
    get,
    remove,
    save,

    getEmptyToy,
    getDefaultFilter,
    getLabels,

    getFilterFromSearchParams,
}

function query(filterBy) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.price) toys = toys.filter(toy => toy.price > filterBy.price)
            if (filterBy.inStock === 'true') toys = toys.filter(toy => toy.inStock)
            if (filterBy.inStock === 'false') toys = toys.filter(toy => !toy.inStock)
            if (filterBy.labels.length !== 0) toys= toys.filter(toy=> filterBy.labels.some(label => toy.labels.includes(label.value)))
            if (filterBy.sort) {
                switch (filterBy.sort) {
                    case 'name': toys.sort((a, b) => a.name.localeCompare(b.name))
                        break
                    case 'price': toys.sort((a, b) => a.price - b.price)
                        break
                    case 'created': toys.sort((a, b) => b.createdAt - a.createdAt)
                        break
                }
            }
            return toys
        })
}

function get(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)

}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
    }
}

function getDefaultFilter() {
    return { name: '', price: '', inStock: '', labels: '', sort: '', pageIdx: '' }
    //filter by:
    // name= use debounce
    // inStock = true/false/null
    // label= 'baby'/'art'/'puzzle'
    // sort= 'name'/'price'/'created'
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = {
        txt: searchParams.get('txt') || '',
        isDone: searchParams.get('isDone') || 'all',
        importance: +searchParams.get('importance') || 0,
        pageIdx: +searchParams.get('pageIdx') || 0,
        sort: searchParams.get('sort') || ''
    }
    return filterBy
}

function getLabels(){
    return gLabels.map(label => ({ value: label, label}))
}

function _createToy() {
    return {
        _id: utilService.makeId(5),
        name: utilService.makeLorem(2),
        price: utilService.getRandomIntInclusive(1, 20) * 10,
        labels: [gLabels[utilService.getRandomIntInclusive(0, 7)], gLabels[utilService.getRandomIntInclusive(0, 7)]],
        createdAt: 1631031 + utilService.getRandomIntInclusive(100000, 999999),
        inStock: (utilService.getRandomIntInclusive(1, 4) === 1) ? true : false
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        for (let i = 0; i < 20; i++) {
            toys.push(_createToy())
        }
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
//     'Outdoor', 'Battery Powered']

//     const toy = {
//     _id: 't101',
//     name: 'Talking Doll',
//     price: 123,
//     labels: ['Doll', 'Battery Powered', 'Baby'],
//     createdAt: 1631031801011,
//     inStock: true,
//     }