import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import App from "./App";
import { store } from "./hooks/redux/store";
import { Amplify } from 'aws-amplify';
// import amplifyconfig from './amplifyconfiguration.json';
let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));


// Amplify.configure(amplifyconfig);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter basename="/I-VDES">
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
