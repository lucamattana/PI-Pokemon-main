import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../redux/actions";
import './CreatePokemon.css'



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
  
  const handleSubmit = (e) => {
    dispatch(actions.createPokemon(form))
    // e.preventDefault();
    // e.target.reset()
    // setForm({
    //   "name": "",
    //   "hp": 0,
    //   "attack": 0,
    //   "defense": 0,
    //   "speed": 0,
    //   "height": 0,
    //   "weight": 0,
    //   "types": []
    // })
  }

  return (
    <div className="all-form-container">
      <Link to='/home'>
        <button className="button-back-form">{`< Back`}</button>
      </Link>
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
      <div className="inputs-label-form">
        <label>Name: </label>
        <input className="inputs-form" type='text' name='name' onChange={handleChange} />
        {error.name && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.name}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        <label>hp: </label>
        <input className="inputs-form" type='number' name='hp' onChange={handleChange} />
        {error.hp && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.hp}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        <label>Attack: </label>
        <input className="inputs-form" type='number' name='attack' onChange={handleChange} />
        {error.attack && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.attack}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        <label>Defense: </label>
        <input className="inputs-form" type='number' name='defense' onChange={handleChange} />
        {error.defense && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.defense}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        <label>Speed: </label>
        <input className="inputs-form" type='number' name='speed' onChange={handleChange} />
        {error.speed && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.speed}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        <label>Height: </label>
        <input className="inputs-form" type='number' name='height' onChange={handleChange} />
        {error.height && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.height}</p>)}
        <hr style={{borderStyle: 'none'}}/>
        <label>Weight: </label>
        <input className="inputs-form" type='number' name='weight' onChange={handleChange} />
        {error.weight && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.weight}</p>)}
        <hr style={{borderStyle: 'none'}}/>
      </div>

        <div className="checklist-form">
          <div>Types: </div>
            {error.types && (<p style={{color: 'rgb(222, 15, 15)'}}>{error.types}</p>)}
          <div className="list-container-form">
            {types && types.map((item, index) => (
              <div key={index}>
                <input value={item.name} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="submit-form" type="submit"
        disabled={!form.name || error.name || error.hp || error.attack || error.defense || error.speed || error.height || error.weight || error.types}
        >Create Pokemon</button>
      </form>
    </div>
    </div>
  );
}

export default CreatePokemon;