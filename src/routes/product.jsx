import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { getSelectedItem } from "../features/filteredProducts";
import useDidMountEffect from "../helpers/useDidMountEffect";
import "./../assets/css/product.css";

export default function Product() {
  //here I supported 2 way for getting clicked product info
  //firs one is to pass the props directly through the <Link/> **no server requests
  //second one by getting the slug from the url and getting the info from  the server
  // the reason behind that to overcome the issue caused by opening a product in a new window
  //so the state will get lost.
  const dispatch = useDispatch();
  const selectedItem = useSelector((state) => state.filteredProducts);
  const [item, setItem] = useState(null);
  const { slug } = useParams();
  const location = useLocation();
  const { item: clickedItem = null } = location?.state || {};

  useEffect(() => {
    if (clickedItem) {
      setItem(clickedItem);
    } else {
      dispatch(getSelectedItem(slug.split("=")[1]));
    }
  }, []);

  useDidMountEffect(() => {
    if (selectedItem.status === "fulfilled") {
      console.log(selectedItem.item.data);
      setItem(selectedItem.item.data[0]);
    }
  }, [selectedItem.status]);

  return (
    <>
      {item ? (
        <div className="product-container">
          <div className="product-image">
            <img
              alt={item.name + " image"}
              src={require(`./../assets/img/thumbnails/thumbnail${
                item.name.length + Math.floor(item.price) - 6
              }.jpg`)}
              onError={() =>
                this.src !==
                require(`./../assets/img/thumbnails/thumbnail1.jpg`)
                  ? (this.src = require(`./../assets/img/thumbnails/thumbnail1.jpg`))
                  : null
              }
            />
          </div>
          <div className="product-details">
            <span>Name : {item.name}</span>
            <span>Price : {item.price}</span>
            <span>Manufacturer : {item.manufacturer}</span>
            <span>Description : {item.description}</span>
            <span>Tags : {item.tags.join(" - ")}</span>
          </div>
        </div>
      ) : null}
    </>
  );
}
