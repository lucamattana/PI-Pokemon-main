import React, {useEffect, useState }from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import Pagination from "../Pagination/Pagination";
import PokemonCard from "../PokemonCard/PokemonCard";
import './Home.css'


const Home = (props) => {
  
  const dispatch = useDispatch()
    
  const types = useSelector(state => state.types)
  const pokemons = useSelector(state=> state.pokemons)
  useEffect(()=>{
        if(!pokemons.length)dispatch(actions.getAllPokemons())
        dispatch(actions.getTypes())
    },[dispatch, pokemons.length]
  )
    
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(15);

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
  
  
  const indexOfLastPost = currentPage * pokemonsPerPage;
  const indexOfFirstPost = indexOfLastPost - pokemonsPerPage;
  const currentPosts = pokemons.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const prevPage = () => {
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
    }
 };

 const nextPage = () => {
    if (currentPage !== Math.ceil(pokemons.length / pokemonsPerPage)) {
       setCurrentPage(currentPage + 1);
    }
 };
  
  
  // console.log(pokemons)
  // console.log(currentPosts)

    return (
        <div className="home">
            <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a2e856d1-b7d1-4b70-ad6f-724be1ffc7b7/dek83dm-4449891e-34f4-4fb9-8cd7-c3f8f01ee6e9.png/v1/fill/w_1280,h_960,strp/pokemon_black_and_and_white_logo_png_transparentp_by_hunternation_dek83dm-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTYwIiwicGF0aCI6IlwvZlwvYTJlODU2ZDEtYjdkMS00YjcwLWFkNmYtNzI0YmUxZmZjN2I3XC9kZWs4M2RtLTQ0NDk4OTFlLTM0ZjQtNGZiOS04Y2Q3LWMzZjhmMDFlZTZlOS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.N7HdgbWVGLri-B9VmwqXqMjGQ1ozde6XdKsg9DnwjPk' alt='Pokemon' width="300px" height="200px"/>
           
            <form onSubmit={handlerSumbit}>
            <div className="container-search">
            <input value={name} className="search-bar" placeholder="Search..." onChange={handlerChange}></input>
            <button className="button-search"type="submit">Search</button>
            </div>

            </form>
            <hr style={{borderStyle: 'none'}}/>
            <div className='container-filters'>

            <div className='filters'>
            <label className ="filter-label">Filter by Created or API:</label>
            <select className ="filter-select" name="fCreated" onChange={handlerFilterCreated}>
              <option value="All">All</option>
              <option value="From Api">From Api</option>
              <option value="Created by You">Created by You</option>
            </select>
            </div>

            <div className='filters'>
            <label className ="filter-label">Filter by Types:</label>
            <select className ="filter-select" name='types' onChange={handlerFilterTypes}>
              <option value="All">All</option>
          {types && types.map(t => (<option value={t.name}>{t.name}</option>))}
            </select>
            </div>

            <div className='filters'>
            <label className ="filter-label">Sort by Alphabetical Order:</label>
            <select className ="filter-select" name="sortAZ" onChange={handlerAZ}>
              <option value="--">--</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
            </div>

            <div className='filters'>
            <label className ="filter-label">Sort by Attack:</label>
            <select className ="filter-select" name="sortAttack" onChange={handlerAttack}>
              <option value="--">--</option>
              <option value="Ascending">Ascending</option>
              <option value="Descending">Descending</option>
            </select>
            </div>
            </div>
            <button className = 'button-clear'onClick={handleClear}>Clear Filters</button>
            <hr style={{borderStyle: 'none'}}/>
            <div className='container-cards'>
                {currentPosts &&currentPosts.map(pokemons => {return (
                        <PokemonCard
                        id={pokemons.id}
                        name={pokemons.name}
                        types={pokemons.types || (pokemons.Types && pokemons.Types.map(type => type.name))}
                        image={pokemons.image}
                        />
                )}
            )}
            </div>
            <Pagination 
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={pokemons.length}
            currentPage={currentPage}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
            />
          
        
        </div>
    )
}


export default Home;