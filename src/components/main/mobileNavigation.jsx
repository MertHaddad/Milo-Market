import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function MobileNavigation() {
  const { pathname } = useLocation();
  const [animate, setAnimate] = useState(false);
  const selectBasket = useSelector((state) => state.basket);

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  }, [selectBasket.quantity]);

  return (
    <nav role="navigation" className="bottom-navigation">
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
        <span className={`quantity-container ${pathname === "/basket" ? "active" : ""}`}>
          {selectBasket.basketProducts.length > 0 ? (
            <small className={`quantity-circle ${animate ? "animate-pulse" : ""}`}>{selectBasket.quantity}</small>
          ) : (
            <i className="bi bi-cart fs-2 p-3"></i>
          )}
          Basket
        </span>
      </Link>
    </nav>
  );
}
