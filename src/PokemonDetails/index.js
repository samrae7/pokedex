import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useFetch } from "../pokemonHooks";

export default function PokemonDetails(props) {
  const { name } = useParams();
  const location = useLocation();
  const res = useFetch(location.state.url);
  if (!res.response) {
    return <div>Loading...</div>;
  }
  const { types } = res.response;
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <>
      <h1>{nameCapitalized}</h1>
      <p>
        <span>Types: </span>
        {types.map((type, i) => (
          <span key={type.type.name}>
            {type.type.name}
            {i < types.length - 1 ? "," : ""}
            <span> </span>
          </span>
        ))}
      </p>
    </>
  );
}
