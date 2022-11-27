import React, { Suspense, useEffect } from "react";
import "./assets/css/styles.css";
import "./assets/css/predefined.css";
import Navbar from "./components/navbar";
import Products from "./components/products/products";
import Basket from "./components/basket/basket";
import Footer from "./components/footer";
import Spinner from "./components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "./features/productSlice";
const Options = React.lazy(() => import("./components/options/options"));

function App() {
  const dispatch = useDispatch();
  const querySelector = useSelector((state) => state.query.value);

  useEffect(() => {
    dispatch(getItems(querySelector));
  }, []);

  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <div className="container">
          <Basket />
          <Products />
          <Options />
        </div>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
