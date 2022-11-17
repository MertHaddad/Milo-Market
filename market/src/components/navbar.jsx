import React from "react";
import logo from "./../assets/img/logo.svg";
import basketIcon from "./../assets/img/basket.svg";
import { useSelector } from "react-redux";
const Navbar = () => {
  const select = useSelector(state=>state.basket.payment)
  return (
    <>
      <div className="navbar">
        <div className="navbar-logo">
          <img alt="market-logo" src={logo} />
        </div>
        <div className="button pointer">
          <img alt="market-shopping" src={basketIcon} /> ₺ {Number(select).toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default Navbar;
