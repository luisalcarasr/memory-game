import { useEffect } from "react";
import { usePokemon } from "../services";
import "./Card.css";

type CardProps = {
  onClick: () => void;
  flipped: boolean;
  name: string;
};

export const Card: React.FC<CardProps> = ({ name, flipped, onClick }) => {
  const { pokemon, setPokemon } = usePokemon();

  useEffect(() => {
    if (name) setPokemon(name);
  }, [setPokemon, name]);

  return (
    <div className="card" onClick={onClick}>
      <img
        src={pokemon?.sprites.other["official-artwork"].front_default}
        alt={pokemon?.name}
        style={{
          visibility: flipped ? "visible" : "hidden",
        }}
      />
      <span
        style={{
          visibility: flipped ? "visible" : "hidden",
        }}
      >
        {pokemon?.name ?? name}
      </span>
    </div>
  );
};
