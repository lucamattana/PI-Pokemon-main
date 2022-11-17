import { GET_ALL_POKEMONS, GET_TYPES, GET_POKEMONS_BY_ID, GET_POKEMONS_BY_NAME, CREATE_POKEMON } from './actions'

const initialState = {
    pokemons: [],
    pokemonDetail: {},
    types: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS: {
            return ({
                ...state,
                pokemons: action.payload
            })
        }
        case GET_TYPES: {
            return ({
                ...state,
                types: action.payload
            })
        }
        case GET_POKEMONS_BY_ID: {
            return ({
                ...state,
                pokemonDetail: action.payload
            })
        }
        case GET_POKEMONS_BY_NAME: {
            return ({
                ...state,
                pokemons: action.payload
            })
        }
        case CREATE_POKEMON: {
            return ({
                ...state,
                pokemons: [...state.pokemons, action.payload ]
            })
        }
        default: 
            return {...state}
        
    }
}

export default rootReducer;