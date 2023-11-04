import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../features/basketSlice";
import Counter from "../basket/counter";
import PropTypes from "prop-types";

export default function ProductItem({ item, i, allowClick = true }) {
  const dispatch = useDispatch();
  const selectBasket = useSelector((state) => state.basket);

  const handleAddProduct = (item) => {
    dispatch(addProduct({ product: item }));
  };

  const checkProduct = (item) => {
    return selectBasket.basketProducts.find((el) => el.name === item.name);
  };

  return (
    <div data-testid="product-item" className="product-card" key={i}>
      <Link
        to={allowClick ? "/product/slug=" + item.slug : "#"}
        state={{ item: item, i: i }}
      >
        <span className="product-thumbnail">
          <img
            className="product-thumbnail-img"
            alt=""
            // eslint-disable-next-line no-undef
            src={require(`./../../assets/img/thumbnails/thumbnail${item.name.length}.jpg`)}
          />
        </span>
      </Link>
      <span className="product-price">$ {item.price}</span>
      <span className="product-title text-default">{item.name}</span>
      {checkProduct(item) ? (
        <Counter
          product={checkProduct(item)}
        />
      ) : (
        <button
          onClick={() => handleAddProduct(item)}
          data-testid="add-button"
          className="product-button text-bold fs-3"
        >
          Add
        </button>
      )}
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.exact({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
  i: PropTypes.number.isRequired,
  allowClick: PropTypes.bool,
};
