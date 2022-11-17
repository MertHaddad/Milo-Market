import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../features/querySlice";
import { getItems } from "../../features/productSlice";
import { getStockByBrands } from "../../features/allProductsSlice";
import { getFilteredItemsNumber } from "../../features/filteredProducts";

const TagsFilter = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState([]);
  const querySelector = useSelector((state) => state.query.value);
  const selectTags = useSelector((state) => state.allProducts.stockByTag);
  const selectBrands = useSelector((state) => state.brand.value);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.id === "All") {
      setSelected([]);
    } else {
      setSelected(
        selected.includes(e.target.id)
          ? selected.filter((item) => item !== e.target.id)
          : [...selected, e.target.id]
      );
    }
    let query = `tags_like=(?<!\\s)\\b${e.target.id}\\b(?!\\s)`;
    dispatch(setQuery(query));
  };

  useEffect(() => {
    // if(selected.length){

    dispatch(getStockByBrands({ brands: selectBrands, selected: selected }));
    dispatch(getItems(querySelector));
    dispatch(getFilteredItemsNumber());

    // dispatch(getStockByTags(selected))
    // }
  }, [selected]);

  useEffect(() => {
    let res = selectTags.filter((tag) =>
      tag.tag.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setSearchResults(res);
  }, [search]);

  return (
    <>
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search tag"
        className="search-bar"
      />
      <div className="filter-body custom-scrollbar">
        {(searchResults.length ? searchResults : selectTags).map((tag, i) =>
          tag.products ? (
            <div key={i}>
              <input
                key={selected}
                onChange={handleChange}
                type="checkbox"
                className="custom-checkbox"
                name=""
                id={tag.tag}
                defaultChecked={
                  tag.tag === "All"
                    ? !selected.length
                    : selected.includes(tag.tag)
                }
              />
              <label
                className="filtering-label text-secondary"
                htmlFor={tag.tag}
              >
                {tag.tag}{" "}
                <span className="text-dark-gray ">({tag.products})</span>
              </label>
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

export default TagsFilter;
