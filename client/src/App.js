import './App.css';
import { Route } from 'react-router-dom';
import React from 'react';
import Home from './components/Home/Home';
import LandPag from './components/Landing Page/LandingPage';
import CreatePokemon from './components/CreatePokemon/CreatePokemon';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Route path='/'>
        <Nav />
      </Route>
      <Route exact path='/'>
        <LandPag />
      </Route>
      <Route exact path='/home'>
        <Home />
      </Route>
      <Route exact path='/create-pokemon' component={CreatePokemon} />
      <Route exact path='/details/:id' component={PokemonDetail} />
    </div>
  );
}

export default App;
