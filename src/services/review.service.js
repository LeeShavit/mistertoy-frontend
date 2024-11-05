import { httpService } from './http.service.js'

const BASE_URL = 'review/'

export const reviewService = {
    query,
    get,
    remove,
    save,

    getEmptyReview,
    getDefaultFilter,
    getFilterFromSearchParams,
}

function query(filterBy) {
    return httpService.get(BASE_URL, filterBy)
}

function get(reviewId) {
    return httpService.get(BASE_URL + reviewId)
}

function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)

}

function save(review) {
    if (review._id) {
        return httpService.put(BASE_URL + review._id, review)
    } else {
        return httpService.post(BASE_URL, review)
    }
}

function getEmptyReview() {
    return {
        txt: '',
    }
}

function getDefaultFilter() {
    return { txt: '', toyId: '', userId: '' }
}

function getFilterFromSearchParams(searchParams) {
    const filterBy = {
        txt: searchParams.get('txt') || '',
        toyId: searchParams.get('toyId') || '',
        userId: searchParams.get('userId') || '',
    }
    return filterBy
}
