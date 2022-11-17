import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredItemsNumber } from "../../features/filteredProducts";
import { getItems } from "../../features/productSlice";
import { setQuery } from "../../features/querySlice";

const ToggleBar = () => {
  const dispatch = useDispatch();
  const selectQuery = useSelector(state=>state.query.value)

  const handleChange=(e)=>{
    dispatch(setQuery(e.target.name));
    dispatch(getItems(selectQuery))
    dispatch(getFilteredItemsNumber())

  }

  return (
    <>
      <button
      name="itemType=mug"
        className={`toggle-button pointer text-bold ${selectQuery.includes("itemType=mug") ? "bg-primary text-light-white" : "text-primary secondary-button"}`}
        onClick={handleChange}
      >
        mug
      </button>
      <button
      name="itemType=shirt"
        className={`toggle-button pointer text-bold ${selectQuery.includes("itemType=shirt") ? "bg-primary text-light-white" : "text-primary secondary-button"}`}
        onClick={handleChange}
      >
        shirt
      </button>
    </>
  );
};

export default ToggleBar;
