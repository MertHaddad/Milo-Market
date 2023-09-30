import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function MobileNavigation() {
  const { pathname } = useLocation();
  const selectBasket = useSelector((state) => state.basket);

  return (
    <div className="bottom-navigation">
      <Link to={"/"}>
        <span className={`${pathname === "/" ? "active " : ""}`}>
          <i className="bi bi-house-door  fs-2 p-3"></i>
          Home
        </span>
      </Link>
      <Link to={"/store"}>
        <span className={`${pathname === "/store" ? "active" : ""}`}>
          <i className="bi bi-shop fs-2 p-3"></i>
          Store
        </span>
      </Link>
      <Link to={"/basket"}>
        <span className={`${pathname === "/basket" ? "active" : ""}`}>
          {selectBasket.basketProducts.length ? (
            <small className="quantity-circle">{selectBasket.quantity}</small>
          ) : (
            <i className="bi bi-cart fs-2 p-3"></i>
          )}
          Basket
        </span>
      </Link>
    </div>
  );
}
