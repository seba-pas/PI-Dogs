import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path='/' component={LandingPage}/>
        <Route exact path='/Home' component={Home}/> */}
      </Switch>
      <div className="App"></div>
    </BrowserRouter>
  );
}

export default App;
