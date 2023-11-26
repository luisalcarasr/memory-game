import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { PaginatedResponse, useHttpClient } from "../hooks";

export type Pokemon = {
  name: string;
  url: string;
};

export const PokemonsContext = createContext<Pokemon[]>([]);

export const PokemonsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const http = useHttpClient();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    http
      .get<PaginatedResponse<Pokemon>>("pokemon", {
        params: {
          limit: -1, // Set to -1 to get all pokemons
        },
      })
      .then(({ data }) => {
        setPokemons(data.results);
      });
  }, [http]);

  return (
    <PokemonsContext.Provider value={pokemons}>
      {children}
    </PokemonsContext.Provider>
  );
};
