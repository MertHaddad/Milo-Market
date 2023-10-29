import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct } from "../../features/basketSlice";
import Spinner from "../main/spinner";
import noProduct from "./../../assets/img/no-product.jpg";
import Counter from "../basket/counter";
const Item = () => {
  const products = useSelector((state) => state.product);
  const selectBasket = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  const checkProduct = (item) => {
    return selectBasket.basketProducts.find((el) => el.name === item.name);
  };

  return (
      <section className="products products-container">
        {products.value.length ? (
          products.value.map((item, i) => (
            <div data-testid="product-item" className="product-card" key={i}>
              <Link
                to={"/product/slug=" + item.slug}
                state={{ item: item, i: i }}
              >
                <span className="product-thumbnail">
                  <img
                    width={90}
                    alt=""
                    src={require(`./../../assets/img/thumbnails/thumbnail${
                      item.name.length + Math.floor(item.price) - 6
                    }.jpg`)}
                  />
                </span>
              </Link>
              <span className="product-price">$ {item.price}</span>
              <span className="product-title text-default">{item.name}</span>
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
          ))
        ) : products.status === "fulfilled" ? (
          <div>
            <div className="empty-cart">
              <p className="fs-1">Oppsssss!! no products here :{"("}</p>
              <img alt="no product found on this filter" width={600} src={noProduct} />
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </section>
  );
};

export default Item;
