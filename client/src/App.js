import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";
import DogDetails from "./components/DogDetails";
import CreateDog from "./components/CreateDog";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/dogs/:id" component={DogDetails} />
        <Route exact path="/createdog" component={CreateDog} />
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
      </Switch>
      <div className="App"></div>
    </BrowserRouter>
  );
}

export default App;
