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
import sessionStorageWrapper from "./sessionStorageWrapper";


//AWS Amplify
Amplify.configure({
  ...amplifyconfig, //All cognito configure come from here
  Auth: {
    region: amplifyconfig.aws_cognito_region,
    userPoolId: amplifyconfig.aws_user_pools_id,
    userPoolWebClientId: amplifyconfig.aws_user_pools_web_client_id,
    identityPoolId: amplifyconfig.aws_cognito_identity_pool_id,
    storage:window.sessionStorage, //session-safe storage, storage is override here
  }
});



let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store} >
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <BrowserRouter basename="/I-VDES">
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
