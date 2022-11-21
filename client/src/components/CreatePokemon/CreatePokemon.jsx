import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions";



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
  
  const [error, setError] = useState({});
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
    setError(validate({
      ...form,
      [e.target.name] : e.target.value
    }))
  }
  const validate = (form) => {
  
    let error = {};
   if (!form.name) {
    error.name = 'Name is required'
    } else if (!/^[a-z]+$/.test(form.name)) {
      error.name = 'Name can only contain lowercase letters'
    }
  
    if (!form.hp) {
      error.hp = 'Hp value is required'
    }
  
    if (!form.attack) {
      error.attack = 'Attack value is required'
    }
  
    if (!form.defense) {
      error.defense = 'Defense value is required'
    }
  
    if (!form.speed) {
      error.speed = 'Speed value is required'
    }
  
    if (!form.height) {
      error.height = 'Height value is required'
    }
  
    if (!form.weight) {
      error.weight = 'Weight value is required'
    }

    if (form.types.length === 0) { // no esta funcionando como intended.
      error.types = 'Select at least one type'
    }
    return error;
  }
  
  const [checked, setChecked] = useState([]);
  
  const handleCheck = (e) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
    setForm({
      ...form,
      types: [...updatedList]
    })
    setError(validate({
      ...form,
      types : [...updatedList]
    }))
  }
  const isChecked = (item) =>
  checked.includes(item) ? "checked-item" : "not-checked-item";
  
  const checkedItems = checked.length
  ? checked.reduce((total, item) => {
    return total + ', ' + item;
  })
  : '';
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
        {error.name && (<p>{error.name}</p>)}
        <hr></hr>
        <label>hp: </label>
        <input type='number' name='hp' onChange={handleChange} />
        {error.hp && (<p>{error.hp}</p>)}
        <hr></hr>
        <label>Attack: </label>
        <input type='number' name='attack' onChange={handleChange} />
        {error.attack && (<p>{error.attack}</p>)}
        <hr></hr>
        <label>Defense: </label>
        <input type='number' name='defense' onChange={handleChange} />
        {error.defense && (<p>{error.defense}</p>)}
        <hr></hr>
        <label>Speed: </label>
        <input type='number' name='speed' onChange={handleChange} />
        {error.speed && (<p>{error.speed}</p>)}
        <hr></hr>
        <label>Height: </label>
        <input type='number' name='height' onChange={handleChange} />
        {error.height && (<p>{error.height}</p>)}
        <hr></hr>
        <label>Weight: </label>
        <input type='number' name='weight' onChange={handleChange} />
        {error.weight && (<p>{error.weight}</p>)}
        <hr></hr>
        <div className="checkList">
          <div>Types: </div>
            {error.types && (<p>{error.types}</p>)}
          <div className="listContainer">
            {types && types.map((item, index) => (
              <div key={index}>
                <input value={item.name} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          {`Checked types are: ${checkedItems}`}
        </div>
        
        <button type="submit" 
        disabled={error.name || error.hp || error.attack || error.defense || error.speed || error.height || error.weight}
        >Create Pokemon</button>
      </form>
    </div>
  );
}

export default CreatePokemon;