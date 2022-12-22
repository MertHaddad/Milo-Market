import React from "react";
import { useLocation } from "react-router-dom";
import "./../assets/css/product.css";

export default function Product() {
  const location = useLocation();
  const { item, i } = location.state;
  console.log(item);
  return (
    <>
      <div className="product-container">
        <div className="product-image">
          <img
            alt={item.name + " image"}
            src={require(`./../assets/img/thumbnails/thumbnail${
              item.name.length + Math.floor(item.price) - 6 - i
            }.jpg`)}
            onError={() =>
              this.src !== require(`./../assets/img/thumbnails/thumbnail1.jpg`)
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
    </>
  );
}
