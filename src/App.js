import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Home from "./routes/home";
import Product from "./routes/product";
import Checkout from "./routes/checkout";
import Contact from "./routes/contact";
import NoMatch from "./routes/noMatch";
import Store from "./routes/store";

export default function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="store" element={<Store />} />
      <Route path="product/:slug" element={<Product />}>
        <Route path="checkout" element={<Checkout />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}
