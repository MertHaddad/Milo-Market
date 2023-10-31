/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredItemsNumber } from "../../features/filteredProducts";
import { getItems } from "../../features/productSlice";
import { getTypes } from "../../features/allProductsSlice";
// import { getBrands } from "../../features/brandSlice";
import { setQuery } from "../../features/querySlice";

const ToggleBar = () => {
  const tagsContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [filters, setFilters] = useState([]);
  const dispatch = useDispatch();
  const selectQuery = useSelector((state) => state.query.value);
  const typeSelector = useSelector((state) => state.allProducts.types);
  const [allowClick, setAllowClick] = useState(true);

  const handleChange = (e) => {
    if (!allowClick) return;
    dispatch(setQuery(e.target.name));
    dispatch(getItems(selectQuery));
    dispatch(getFilteredItemsNumber());
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - tagsContainerRef.current.offsetLeft);
    setScrollLeft(tagsContainerRef.current.scrollLeft);
    setAllowClick(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - tagsContainerRef.current.offsetLeft;
    const scroll = x - startX;
    tagsContainerRef.current.scrollLeft = scrollLeft - scroll;
    setAllowClick(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => {
      setAllowClick(true);
    }, 100);
  };

  useEffect(() => {
    const filterArray = [];
    selectQuery.forEach((item) =>
      item.includes("manufacturer")
        ? filterArray.push(item.split("=")[1])
        : item.includes("tags_like")
        ? filterArray.push(item.split("\\b")[1])
        : null
    );
    setFilters(filterArray);

    if (typeSelector.length === 0) {
      dispatch(getTypes());
    }
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
    <section className="top-bar-container" >
      <div
        ref={tagsContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="type-filter-container hide-scroll-bar"
      >
        {typeSelector.length > 0 &&
          typeSelector.map((item, i) => (
            <button
              key={i}
              data-testid={`filter-by-type-${item}`}
              name={`itemType=${item}`}
              className={`toggle-button pointer text-bold ${
                selectQuery.includes(`itemType=${item}`)
                  ? "bg-primary text-light-white"
                  : "text-primary secondary-button"
              }`}
              onClick={handleChange}
            >
              {item}
            </button>
          ))}
      </div>
      {/* <button
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
      </button> */}
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
    </section>
  );
};

export default ToggleBar;
