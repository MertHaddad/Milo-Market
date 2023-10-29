import React, { Suspense, useLayoutEffect } from "react";
import "./../assets/css/styles.css";
import "./../assets/css/home.css";
import "./../assets/css/predefined.css";
import Spinner from "../components/main/spinner";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "./../features/productSlice";
import SlideShow from "../components/main/slideshow";
import HotProducts from "../components/main/hotProducts";
import ItemCarousel from "../components/main/itemCarousel";
import { getAllItems, getTags } from "./../features/allProductsSlice";
import { getBrands } from "./../features/brandSlice";
import useDidMountEffect from "./../helpers/useDidMountEffect";
import { getFilteredItemsNumber } from "./../features/filteredProducts";
import { clearQuery } from "../features/querySlice";
import VideoBanner from "../components/main/videoBanner";

export default function Home() {
  const dispatch = useDispatch();
  const selectAllProducts = useSelector((state) => state.allProducts);
  const selectBrands = useSelector((state) => state.brand.value);
  const selectTags = useSelector((state) => state.allProducts.tags);
  const querySelector = useSelector((state) => state.query.value);

  useLayoutEffect(() => {
    dispatch(clearQuery());
    dispatch(getAllItems());
    dispatch(getBrands());
    dispatch(getFilteredItemsNumber());
    dispatch(getItems(querySelector));
  }, []);

  useDidMountEffect(() => {
    if (selectAllProducts.status === "fulfilled") {
      dispatch(getTags());
    }
  }, [selectAllProducts.status]);

  return (
    <main>
      <Suspense fallback={<Spinner />}>
        <VideoBanner/>
        <section className="content" >
        <ItemCarousel type="brand" title="Hot Brands" description="Check out our organic products and healthy snacks" items={selectBrands} />
        <ItemCarousel type="tag" title="Top Tags" description="Best collection for this year summer, most wanted all the time" items={selectTags} />
        <HotProducts />
        <SlideShow/>
        </section>
      </Suspense>
    </main>
  );
}
