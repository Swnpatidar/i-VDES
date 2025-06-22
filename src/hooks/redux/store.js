
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authAmplifySessionReducer from "./slice/auth-session";

const rootReducer = combineReducers({
  amplifyAuthSession: authAmplifySessionReducer, 
});

const persistConfig = {
  key: "root",
  storage,
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
       ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

