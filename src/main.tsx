import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import { HttpClientContext, client } from "./contexts/HttpClientContext.ts";
import { PokemonsProvider } from "./contexts/PokemonsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HttpClientContext.Provider value={client}>
      <FluentProvider theme={teamsLightTheme}>
        <PokemonsProvider>
          <App />
        </PokemonsProvider>
      </FluentProvider>
    </HttpClientContext.Provider>
  </React.StrictMode>,
);
