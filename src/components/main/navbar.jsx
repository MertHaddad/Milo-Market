import React from "react";
import basketIcon from "./../../assets/img/basket.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const select = useSelector((state) => state.basket);
  return (
    <nav role="navigation" className="navbar">
      <div className="navigation-items">
        <Link to="/">
          <span>Home </span>{" "}
        </Link>
        <Link to="/store">
          <span>Store</span>
        </Link>
      </div>
      <div className="navbar-logo">
        <Link to="/">
          <strong> Milo Market 🐈</strong>
        </Link>
      </div>
      <Link to="/checkout" id="cart-button" className="card-button">
        {select.quantity > 0 && (
          <small className="quantity-circle">{select.quantity}</small>
        )}
        <img alt="market-shopping" src={basketIcon} />
        <span className="price-text">
          {" "}
          $ {Number(select.payment).toFixed(2)}
        </span>
      </Link>
    </nav>
  );
};

export default Navbar;
