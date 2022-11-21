import React, {useEffect, useState }from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import * as actions from '../../redux/actions';
import PokemonCard from "../PokemonCard/PokemonCard";

const Home = (props) => {
  
  const dispatch = useDispatch()
    
  useEffect(()=>{
        dispatch(actions.getAllPokemons())
    },[dispatch]
  )
    
  useEffect( () => {
      dispatch(actions.getTypes())
    },[dispatch]
  )
  const types = useSelector(state => state.types)
  const pokemons = useSelector(state=> state.pokemons)
  
  const [, setOrder] = useState('');

  const handlerFilterCreated = (e) => {
     setOrder(dispatch(actions.FilterCreated(e.target.value)))
  }

  const handlerFilterTypes = (e) => {
    setOrder(dispatch(actions.filterTypes(e.target.value)))
  }

  const handlerAZ = (e) => {
    setOrder(dispatch(actions.filterAZ(e.target.value)))
  }

  const handlerAttack = (e) => {
   setOrder(dispatch(actions.filterAttack(e.target.value)))
  }

  const handleClear = (e) => {
    setOrder(dispatch(actions.getAllPokemons()))
    document.querySelectorAll('option').forEach(option => option.selected = false);
  }
  
  const [name, setName] = useState("")
  const handlerChange = event => {
    setName (event.target.value)
  }
  const handlerSumbit = (event) => {
    event.preventDefault()
    dispatch(actions.getPokemonByName(name))
    setName('')
  }
  // console.log(pokemons)




    return (
        <div className="Home">
            <h1>Home</h1>
            <form onSubmit={handlerSumbit}>
            <input value={name} name="SearchBar" placeholder="Search..." onChange={handlerChange}></input>
            <button type="submit">Search</button>
            </form>
            <hr />
            <label>Filter by Created or API:</label>
            <select name="fCreated" onChange={handlerFilterCreated}>
              <option value="All">All</option>
              <option value="From Api">From Api</option>
              <option value="Created by You">Created by You</option>
            </select>
            <label>Filter by Types:</label>
            <select name='types' onChange={handlerFilterTypes}>
              <option value="All">All</option>
          {types && types.map(t => (<option value={t.name}>{t.name}</option>))}
            </select>
            <label>Sort by Alphabetical Order:</label>
            <select name="sortAZ" onChange={handlerAZ}>
              <option value="--">--</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
            <label>Sort by Attack:</label>
            <select name="sortAttack" onChange={handlerAttack}>
              <option value="--">--</option>
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
            </select>
            <button onClick={handleClear}>Clear Filters</button>
            {/* <button name="sortAZ" onClick={handlerAZ}></button> */}
            {/* <button name="sortAttack" onClick={handlerAttack}></button> */}
            <hr />
            <Link to='/create-pokemon'>
                <button>Create Pokemon</button>
            </Link>
                {pokemons && pokemons.map(pokemons => {return (
                        <PokemonCard
                        id={pokemons.id}
                        name={pokemons.name}
                        types={pokemons.types || (pokemons.Types && pokemons.Types.map(type => type.name))}
                        image={pokemons.image}
                        />
                )}
            )}
          
        
        </div>
    )
}


export default Home;