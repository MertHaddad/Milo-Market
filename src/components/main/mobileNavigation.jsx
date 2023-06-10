import { Link, useLocation } from "react-router-dom";

export default function MobileNavigation() {
  const { pathname } = useLocation();
  return (
    <div className="bottom-navigation">
      <Link to={"/"}>
        <span className={`${pathname === "/" ? "active " : ""}`}>
          <i class="bi bi-house-door  fs-2 p-3"></i>
          Home
        </span>
      </Link>
      <Link to={"/store"}>
        <span className={`${pathname === "/store" ? "active" : ""}`}>
          <i class="bi bi-shop fs-2 p-3"></i>
          Store
        </span>
      </Link>
      <Link to={"/basket"}>
        <span className={`${pathname === "/basket" ? "active" : ""}`}>
          <i class="bi bi-cart fs-2 p-3"></i>
          Basket
        </span>
      </Link>
    </div>
  );
}
