import React from "react";
import { useDispatch } from "react-redux";
import { setQuantity } from "../../features/basketSlice";
const Counter = ({ product }) => {
  const dispatch = useDispatch();
  const handleQuantity = (e) => {
    dispatch(
      setQuantity({
        product: product.name,
        action: e.target.name,
        price: product.price,
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
        {product.quantity}
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

export default Counter;
