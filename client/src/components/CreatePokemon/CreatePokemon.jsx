import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions";

// const validate = (form) => {
//   // let error = {};

//   // if(!form.name && form.name === Number) {
//   //   error.name = 'Name is required'
//   // }
// }

const CreatePokemon = () => {
  const dispatch = useDispatch()
  
    useEffect( () => {
      dispatch(actions.getTypes())
    },[dispatch]
    )
    const types = useSelector(state => state.types)


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

  //  const [error, setError] = useState({});

   const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]:e.target.value
    })
  }
  const handleSelect = (e) => {
    setForm({
      ...form,
      types: [...form.types, e.target.value]
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(actions.createPokemon(form))
  }

  return (
    <div>
      <Link to='/home'>
        <button>Back to Home</button>
      </Link>
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
        <select name='types' onChange={handleSelect}>
          {types && types.map(t => (<option value={t.name}>{t.name}</option>))}
        </select>
        {/* <ul>
          {types && types.map()}
        </ul> */}
        <button type="submit" >Create Pokemon</button>
      </form>
    </div>
  );
}

export default CreatePokemon;