import React, {useEffect }from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions'
import { Link } from "react-router-dom";

const PokemonDetail = (props) => {
    const dispatch = useDispatch()
        
    const pokemon = useSelector(state=> state.pokemonDetail)
    
    useEffect(()=>{
            dispatch(actions.getPokemonById(props.match.params.id))
        },[dispatch, props.match.params.id])

console.log(pokemon)
    return (
        <div className="detail">
            <Link to='/home'>
            <button>Back</button>
            </Link>
            <h3>Details</h3>
            <img src={pokemon.image} alt='no hay foto'></img>
            <p>{pokemon.name}</p>
            <p>id: {pokemon.id}</p>
            <p>hp: {pokemon.hp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {(pokemon.types && pokemon.types.join(', ')) || (pokemon.Types && pokemon.Types.map(type => type.name + ', '))}</p>
        </div>
    )
} 

  export default PokemonDetail;