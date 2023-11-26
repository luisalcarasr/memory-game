import { createContext } from "react";
import axios, { AxiosInstance } from "axios";

export const client = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
  timeout: 10000,
});

export const HttpClientContext = createContext<AxiosInstance>(client);

export const HttpClientProvider = HttpClientContext.Provider;
