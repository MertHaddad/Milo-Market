import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../features/basketSlice";
import Spinner from "../main/spinner";
import nextIcon from "./../../assets/img/next.svg";

export default function HotProducts() {
  let screenIndex = 0;
  const hotProducts = useRef(null);
  const allProducts = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleScroll = (amount) => {
    screenIndex += amount;
    screenIndex = screenIndex > 3600 ? 2700 : screenIndex < 0 ? 0 : screenIndex;
    hotProducts?.current.scroll({
      left: screenIndex,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className="text-center main-text ">Hot Products</div>
      <div className="hot-products-container">
        <div
          className="nav-buttons prev pointer"
          onClick={() => {
            handleScroll(-900);
          }}
        >
          <img alt="" src={nextIcon} width="32px" />{" "}
        </div>
        <div className="hot-products" ref={hotProducts}>
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
                      to={"/product/slug=" + item.slug}
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
                    <button
                      onClick={() => dispatch(addProduct({ product: item }))}
                      data-testid="add-button"
                      className="product-button text-bold fs-3 "
                    >
                      Add
                    </button>
                  </div>
                )
            )
          ) : (
            <Spinner />
          )}
        </div>
        <div className="nav-buttons pointer" onClick={() => handleScroll(900)}>
          <img alt="" src={nextIcon} width="32px" />{" "}
        </div>
      </div>
    </>
  );
}
