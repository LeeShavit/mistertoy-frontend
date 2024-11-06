
export const SET_TOYS = 'set toys'
export const REMOVE_TOY = 'remove toy'
export const UPDATE_TOY = 'update toy'
export const ADD_TOY = 'add toy'

const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, cmd = {}){
    switch (cmd.type) {
        case SET_TOYS: 
        return{
            ...state,
            toys: cmd.toys
        }
        case REMOVE_TOY: 
        return{
            ...state,
            toys: state.toys.filter(toy => toy._id !== cmd.toyId)
        }
        case UPDATE_TOY: 
        return{
            ...state,
            toys: state.toys.map(toy=> (toy._id === cmd.toy._id) ? cmd.toy : toy)
        }
        case ADD_TOY: 
        return{
            ...state,
            toys: [...state.toys, cmd.toy]
        }
            
    
        default: return state
    }
}