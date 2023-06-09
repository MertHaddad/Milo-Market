import React, { Suspense, useLayoutEffect } from "react";
import "./../assets/css/styles.css";
import "./../assets/css/predefined.css";
import Products from "./../components/products/products";
import Basket from "./../components/basket/basket";
import Footer from "../components/main/footer";
import Spinner from "../components/main/spinner";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "./../features/productSlice";
import { useLocation } from "react-router-dom";
import { setQuery } from "../features/querySlice";
import { useEffect } from "react";
const Options = React.lazy(() => import("./../components/options/options"));

export default function Store() {
  const dispatch = useDispatch();
  const querySelector = useSelector((state) => state.query.value);
  const location = useLocation();

  const { item = {}, type = {} } = location?.state || {};
  useEffect(() => {
    if (item) {
      let query = "";
      if (type === "brand") {
        query = `manufacturer=${item.slug}`;
      } else if (type === "tag") {
        query = `tags_like=(?<!\\s)\\b${item}\\b(?!\\s)`;
      }
      dispatch(setQuery(query));
    }
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  }, []);

  useLayoutEffect(() => {
    dispatch(getItems(querySelector));
  }, []);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <div className="container">
          <Basket />
          <Products />
          <details className="mobile-filters">
            <summary className="fs-2 text-darkest-gray">Filter/Sort</summary>
            <Options />
          </details>
          <span className="screen-filters">
            <Options />
          </span>
        </div>
        <Footer />
      </Suspense>
    </>
  );
}
