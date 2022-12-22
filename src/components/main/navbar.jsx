import React from "react";
import basketIcon from "./../../assets/img/basket.svg";
import { useSelector } from "react-redux";
const Navbar = () => {
  const select = useSelector(state=>state.basket.payment)
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          {/* <img alt="market-logo" src={logo} /> */}
          <strong> Milo Market 🐈</strong>
        </div>
        <div id="cart-button" className="button pointer ">
          <img alt="market-shopping"  src={basketIcon} /><span className="price-text"> ₺ {Number(select).toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default Navbar;
