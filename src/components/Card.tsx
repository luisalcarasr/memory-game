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
    <div
      className="card"
      style={{
        backgroundColor: flipped ? "cyan" : "gray",
        minWidth: "50px",
        minHeight: "80px",
      }}
      onClick={onClick}
    >
      <img
        onLoad={() => console.log(false)}
        src={pokemon?.sprites.other["official-artwork"].front_default}
        alt={pokemon?.name}
        width="60"
        style={{
          display: flipped ? "block" : "none",
        }}
      />
    </div>
  );
};
