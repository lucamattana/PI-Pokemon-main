import React from "react";
// import * as actions from '../../redux/actions'

const PokemonCard = (props) => {
    return (
        <div className="card">
            <p>Name: {props.name}</p>
            <p>hp: {props.hp}</p>
        </div>
    )
} 

  export default PokemonCard