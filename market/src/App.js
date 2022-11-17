import React, { Suspense} from "react";
import "./assets/css/styles.css";
import "./assets/css/predefined.css";
import Navbar from "./components/navbar";
import Products from "./components/products/products";
import Basket from "./components/basket/basket";
import Footer from "./components/footer";
import Spinner from "./components/spinner";
const Options = React.lazy(() => import("./components/options/options"));

function App() {
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
