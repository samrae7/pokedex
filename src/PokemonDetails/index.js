import React from "react";
import { useParams } from "react-router-dom";

export default function PokemonDetails() {
  const { name } = useParams();
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return <h1>{nameCapitalized}</h1>;
}
