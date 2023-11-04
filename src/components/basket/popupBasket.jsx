import React, { useRef, useEffect } from "react";
import Basket from "./basket";
import { useDispatch, useSelector } from "react-redux";
import { showBasket } from "../../features/basketSlice";

function useOutsideAlerter(ref) {
  const selectBasket = useSelector((state) => state.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        ref.current &&
        selectBasket?.showBasket?.payload?.show &&
        !ref.current.contains(event.target) &&
        event.target.closest(".product-button") === null &&
        event.target.closest(".quantity-button") === null
      ) {
        dispatch(showBasket({ show: false, message: "" }));
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, selectBasket.showBasket.payload?.show]);
}

export default function PopupBasket() {
  const cartRef = useRef(null);
  const selectBasket = useSelector((state) => state.basket);
  useOutsideAlerter(cartRef);

  return (
    <section
      ref={cartRef}
      className={`popup-basket custom-scrollbar ${
        selectBasket.showBasket.payload?.show ? "d-block" : "d-none"
      }`}
    >
      {selectBasket.showBasket.payload?.message.trim().length > 0 && (
        <h3 className="basket-info">
          {selectBasket.showBasket.payload?.message}
        </h3>
      )}
      <Basket />
    </section>
  );
}
