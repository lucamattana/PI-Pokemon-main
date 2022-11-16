import axios from 'axios';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMONS_BY_ID = 'GET_POKEMONS_BY_ID';
export const GET_POKEMONS_BY_NAME = 'GET_POKEMONS_BY_NAME';
export const CREATE_POKEMON = 'CREATE_POKEMON';


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

export const getPokemonByName = (name) => dispatch => {
    fetch(`http://localhost:3001/pokemons/${name}`)
    .then(response => response.json())
    .then(obj => {
        dispatch({
            type: GET_POKEMONS_BY_NAME, payload: obj
     });
    });
}

export const createPokemon = (values) => {
    return async function (dispatch) {
    const newPokemon = await axios.post('http://localhost:3001/pokemons', values)
        console.log(values)
        return dispatch ({type: CREATE_POKEMON, payload: newPokemon.data})
    }
}