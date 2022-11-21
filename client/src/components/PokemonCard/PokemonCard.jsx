import React from "react";
// import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
// import * as actions from '../../redux/actions'
import './PokemonCard.css'


const PokemonCard = (props) => {
    
    
    return (
        <>
        <NavLink to={`/details/${props.id}`}>
        <div className="card">
            <img src={props.image} alt='no hay foto'></img>
            <p>{props.name}</p>
            <p>Types: {(props.types && props.types.join(', '))}</p>
        </div>
        </NavLink>
        </>
    )
} 

  export default PokemonCard