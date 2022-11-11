import React, {useEffect }from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../redux/actions';
import PokemonCard from "../PokemonCard/PokemonCard";

const Home = () => {
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(actions.getAllPokemons())
    })
  const pokemons = useSelector(state=> state.pokemons)
//   console.log(pokemons)
    return (
        <div className="Home">
            <h1>Home</h1>
            <input className="SearchBar" placeholder="Search..."></input>
                <p>aca van a ir los pokes</p>
                {pokemons.map(pokemons => {return (
                        <PokemonCard
                        name={pokemons.name}
                        hp={pokemons.hp}
                        />
                )}
                )}
            <Link to='/create-pokemon'>
                <button>Create Pokemon</button>
            </Link>
            
        </div>
    )
}


export default Home;