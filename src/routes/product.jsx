import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import Counter from "../components/basket/counter";
import { addProduct } from "../features/basketSlice";
import { getSelectedItem } from "../features/filteredProducts";
import useDidMountEffect from "../helpers/useDidMountEffect";
import "./../assets/css/product.css";
import defaultThumbnail from "./../assets/img/thumbnails/thumbnail1.jpg";

export default function Product() {
  //here I supported 2 way for getting clicked product info
  //firs one is to pass the props directly through the <Link/> **no server requests
  //second one by getting the slug from the url and getting the info from  the server
  // the reason behind that to overcome the issue caused by opening a product in a new window
  //so the state will get lost.
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.filteredProducts);
  const selectBasket = useSelector((state) => state.basket);
  const [item, setItem] = useState(null);
  const [product, setProduct] = useState();
  const { slug } = useParams();
  const location = useLocation();
  const { item: clickedItem = null } = location?.state || {};

  
  function getImagePath(imageName) {
    try {
      // eslint-disable-next-line no-undef
      return require(`./../assets/img/thumbnails/thumbnail${imageName}.jpg`);
    } catch {
      return defaultThumbnail;
    }
  }

  const checkQuantity = (item) => {
    return (
      selectBasket?.basketProducts?.filter((x) => x.name === item.name)[0] || {
        name: item.name,
        quantity: 0,
        price: item.price,
      }
    );
  };

  useEffect(() => {
    if (clickedItem) {
      setItem(clickedItem);
      setProduct(checkQuantity(clickedItem));
    } else {
      const selectedItem = getSelectedItem(slug.split("=")[1]);
      dispatch(selectedItem);
      setProduct(checkQuantity(selectedItem));
    }
  }, [selectBasket]);

  useDidMountEffect(() => {
    if (selectedItem.status === "fulfilled") {
      setItem(...selectedItem.item.data[0]);
    }
  }, [selectedItem.status]);

  return (
    <>
      {item ? (
        <div className="product-container">
          <div className="product-image">
            <img
              width={"100%"}
              alt={item.name + " product image"}
              src={getImagePath(item.name.length)}
            />
          </div>
          <div className="product-details">
            <span className="fs-1"> {item.name}</span>
            <div className="fs-1">{item.price} $</div>
            <div className="fs-3">Manufacturer : {item.manufacturer}</div>
            <div className="fs-3">
              Description :<div> {item.description} </div>
            </div>
            <div className="d-flex">
              {item?.name ? <Counter product={product} /> : null}
              <button
                onClick={() => dispatch(addProduct({ product: item }))}
                data-testid="add-button"
                className="product-button text-bold px-4 mx-4"
              >
                Add to cart
              </button>
            </div>
            <div className="div pills">
              {item.tags?.length > 0
                ? item.tags?.map((item, i) => (
                    <span className="pill" key={i}>
                      {" "}
                      {item}{" "}
                    </span>
                  ))
                : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
