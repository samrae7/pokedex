import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokedex from "../Pokedex";
import PokemonDetails from "../PokemonDetails";

import "./App.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Pokedex />} />
        <Route path="/:name" children={<PokemonDetails />} />
      </Switch>
    </Router>
  );
}
