import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./hooks/redux/store";
import App from "./App";
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';


Amplify.configure(amplifyconfig);
let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store} >
      <PersistGate persistor={persistor}>

      <React.StrictMode>
        <BrowserRouter basename="/I-VDES">
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
