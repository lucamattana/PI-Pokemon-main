
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';


export const getAllPokemons = () => dispatch => {
    return fetch('http://localhost:3001/pokemons')
        .then(response => response.json())
        .then(obj=> {
            dispatch({type: 
        GET_ALL_POKEMONS, payload: obj})
    });
};