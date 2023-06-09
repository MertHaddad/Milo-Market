import { Link, useLocation } from "react-router-dom";

export default function MobileNavigation() {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <div className="bottom-navigation">
      <Link to={"/"}>
        <span className={`${pathname === "/" ? "active" : ""}`}>Home</span>
      </Link>
      <Link to={"/store"}>
        <span className={`${pathname === "/store" ? "active" : ""}`}>
          Store
        </span>
      </Link>
      <Link to={"/"}>
        <span>Basket</span>
      </Link>
    </div>
  );
}
