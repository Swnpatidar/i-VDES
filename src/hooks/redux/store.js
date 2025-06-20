// import { configureStore } from "@reduxjs/toolkit";
// import authAmplifySessionReducer from "./slice/auth-session"
// export const store=configureStore({
//     reducer:{
//         amplifyAuthSession:authAmplifySessionReducer,
//     }
// })


// store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// Slices
import authAmplifySessionReducer from "./slice/auth-session";

// 1. Combine reducers
const rootReducer = combineReducers({
  amplifyAuthSession: authAmplifySessionReducer, // this will NOT be persisted
});

// 2. Persist config (only for selected reducers)
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 3. Configure store
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

// 4. Persistor export
export const persistor = persistStore(store);
