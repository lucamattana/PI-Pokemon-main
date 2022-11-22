import React, {useEffect }from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions'
import './PokemonDetail.css'


const PokemonDetail = (props) => {
    const dispatch = useDispatch()
        
    const pokemon = useSelector(state=> state.pokemonDetail)
    
    useEffect(()=>{
            dispatch(actions.getPokemonById(props.match.params.id))
        },[dispatch, props.match.params.id])

console.log(pokemon)
    return (
        <div className="detail-page-container">
            <h3 className="title-detail">Details</h3>
        <div className="detail-container">
            <img className='img-detail' src={pokemon.image} alt='Pokemon' width="250px" height="250px"></img>
            <div className="details">
            <p className="name-detail">{pokemon.name}</p>
            <p>id: {pokemon.id}</p>
            <p>hp: {pokemon.hp}</p>
            <p>Attack: {pokemon.attack}</p>
            <p>Defense: {pokemon.defense}</p>
            <p>Speed: {pokemon.speed}</p>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Types: {(pokemon.types && pokemon.types.join(', ')) || (pokemon.Types && pokemon.Types.map(type => type.name + ', '))}</p>
        </div>
        </div>
        </div>
    )
} 

  export default PokemonDetail;