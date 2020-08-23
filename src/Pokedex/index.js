import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Pokedex() {
  const [pokemon, setPokemon] = useState([]);

  // TODO loading state

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const { results } = await response.json();
        setPokemon(results);
      } catch {
        return null;
      }
    }
    fetchPokemon();
  }, []);

  return (
    <>
      <h1 className="pokedex-heading">My Pokedex</h1>
      <ul className="pokedex-list">
        {pokemon.map((poke, i) => (
          <li key={`poke-${i}`}>
            <Link to={poke.name}>{poke.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
