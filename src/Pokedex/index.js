import React, { useEffect, useState } from "react";

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
          <li key={`poke-${i}`}>{poke.name}</li>
        ))}
      </ul>
    </>
  );
}
