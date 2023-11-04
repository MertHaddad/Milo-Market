/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../main/spinner";
import ProductItem from "./../products/productItem";

export default function HotProducts() {
  const allProducts = useSelector((state) => state.product);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [allowClick, setAllowClick] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setAllowClick(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const scroll = x - startX;
    containerRef.current.scrollLeft = scrollLeft - scroll;
    setAllowClick(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      setAllowClick(true);
    }, 100);
  };

  return (
    <section>
      <div className="main-title main-text">Hot Products</div>
      <div className="main-title text-darkest-gray">
        Especially picked products for you, check the store for more.
      </div>
      <div className="hot-products-container">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="hot-products hide-scroll-bar"
        >
          {allProducts.value.length ? (
            allProducts.value.map((item, i) => (
              <ProductItem item={item} i={i} key={i} allowClick={allowClick} />
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </section>
  );
}
