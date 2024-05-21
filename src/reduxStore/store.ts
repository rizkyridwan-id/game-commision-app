import { applyMiddleware, createStore, Store } from "redux";
import {
  persistReducer,
  persistStore,
  Persistor,
  Transform,
} from "redux-persist";
import thunk, { ThunkMiddleware } from "redux-thunk";

import { composeWithDevTools } from "redux-devtools-extension";
import { RootAction, rootReducer, RootState } from "./index";
import { indexedDBStorage } from "@/utils";

const dataTransform: Transform<RootState<string>, RootState<string>> = {
  in: (inboundState: RootState<string>) => inboundState, // Fungsi untuk memodifikasi data saat menyimpan ke Redux Persist (tidak ada perubahan yang diperlukan)
  out: (outboundState: RootState<string>) => outboundState, // Fungsi untuk memodifikasi data saat mengambil dari Redux Persist (tidak ada perubahan yang diperlukan)
};

const persistConfig = {
  blacklist: ["form", "theme", "utility", "dataMaster"],
  key: "root",
  storage: indexedDBStorage,
  transforms: [dataTransform], // Gunakan transform yang telah dibuat
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(
  thunk as ThunkMiddleware<RootState<string>, RootAction>
);
const store: Store<RootState<string>, RootAction> = createStore(
  persistedReducer,
  composeWithDevTools(middleware)
);
const persistor: Persistor = persistStore(store);

export { store, persistor };