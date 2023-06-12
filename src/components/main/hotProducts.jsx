import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../features/basketSlice";
import Spinner from "../main/spinner";
import Counter from "../basket/counter";

export default function HotProducts() {
  const allProducts = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [allowClick, setAllowClick] = useState(true);
  const selectBasket = useSelector((state) => state.basket);

  const checkProduct = (item) => {
    return selectBasket.basketProducts.find((el) => el.name === item.name);
  };

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
    <>
      <div className="text-center main-text ">Hot Products</div>
      <div className="hot-products-container">
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="hot-products"
        >
          {allProducts.value.length ? (
            allProducts.value.map(
              (item, i) =>
                i < 20 && (
                  <div
                    data-testid="product-item"
                    className="product-card"
                    key={i}
                  >
                    <Link
                      to={allowClick ? "/product/slug=" + item.slug : "#"}
                      state={{ item: item, i: i }}
                    >
                      <span className="product-thumbnail hot-thumbnail">
                        <img
                          width={160}
                          alt=""
                          src={require(`./../../assets/img/thumbnails/thumbnail${
                            item.name.length + Math.floor(item.price) - 6 - i
                          }.jpg`)}
                          onError={() =>
                            this.src !==
                            require(`./../../assets/img/thumbnails/thumbnail1.jpg`)
                              ? (this.src = require(`./../../assets/img/thumbnails/thumbnail1.jpg`))
                              : null
                          }
                        />
                      </span>
                    </Link>
                    <span className="product-price">$ {item.price}</span>
                    <span className="product-title text-default">
                      {item.name}
                    </span>
                    
                    {checkProduct(item) ? (
                <Counter product={checkProduct(item)} />
              ) : (
                <button
                  onClick={() => dispatch(addProduct({ product: item }))}
                  data-testid="add-button"
                  className="product-button text-bold fs-3"
                >
                  Add
                </button>
              )}
                  </div>
                )
            )
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </>
  );
}
