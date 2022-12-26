import React from "react";
import { useSelector } from "react-redux";
import Counter from "./counter";
import emptyCart from "./../../assets/img/empty-cart.jpg";
const Basket = () => {
  const selectBasket = useSelector((state) => state.basket);

  return (
    <>
      <div className="basket">
        {selectBasket.basketProducts.length ? (
          <div className="basket-container custom-scrollbar">
            {selectBasket.basketProducts.length ? (
              selectBasket.basketProducts.map((item, i) => (
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
            ) : (
              <div className="empty-cart">
                <img alt="" width={170} src={emptyCart} />
              </div>
            )}
            {selectBasket.basketProducts.length ? (
              <div className="basket-button-container">
                <button className="basket-button">
                  ${Math.abs(Number(selectBasket.payment).toFixed(2))}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Basket;
