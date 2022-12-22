import React, { Suspense, useLayoutEffect } from "react";
import "./../assets/css/styles.css";
import "./../assets/css/predefined.css";
import Spinner from "../components/main/spinner";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "./../features/productSlice";
import SlideShow from "../components/main/slideshow";
import HotProducts from "../components/main/hotProducts";

export default function Home() {
  const dispatch = useDispatch();
  const querySelector = useSelector((state) => state.query.value);

  useLayoutEffect(() => {
    dispatch(getItems(querySelector));
  }, []);

  return (
    <>
      <SlideShow />
      <Suspense fallback={<Spinner />}>
        <div className="home-container">
        </div>
        <HotProducts/>
      </Suspense>
    </>
  );
}
