import { useContext } from "react";
import { HttpClientContext } from "../contexts/HttpClientContext";

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export const useHttpClient = () => {
  return useContext(HttpClientContext);
};
