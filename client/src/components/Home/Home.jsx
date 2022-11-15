import React, {useEffect }from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../redux/actions';
import PokemonCard from "../PokemonCard/PokemonCard";

const Home = (props) => {
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(actions.getAllPokemons())
    },[dispatch])
  const pokemons = useSelector(state=> state.pokemons)
//   console.log(pokemons)
    return (
        <div className="Home">
            <h1>Home</h1>
            <input className="SearchBar" placeholder="Search..."></input>
            <Link to='/create-pokemon'>
                <button>Create Pokemon</button>
            </Link>
                {pokemons && pokemons.map(pokemons => {return (
                        <PokemonCard
                        id={pokemons.id}
                        name={pokemons.name}
                        types={pokemons.types}
                        image={pokemons.image}
                        />
                )}
                )}
        
        </div>
    )
}


export default Home;