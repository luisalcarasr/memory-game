import { useEffect } from "react";
import { usePokemon } from "../services";
import "./Card.css";
import { Logo } from "./Logo";

const CardBack = () => {
  return (
    <div className="card-face card-face--front">
      <Logo />
    </div>
  );
};

const CardFront = ({ name }: { name: string }) => {
  const { pokemon, setPokemon } = usePokemon();

  useEffect(() => {
    if (name) setPokemon(name);
  }, [setPokemon, name]);

  return (
    <div className="card-face card-face--back">
      <img
        src={pokemon?.sprites.other["official-artwork"].front_default}
        alt={pokemon?.name}
      />
      <span>{pokemon?.name ?? name}</span>
    </div>
  );
};

type CardProps = {
  onClick: () => void;
  flipped: boolean;
  name: string;
};

export const Card: React.FC<CardProps> = ({ name, flipped, onClick }) => {
  return (
    <div className={`card ${flipped ? "flipped" : ""}`} onClick={onClick}>
      <CardFront name={name} />
      <CardBack />
    </div>
  );
};
