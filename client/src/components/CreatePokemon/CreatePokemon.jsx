import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";



const CreatePokemon = () => {
   const [form, setForm] = useState({
    "name": "",
    "hp": 0,
    "attack": 0,
    "defense": 0,
    "speed": 0,
    "height": 0,
    "weight": 0,
    "types": []
   })

   const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
  }

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.createPokemon(form))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type='text' name='name' onChange={handleChange} />
        <hr></hr>
        <label>hp: </label>
        <input type='number' name='hp' onChange={handleChange} />
        <hr></hr>
        <label>Attack: </label>
        <input type='number' name='attack' onChange={handleChange} />
        <hr></hr>
        <label>Defense: </label>
        <input type='number' name='defense' onChange={handleChange} />
        <hr></hr>
        <label>Speed: </label>
        <input type='number' name='speed' onChange={handleChange} />
        <hr></hr>
        <label>Height: </label>
        <input type='number' name='height' onChange={handleChange} />
        <hr></hr>
        <label>Weight: </label>
        <input type='number' name='weight' onChange={handleChange} />
        <hr></hr>
        <label>Types: </label>
        <input type='object' name='types' onChange={handleChange} />
        <button type="submit">Create Pokemon</button>
      </form>
    </div>
  );
}

export default CreatePokemon;