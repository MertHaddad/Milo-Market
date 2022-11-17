import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../features/querySlice";
import { getItems } from "../../features/productSlice";
import { getStockByTags } from "../../features/allProductsSlice";
import { getFilteredItemsNumber } from "../../features/filteredProducts";

const BrandFilter = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const querySelector = useSelector((state) => state.query.value);
  const selectBrand = useSelector((state) => state.allProducts.stockByBrand);
  const dispatch = useDispatch();

  useEffect(() => {
    let res = selectBrand.filter((brand) =>
      brand.brand.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setSearchResults(res);
  }, [search]);

  const handleChange = (e) => {
    // if (e.target.id !== "uncheck-brands") {
    if (e.target.id === "uncheck-brands") {
      setSelected([]);
    } else {
      setSelected(
        selected.includes(e.target.id)
          ? selected.filter((item) => item !== e.target.id)
          : [...selected, e.target.id]
      );
    }
    let query = `manufacturer=${e.target.id}`;
    dispatch(setQuery(query));

    // } else setSelected([]);
  };

  useEffect(() => {
    dispatch(getStockByTags(selected));
    dispatch(getItems(querySelector));
    dispatch(getFilteredItemsNumber());
  }, [selected]);

  return (
    <>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search brand"
        className="search-bar"
      />
      <div className="filter-body custom-scrollbar">
        {(searchResults.length ? searchResults : selectBrand).map((brand, i) =>
          brand.products ? (
            <div className="filter-item" key={i}>
              <input
                key={selected}
                onChange={handleChange}
                type="checkbox"
                name=""
                className="custom-checkbox"
                id={brand.brand.slug}
                defaultChecked={
                  brand.brand.slug === "uncheck-brands"
                    ? !selected.length
                    : selected.includes(brand.brand.slug)
                }
              />
              <label
                className="filtering-label text-secondary"
                htmlFor={brand.brand.slug}
              >
                {brand.brand.name}
                <span className="text-dark-gray"> ({brand.products})</span>
              </label>
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default BrandFilter;
