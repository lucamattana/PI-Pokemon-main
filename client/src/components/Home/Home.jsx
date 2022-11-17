import React, {useEffect, useState }from "react";
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
  const [name, setName] = useState("")
  const handlerChange = event => {
    setName (event.target.value)
  }
  const handlerSumbit = (event) => {
    event.preventDefault()
    dispatch(actions.getPokemonByName(name))
  }
//   console.log(pokemons)
    return (
        <div className="Home">
            <h1>Home</h1>
            <form onSubmit={handlerSumbit}>
            <input value={name} name="SearchBar" placeholder="Search..." onChange={handlerChange}></input>
            <button type="submit">Search</button>
            </form>
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