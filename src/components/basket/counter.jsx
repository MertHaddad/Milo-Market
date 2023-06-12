import React from "react";
import { useDispatch } from "react-redux";
import { setQuantity } from "../../features/basketSlice";
import PropTypes from 'prop-types';

const Counter = ({ product }) => {
  const dispatch = useDispatch();

  const handleQuantity = (e) => {
    dispatch(
      setQuantity({
        product: product.name,
        action: e.target.name,
        price: product.price || 0,
      })
    );
  };
  return (
    <div className="counter-container">
      <button
        onClick={handleQuantity}
        name="decrease"
        className="pointer fs-1 text-bold quantity-button"
      >
       -
      </button>
      <button className="counter fs-2">
        {product?.quantity || 0}
      </button>
      <button
        onClick={handleQuantity}
        name="increase"
        className="pointer fs-1 text-bold quantity-button"
      >
        +
      </button>
    </div>
  );
};

Counter.propTypes = {
  product: PropTypes.exact({
    name: PropTypes.string.isRequired,
    quantity:PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  })
};

export default Counter;
