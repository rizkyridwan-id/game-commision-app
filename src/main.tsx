import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./reduxStore/store.ts";
import { BrowserRouter, useRoutes } from "react-router-dom";

import "./index.css";
import { AppRoute } from "@components";

function App() {
  const element = useRoutes(AppRoute);
  return element;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
