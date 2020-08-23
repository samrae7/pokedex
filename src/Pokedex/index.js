import React from "react";
import { Link } from "react-router-dom";
import { useFetchPokemonList } from "../pokemonHooks";

export default function Pokedex() {
  // TODO error state

  const res = useFetchPokemonList();

  // TODO add test for loading
  if (!res.response) {
    return <div>Loading...</div>;
  }

  const pokemon = res.response.results;

  return (
    <>
      <h1 className="pokedex-heading">My Pokedex</h1>
      <ul className="pokedex-list">
        {pokemon.map((poke, i) => (
          <li key={`poke-${i}`}>
            <Link to={{pathname: poke.name, state: { url: poke.url } }}>
              {poke.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
