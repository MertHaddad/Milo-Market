import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Counter from "./counter";
import { Link } from "react-router-dom";
import { emptyBasket } from "../../features/basketSlice";
import { useDispatch } from "react-redux";

const Basket = () => {
  const selectBasket = useSelector((state) => state.basket);
  const basketRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (basketRef.current) {
        basketRef.current.scrollTo({
          top: basketRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100);
  }, [selectBasket.payment]);

  return (
    <div>
      <h2 className="d-block mt-0 fs-2 text-darkest-gray">Cart </h2>
      <hr />
      {selectBasket.basketProducts.length ? (
        <>
          <div ref={basketRef}>
            {selectBasket.basketProducts.length
              ? selectBasket.basketProducts.map((item, i) => (
                  <div key={i} className="basket-item parent text-default">
                    <div className="div2 basket-product-name">{item.name}</div>
                    <div className="counter-parent">
                      <Counter product={item} />
                    </div>
                    <div className="price-parent text-primary text-bold">
                      ${item.price}
                      <span>{item.amount}</span>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </>
      ) : null}
      <div className="basket-footer">
        <h3 className="mt-1 mb-0 fs-2 basket-footer-total text-primary">
          Total: ${Math.abs(Number(selectBasket.payment).toFixed(2))}
        </h3>
        <div className="basket-button-container">
          <Link to="/checkout">
            <button className="basket-button">
              <i className="me-1 fs-2 bi bi-cart-check"></i>
              Checkout
            </button>
          </Link>
          <Link to="/basket">
            <button className="basket-button">
              <i className="me-1 fs-2 bi bi-basket2"></i>
              Cart
            </button>
          </Link>
          <button
            onClick={() => dispatch(emptyBasket())}
            className="basket-button"
          >
            <i className="me-1 fs-2 bi bi-trash"></i>
            Empty
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
