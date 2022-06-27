import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
      <Switch>   
        <Route exact path='/' component={Home}/>
      </Switch>
      <div className="App">
        <h1>PetApp</h1>
      </div>      
    </BrowserRouter>
  );
}

export default App;
