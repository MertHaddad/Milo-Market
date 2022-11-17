import React, { Suspense, useEffect } from "react";
import Navbar from "./components/navbar";
import Products from "./components/products/products";
import Basket from "./components/basket/basket";
// import Options from "./components/options/options";
import Footer from "./components/footer";
import "./assets/css/styles.css";
import "./assets/css/predefined.css";
import { getItems } from "./features/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "./features/brandSlice";
import {
  getAllItems,
  getStockByBrands,
  getStockByTags,
  getTags,
} from "./features/allProductsSlice";
import { getFilteredItemsNumber } from "./features/filteredProducts";
import Spinner from "./components/spinner";
import Pagination from "./components/pagination/pagination";
const Options = React.lazy(() => import("./components/options/options"));

function App() {
  const dispatch = useDispatch();
  const brandsSelector = useSelector((state) => state.brand);
  const querySelector = useSelector((state) => state.query.value);
  const allProductsSelector = useSelector((state) => state.allProducts);

  const test = async (query) => {
    dispatch(getAllItems());
    dispatch(getFilteredItemsNumber());
    dispatch(getItems(query));
    dispatch(getBrands());
  };

  useEffect(() => {
    test(querySelector);
    console.log("products refreshed");
  }, []);

  useEffect(() => {
    if (allProductsSelector.status === "fulfilled") {
      dispatch(getTags());
      dispatch(getStockByTags([]));
    }
  }, [allProductsSelector.status]);

  useEffect(() => {
    if (
      brandsSelector.status === "fulfilled" &&
      allProductsSelector.status === "fulfilled"
    ) {
      dispatch(
        getStockByBrands({ brands: brandsSelector.value, selected: [] })
      );
    }
  }, [allProductsSelector.status, brandsSelector.status]);

  return (
    <>
      <Navbar />
        <Suspense fallback={<Spinner/>}>
      <div className="container">
        <Basket />
          <Products />
          <Options />
      </div>
      <Footer/>
        </Suspense>
    </>
  );
}

export default App;
