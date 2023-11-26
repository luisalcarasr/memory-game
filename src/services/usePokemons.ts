import { useContext } from "react";
import { PokemonsContext } from "../contexts/PokemonsContext";
import { usePaginator } from "../hooks/usePaginator";

export const usePokemons = () => {
  const pokemons = useContext(PokemonsContext);

  return {
    pokemons,
    paginator: usePaginator(), // TODO: Implement usePaginator hook.
  };
};
