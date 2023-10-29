import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredItemsNumber } from "../../features/filteredProducts";
import { getItems } from "../../features/productSlice";
// import { getBrands } from "../../features/brandSlice";
// import { clearQuery, setQuery } from "../../features/querySlice";

const ToggleBar = () => {
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();
  const selectQuery = useSelector((state) => state.query.value);

  const handleChange = () => {
    // dispatch(setQuery(e.target.name));
    dispatch(getItems(selectQuery));
    dispatch(getFilteredItemsNumber());
  };

  useEffect(() => {
    const filterArray = []
    selectQuery.forEach((item) =>
      item.includes("manufacturer")
        ? 
          filterArray.push(item.split("=")[1])
        : 
        item.includes("tags_like")
        ? filterArray.push(item.split("\\b")[1])
        : null
    );
    setFilters(filterArray)
  }, [selectQuery]);


  //coming soon feature
  // const handleClearFilters = () => {
  //   dispatch(clearQuery());
  //   dispatch(getItems());
  //   dispatch(getBrands());
  //   dispatch(getFilteredItemsNumber());
  //   setFilters([]);
  // };

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
          ? filters.map((item, i) => (
              <span className="pill" key={i}>
                {" "}
                {item}{" "}
              </span>
            ))
          : null}
      </div>
    </>
  );
};

export default ToggleBar;
