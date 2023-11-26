import { ReactNode } from "react";
import { usePokemons } from "../services";
import { PokemonCard } from "./PokemonCard";

type GridProps = {
  columns: number;
  content: ReactNode[];
};

const Grid: React.FC<GridProps> = ({ content, columns }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        alignItems: "stretch",
      }}
    >
      {content.map((item) => (
        <div
          style={{
            flex: `1 1 calc(${100 / columns}% - 1rem)`,
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export const PokemonList = () => {
  const { pokemons } = usePokemons();

  return (
    <>
      <Grid
        columns={10}
        content={pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      />
    </>
  );
};
