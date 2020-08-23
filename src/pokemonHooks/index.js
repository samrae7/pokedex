import { useState, useEffect } from "react";

export function useFetch(url = "", options = {}) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url, options);
        const response = await res.json();
        setResponse(response);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);
  return { response, error };
}

export function useFetchPokemonList() {
  return useFetch("https://pokeapi.co/api/v2/pokemon?limit=150");
}
