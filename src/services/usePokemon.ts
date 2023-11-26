import { useEffect, useState } from "react";
import { useHttpClient } from "../hooks";

type Pokemon = {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};

export const usePokemon = (initialName: string = "1") => {
  const client = useHttpClient();
  const [name, setName] = useState<string>(initialName);
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    client.get<Pokemon>(`pokemon/${name}`).then(({ data }) => {
      setPokemon(data);
    });
  }, [client, name]);

  return { pokemon, setPokemon: setName };
};
