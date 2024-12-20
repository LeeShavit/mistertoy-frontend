import { httpService } from './http.service.js'

const gLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

const BASE_URL = 'toy/'

export const toyService = {
    query,
    get,
    remove,
    save,

    getEmptyToy,
    getDefaultFilter,
    getLabels,

    getFilterFromSearchParams,
    getLabelsStats,

    addToyMsg,
    removeToyMsg,
    getEmptyMsg,
    getToysList,
}

function query(filterBy) {
    return httpService.get(BASE_URL, filterBy)
}

function get(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)

}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        return httpService.post(BASE_URL, toy)
    }
}

function addToyMsg(toyId, msg) {
    return httpService.post(BASE_URL + toyId + '/msg', { txt: msg })
}

function removeToyMsg(toyId, msgId) {
    return httpService.delete(BASE_URL + toyId + '/msg/' + msgId)
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: true,
        msgs: [],
    }
}

function getDefaultFilter() {
    return { name: '', price: '', inStock: '', labels: [], sort: '', pageIdx: '' }
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

function getLabels() {
    return [...gLabels]
}

async function getLabelsStats() {
    try {
        const toys = await httpService.get(BASE_URL)
        const stats = gLabels.reduce((acc, label, idx) => {
            acc.toysCount[idx] = 0
            acc.prices[idx] = 0
            acc.toysInStock[idx] = 0
            acc.date[idx] = 0
            toys.forEach(toy => {
                if (toy.labels.includes(label)) {
                    acc.toysCount[idx]++
                    acc.prices[idx] += toy.price
                    if (toy.inStock) acc.toysInStock[idx]++
                }
                const date = new Date(toy.createdAt)
                if (date.getMonth() === idx) acc.date[idx]++
            })
            acc.prices[idx] = acc.prices[idx] / acc.toysCount[idx]
            return acc
        }, { toysCount: [], prices: [], toysInStock: [], date: [] })
        return { labels: { ...gLabels }, ...stats }
    } catch (err) {
        console.log('failed to get stats for toys' + err)
        throw err
    }
}

function getEmptyMsg() {
    return {
      txt: '',
    }
  }

async function getToysList(){
    try{
        const toys= await query()
        const list= toys.map(toy=>  `${toy.name}^${toy._id}`)
        return list
    }catch(err){
        console.log('failed to get list of toys' + err)
        throw err
    }
}

// function _createToy() {
//     return {
//         _id: utilService.makeId(5),
//         name: utilService.makeLorem(2),
//         price: utilService.getRandomIntInclusive(1, 20) * 10,
//         labels: [gLabels[utilService.getRandomIntInclusive(0, 7)], gLabels[utilService.getRandomIntInclusive(0, 7)]],
//         createdAt: 1631031 + utilService.getRandomIntInclusive(100000, 999999),
//         inStock: (utilService.getRandomIntInclusive(1, 4) === 1) ? true : false
//     }
// }

// function _createToys() {
//     let toys = utilService.loadFromStorage(STORAGE_KEY)
//     if (!toys || !toys.length) {
//         toys = []
//         for (let i = 0; i < 20; i++) {
//             toys.push(_createToy())
//         }
//         utilService.saveToStorage(STORAGE_KEY, toys)
//     }
// }

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