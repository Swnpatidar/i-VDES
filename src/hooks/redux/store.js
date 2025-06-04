import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import accessToken from "./slice/access-token";
import loggedUser from "./slice/logged-user";
import { FileUpload } from "./slice/file-upload";
import permission from "./slice/permission";

const rootReducer = combineReducers({
  accessToken: accessToken,
  loggedUser: loggedUser,
  permission: permission,
  FileUpload: FileUpload,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: [thunk],
// });

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
