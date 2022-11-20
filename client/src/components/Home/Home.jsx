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
  
  const [order, setOrder] = useState('');

  const handlerFilterCreated = (e) => {
      if (e.target.value === "All") {
        setOrder(pokemons)
    }
      else if(e.target.value === "Created by You") {
       console.log(pokemons.filter(p => p.id.length > 5))
       setOrder(pokemons.filter(p => p.id.length > 5))
    } 
      else if (e.target.value === "From Api") {
      console.log(pokemons.filter(p => typeof(p.id) === "number"))
      setOrder(pokemons.filter(p => typeof(p.id) === "number"))
      }
      e.preventDefault()
      dispatch(handlerFilterCreated(order))
  }

  const handlerFilterTypes = (e) => {
    if (e.target.value === "All") {
      console.log(pokemons)
  } else {
    console.log(pokemons.filter(p => p.types.includes(e.target.value)))
  }
  }

  const handlerAZ = (e) => {
    if (e.target.value === "--") {
      console.log(pokemons)
      
    }
    else if(e.target.value === "A-Z") {
      const strAscending = [...pokemons].sort((a, b) =>
      a.name > b.name ? 1 : -1,
    );
    console.log(strAscending)
    } 
    else if (e.target.value === "Z-A") {
      const strDescending = [...pokemons].sort((a, b) =>
    a.name > b.name ? -1 : 1,
    );
    console.log(strDescending);
    }
  }

  const handlerAttack = (e) => {
    if (e.target.value === "--") {
      console.log(pokemons)
    }
    else if(e.target.value === "Ascending") {
      const numAscending = [...pokemons].sort((a, b) => a.attack - b.attack);
      console.log(numAscending);
    } 
    else if (e.target.value === "Descending") {
        const numDescending = [...pokemons].sort((a, b) => b.attack - a.attack);
        console.log(numDescending);
    }
  }
  
  const [name, setName] = useState("")
  const handlerChange = event => {
    setName (event.target.value)
  }
  const handlerSumbit = (event) => {
    event.preventDefault()
    dispatch(actions.getPokemonByName(name))
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
                        types={pokemons.types}
                        image={pokemons.image}
                        />
                )}
            )}
        
        </div>
    )
}


export default Home;