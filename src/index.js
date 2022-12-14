import React from "react";
import { HashRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/css/index.css";
import Navbar from "./components/main/navbar";
import Footer from "./components/main/footer";
import UpButton from "./components/main/upButton";
const container = document.getElementById("root");
const root = createRoot(container);


root.render(
  <>
    <Provider store={store}>
      <HashRouter>
      <Navbar/>
        <App />
        <UpButton/>
      <Footer/>
      </HashRouter>
    </Provider>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
