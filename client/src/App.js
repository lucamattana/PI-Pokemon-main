import './App.css';
import { Route } from 'react-router-dom';
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Pokemon by Luca</h1>
      <Route path='/'>
        <Nav />
      </Route>
      <Route exact path='/'>
        <Home />
      </Route>
    </div>
  );
}

export default App;
