import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMONS_BY_ID = 'GET_POKEMONS_BY_ID';
export const GET_POKEMONS_BY_NAME = 'GET_POKEMONS_BY_NAME';
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_AZ = 'FILTER_AZ';
export const FITLER_TYPE = 'FITLER_TYPE';
export const FILTER_ATTACK = 'FILTER_ATTACK';


export const getAllPokemons = () => dispatch => {
     fetch('http://localhost:3001/pokemons')
        .then(response => response.json())
        .then(obj=> {
            dispatch({
                type: GET_ALL_POKEMONS, payload: obj
        });
    });
};

export const getTypes = () => dispatch => {
     fetch('http://localhost:3001/types')
        .then(response => response.json())
        .then(obj => {
            dispatch({
                type: GET_TYPES, payload: obj
         });
    });
};

export const getPokemonById = (id) => dispatch => {
    fetch(`http://localhost:3001/pokemons/${id}`)
    .then(response => response.json())
    .then(obj => {
        dispatch({
            type: GET_POKEMONS_BY_ID, payload: obj
     });
    });
};

export const getPokemonByName = (name) => {
    return async function (dispatch) {
        const pokesByName = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        return dispatch ({type: GET_POKEMONS_BY_NAME, payload: pokesByName.data})
    }
}

export const createPokemon = (values) => {
    return async function (dispatch) {
    const newPokemon = await axios.post('http://localhost:3001/pokemons', values)
        console.log(values)
        return dispatch ({type: CREATE_POKEMON, payload: newPokemon.data})
    }
}

export const FilterCreated = (payload) => {
   return {type: FILTER_CREATED, payload}
}

export const filterAZ = (payload) => {
    return {type: FILTER_AZ, payload}
}

export const filterTypes = (payload) => {
    return {type: FITLER_TYPE, payload}
}

export const filterAttack = (payload) => {
    return {type: FILTER_ATTACK, payload}
}