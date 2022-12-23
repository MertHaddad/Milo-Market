import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brandSlice";
import { getFilteredItemsNumber } from "../../features/filteredProducts";
import { getItems } from "../../features/productSlice";
import { clearQuery, setQuery } from "../../features/querySlice";

const ToggleBar = () => {
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();
  const selectQuery = useSelector((state) => state.query.value);

  const handleChange = (e) => {
    dispatch(setQuery(e.target.name));
    dispatch(getItems(selectQuery));
    dispatch(getFilteredItemsNumber());
  };

  useEffect(() => {
    console.log(selectQuery);
    selectQuery.forEach((item) =>
      item.includes("manufacturer")
        ? setFilters((prev) => [...new Set([...prev, item.split("=")[1]])] )
        : item.includes("tags_like")
        ? setFilters((prev) => [...new Set( [...prev, item.split("\\b")[1]])] )
        : null
    );
  }, [selectQuery]);

  const handleClearFilters = ()=>{
    dispatch(clearQuery())
    dispatch(getItems())
    dispatch(getBrands())
    dispatch(getFilteredItemsNumber())
    setFilters([])
    //will be Fixed

    // window.refresh
  }

  return (
    <>
      <button
        data-testid="filter-by-type-mug"
        name="itemType=mug"
        className={`toggle-button pointer text-bold ${
          selectQuery.includes("itemType=mug")
            ? "bg-primary text-light-white"
            : "text-primary secondary-button"
        }`}
        onClick={handleChange}
      >
        Mug
      </button>
      <button
        data-testid="filter-by-type-shirt"
        name="itemType=shirt"
        className={`toggle-button pointer text-bold ${
          selectQuery.includes("itemType=shirt")
            ? "bg-primary text-light-white"
            : "text-primary secondary-button"
        }`}
        onClick={handleChange}
      >
        Shirt
      </button>
      {/* <button
        data-testid="filter-by-type-shirt"
        name="itemType=shirt"
        className={`toggle-button pointer text-bold ${
          selectQuery.includes("itemType=shirt")
            ? "bg-primary text-light-white"
            : "text-primary secondary-button"
        }`}
        onClick={handleClearFilters}
      >
        Clear 
      </button> */}
      <div className="div pills">

      {filters.length
        ? filters.map((item, i) => <span className="pill" key={i}> {item} </span>)
        : null}
        </div>
    </>
  );
};

export default ToggleBar;
