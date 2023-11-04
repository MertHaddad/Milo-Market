import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/css/index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");
const container = document.getElementById("root");
const root = createRoot(container);
const options = {
  // passing the client secret obtained from the server
  clientSecret: "pi_1Gt0HP2eZvKYlo2CPIbW1JQ8_secret_SCBMjXqtJVrbzsxRNG3aXAnJQ",
};

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Elements stripe={stripePromise} options={options}>
        <App />
      </Elements>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
