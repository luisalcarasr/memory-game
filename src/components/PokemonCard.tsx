import {
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Skeleton,
  SkeletonItem,
} from "@fluentui/react-components";
import { usePokemon } from "../services";
import { capitalize } from "lodash";
import { useInView } from "react-intersection-observer";
import { createRef, useState } from "react";

const SkeletonPokemonCard: React.FC = () => {
  const ref = createRef<HTMLDivElement>();

  return (
    <Skeleton>
      <SkeletonItem
        ref={ref}
        shape="square"
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "100%",
        }}
      />
    </Skeleton>
  );
};

type PokemonCardProps = {
  name: string;
};

export const PokemonCard: React.FC<PokemonCardProps> = ({ name }) => {
  const [loading, setLoading] = useState(true);
  const { pokemon } = usePokemon(name);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  return (
    <Card ref={ref}>
      <CardHeader header={capitalize(name)} />
      <CardPreview>
        {inView && pokemon && (
          <img
            onLoad={() => setLoading(false)}
            src={pokemon?.sprites.other["official-artwork"].front_default}
            alt={pokemon?.name}
          />
        )}
        {loading && <SkeletonPokemonCard />}
      </CardPreview>
      <CardFooter>{}</CardFooter>
    </Card>
  );
};
