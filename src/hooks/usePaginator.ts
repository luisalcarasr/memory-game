import { useMemo, useState } from "react";

export type Paginator = {
  page: number;
  next: () => void;
  previous: () => void;
  setPage: (page: number) => void;
  limit: number;
  offset: number;
};

export const usePaginator = (limit: number = 10): Paginator => {
  const [page, setPage] = useState(1);
  const offset = useMemo(() => (page - 1) * limit, [page, limit]);

  const next = () => setPage(page + 1);
  const previous = () => setPage(page - 1);

  return {
    page,
    next,
    previous,
    setPage,
    limit,
    offset,
  };
};
