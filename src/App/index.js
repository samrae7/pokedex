import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokedex from "../Pokedex";

export default function App() {
  return (
    <Router>
      <Pokedex />
      <Switch>
        <Route path="/:name" children={<PokemonDetails />} />
      </Switch>
    </Router>
  );
}
