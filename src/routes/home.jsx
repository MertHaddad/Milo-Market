import React, { Suspense, useLayoutEffect } from "react";
import "./../assets/css/styles.css";
import "./../assets/css/home.css";
import "./../assets/css/predefined.css";
import Spinner from "../components/main/spinner";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "./../features/productSlice";
import SlideShow from "../components/main/slideshow";
import HotProducts from "../components/main/hotProducts";
import TopBrands from "../components/main/topBrands";
import TopTags from "../components/main/topTags";

import { getAllItems, getTags } from "./../features/allProductsSlice";
import { getBrands } from "./../features/brandSlice";
import useDidMountEffect from "./../helpers/useDidMountEffect";
import { getFilteredItemsNumber } from "./../features/filteredProducts";

export default function Home() {
  const dispatch = useDispatch();

  const selectAllProducts = useSelector((state) => state.allProducts);

  useLayoutEffect(() => {
    dispatch(getAllItems());
    dispatch(getBrands());
    dispatch(getFilteredItemsNumber());
  }, []);

  useDidMountEffect(() => {
    if (selectAllProducts.status === "fulfilled") {
      dispatch(getTags());
      //dispatch(getStockByTags({selected:[],filteredProductsNum:selectAllProducts.value.length}));
    }
  }, [selectAllProducts.status]);

  const querySelector = useSelector((state) => state.query.value);

  useLayoutEffect(() => {
    dispatch(getItems(querySelector));
  }, []);

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <div className="home-container">
          <SlideShow />
          <HotProducts />
          <TopBrands />
          <TopTags />
        </div>
      </Suspense>
    </>
  );
}
