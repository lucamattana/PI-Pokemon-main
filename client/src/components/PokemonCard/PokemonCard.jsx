import React from "react";
import { NavLink } from "react-router-dom";
import './PokemonCard.css';

const PokemonCard = (props) => {
    
   
    // console.log(props)
    return (
        <div className="outside-card">
        <div className='inside-card'>
        <NavLink to={`/details/${props.id}`}>
        <div>
            <img src={props.image} alt='Pokemon' width="96px" height="96px"></img>
            <p className='card-name'>{props.name}</p>
            <p className='card-types'>Types: {(props.types && props.types.join(', '))}</p>
        </div>
        </NavLink>
        </div>
        </div>
    )
} 

  export default PokemonCard