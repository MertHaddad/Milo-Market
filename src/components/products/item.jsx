import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../main/spinner";
import noProduct from "./../../assets/img/no-product.jpg";
import ProductItem from "./productItem";
const Item = () => {
  const products = useSelector((state) => state.product);

  return (
    <section className="products products-container">
      {products?.value?.length ? (
        products.value.map((item, i) => (
          <ProductItem item={item} key={i} i={i} />
        ))
      ) : products.status === "fulfilled" ? (
        <div>
          <div className="empty-cart">
            <p className="fs-1">Oppsssss!! no products here :{"("}</p>
            <img
              alt="no product found on this filter"
              width={600}
              src={noProduct}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </section>
  );
};

export default Item;
