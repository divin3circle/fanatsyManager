import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { fantasyDataApi } from "../app/service/fantasyData";

export const store = configureStore({
  reducer: {
    [fantasyDataApi.reducerPath]: fantasyDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fantasyDataApi.middleware),
});

setupListeners(store.dispatch);
