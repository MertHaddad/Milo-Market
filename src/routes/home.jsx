import React, { Suspense, useState, useEffect } from "react";
import "./../assets/css/styles.css";
import "./../assets/css/home.css";
import "./../assets/css/predefined.css";
import Spinner from "../components/main/spinner";
import SlideShow from "../components/main/slideshow";
import HotProducts from "../components/main/hotProducts";
import ItemCarousel from "../components/main/itemCarousel";
import VideoBanner from "../components/main/videoBanner";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "./../features/productSlice";
import { getAllItems, getTags, getTypes } from "./../features/allProductsSlice";
import { getBrands } from "./../features/brandSlice";
import { clearQuery } from "../features/querySlice";
import { getFilteredItemsNumber } from "./../features/filteredProducts";
import useDidMountEffect from "./../helpers/useDidMountEffect";

export default function Home() {
  const [topTags, setTopTags] = useState([]);
  const [hotBrands, setHotBrands] = useState([]);
  const dispatch = useDispatch();
  const selectAllProducts = useSelector((state) => state.allProducts);
  const selectBrands = useSelector((state) => state.brand.value);
  const selectTags = useSelector((state) => state.allProducts.tags);
  const querySelector = useSelector((state) => state.query.value);

  useEffect(() => {
    dispatch(clearQuery());
    dispatch(getAllItems());
    dispatch(getBrands());
    dispatch(getFilteredItemsNumber());
    dispatch(getItems(querySelector));
  }, []);

  useDidMountEffect(() => {
    if (selectAllProducts.status === "fulfilled") {
      dispatch(getTags());
      dispatch(getTypes());
    }
  }, [selectAllProducts.status]);

  useEffect(() => {
    if (selectTags.length) {
      setTopTags(selectTags.slice(0, 15));
    }
    if (selectBrands.length) {
      setHotBrands(selectBrands.slice(0, 15));
    }
  }, [selectTags]);

  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <VideoBanner />
        <section className="content">
          <ItemCarousel
            type="brand"
            title="Hot Brands"
            description="Check out our organic products and healthy snacks"
            items={hotBrands}
          />
          <ItemCarousel
            type="tag"
            title="Top Tags"
            description="Best collection for this year summer, most wanted all the time"
            items={topTags}
          />
          <HotProducts />
          <SlideShow />
        </section>
      </Suspense>
    </main>
  );
}
