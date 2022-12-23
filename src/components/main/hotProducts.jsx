import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../features/basketSlice";
import Spinner from "../main/spinner";

export default function HotProducts() {
  const allProducts = useSelector((state) => state.product);
  const dispatch = useDispatch();
  return (
    <>
    <Link to="/store" state={{ item: {}, type: {} }} >
      <div className=" fs-1 product-thumbnail text-center p-4 text-bold pointer visit-store-button" >
        <div className="visit-store-text">Visit Store</div>
        </div>
      </Link>
      <div className=" fs-1 text-center p-4">Hot Products</div>
    <div className="hot-products ">

      {allProducts.value.length ? (
        allProducts.value.map(
          (item, i) =>
            i < 4 && (
              <div data-testid="product-item" className="product-card" key={i}>
                <Link to={"/product/slug="+item.slug } state={{ item: item, i: i }}>
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
                <span className="product-price">₺ {item.price}</span>
                <span className="product-title text-default">{item.name}</span>
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
    </>
  );
}
