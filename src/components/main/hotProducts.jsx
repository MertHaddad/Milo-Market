import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../features/basketSlice";
import Spinner from "../main/spinner";
import noProduct from "./../../assets/img/no-product.jpg";

export default function HotProducts() {
  const allProducts = useSelector((state) => state.product);
  const dispatch = useDispatch();
  // const products = [
  //   allProducts[0],
  //   allProducts[1],
  //   allProducts[2],
  //   allProducts[3],
  // ];
  return (
    <>
    <Link to="/store" >
      <div className=" fs-1 product-thumbnail text-center p-4 text-bold pointer" style={{width:"20%",margin:"auto",marginTop:20}}>Visit Store</div>
      </Link>
      <div className=" fs-1 text-center p-4">Hot Products</div>
    <div className="hot-products ">

      {allProducts.value.length ? (
        allProducts.value.map(
          (item, i) =>
            i < 4 && (
              <div data-testid="product-item" className="product-card" key={i}>
                <Link to="/product" state={{ item: item, i: i }}>
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
