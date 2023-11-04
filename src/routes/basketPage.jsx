import React from "react";
import Basket from "../components/basket/basket";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { emptyBasket } from "../features/basketSlice";

export default function BasketPage() {
  const selectBasket = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  return (
    <main className="cart-container">
      <section className="cart-column">
        <Basket />
      </section>
      <aside className="cart-options">
        <h3 className="mt-1 mb-0 fs-2 basket-footer-total text-primary">
          Total: ${Math.abs(Number(selectBasket.payment).toFixed(2))}
        </h3>
        <div className="basket-button-container" >
        <Link to="/checkout">
          <button className="basket-button">
            <i className="me-1 fs-2 bi bi-cart-check"></i>
            Checkout
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
      </aside>
    </main>
  );
}
