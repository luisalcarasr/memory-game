import { shuffle } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "./components";
import { Card } from "./components/Card";
import { usePokemons } from "./services";

export const getIcons = () => {
  return [];
};

export const App = () => {
  const [size] = useState(12);
  const [attempts, setAttempts] = useState(0);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [timeoutIndex, setTimeoutIndex] = useState<number | null>(null);
  const { pokemons } = usePokemons();

  const deck = useMemo(() => {
    const items = [...Array(size)].map((_, i) => i);
    return shuffle([...items, ...items]);
  }, [size]);

  useEffect(() => {
    if (flipped.length === 2) {
      setAttempts(attempts + 1);
      const [a, b] = flipped;
      if (deck[a] === deck[b] && a !== b) {
        if (!matched.includes(deck[a])) {
          setMatched([...matched, deck[a]]);
        }
      }
      setTimeoutIndex(
        setTimeout(() => {
          setFlipped([]);
        }, 1000),
      );
    }

    if (matched.length === size) {
      const score: number[] = JSON.parse(
        window.localStorage.getItem("score") ?? "[]",
      );
      score.push(Math.trunc((matched.length / attempts) * 100));
      window.localStorage.setItem("score", JSON.stringify(score));
      alert(
        `You won! Score: ${
          matched.length
        } Attempts: ${attempts} Total Score: ${Math.trunc(
          (matched.length / attempts) * 100,
        )}`,
      );
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flipped]);

  const onFlip = (i: number) => {
    if (flipped.length === 2) {
      clearTimeout(timeoutIndex!);
      setFlipped([i]);
    } else if (matched.includes(deck[i])) {
      setFlipped([]);
    } else {
      setFlipped([...flipped, i]);
    }
  };

  return (
    <>
      <Logo />
      <div>
        Score: {matched.length} Attempts: {attempts} Total Score:{" "}
        {Math.trunc((matched.length / attempts) * 100) || 0} Previous scores:{" "}
        {window.localStorage.getItem("score") ?? "No scores yet"}
      </div>
      {deck.map((i, key) => (
        <>
          <Card
            flipped={flipped.includes(key) || matched.includes(i)}
            onClick={() => onFlip(key)}
            key={key}
            name={pokemons[i]?.name}
          />
        </>
      ))}
    </>
  );
};
