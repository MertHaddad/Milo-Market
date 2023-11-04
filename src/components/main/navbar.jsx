import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showBasket } from "../../features/basketSlice";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const select = useSelector((state) => state.basket);
  const [animate, setAnimate] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
  }, [select.quantity]);

  const handleShowCart = () => {
    dispatch(
      showBasket({ show: !select.showBasket.payload?.show, message: "" })
    );
  };

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
      <button onClick={handleShowCart} id="cart-button" className="card-button">
        {select.quantity > 0 && (
          <small className={`quantity-circle ${animate ? "animate-pulse" : ""}`}>
            {select.quantity}
          </small>
        )}
        <span className="price-text">
          <i className=" bi fs-2 m-1 bi-bag-fill"></i> ${" "}
          {Number(select.payment).toFixed(2)}
        </span>
      </button>
    </nav>
  );
};

export default Navbar;
