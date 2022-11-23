import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../features/querySlice";
import { getItems } from "../../features/productSlice";
import { getStockByBrands } from "../../features/allProductsSlice";
import { getFilteredItemsNumber } from "../../features/filteredProducts";
import useDidMountEffect from "../../helpers/useDidMountEffect";
import Spinner from "./../spinner";
const TagsFilter = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState(["All"]);
  const querySelector = useSelector((state) => state.query.value);
  const selectTags = useSelector((state) => state.allProducts.stockByTag);
  const selectBrands = useSelector((state) => state.brand.value);
  const productsNumberSelector = useSelector((state) => state.filteredProducts);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.id === "All") {
      setSelected(
        selected.includes("All")
          ? selected.filter((item) => item !== "All")
          : ["All"]
      );
    } else {
      let filtered = selected;
      if (selected.includes("All")) {
        filtered = selected.filter((item) => item !== "All");
      }
      setSelected(
        filtered.includes(e.target.id)
          ? filtered.filter((item) => item !== e.target.id)
          : [...filtered, e.target.id]
      );
    }
    let query = `tags_like=(?<!\\s)\\b${e.target.id}\\b(?!\\s)`;
    dispatch(setQuery(query));
  };

  useDidMountEffect(() => {
    if (productsNumberSelector.status === "fulfilled"){
      console.log("Brands should update");
      dispatch(
        getStockByBrands({
          query:querySelector,
          brands: selectBrands,
          selected: selected,
          filteredProductsNum: productsNumberSelector.currentProductNumber,
        })
      );}
  }, [productsNumberSelector]);

  useDidMountEffect(() => {
    dispatch(getItems(querySelector));
    dispatch(getFilteredItemsNumber());
  }, [selected]);

  useDidMountEffect(() => {
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
        {selectTags.length ? (
          (searchResults.length ? searchResults : selectTags).map((tag, i) =>
            tag.products ? (
              <div className="form-group filter-item" key={i}>
                <input
                  key={selected}
                  onChange={handleChange}
                  type="checkbox"
                  className="custom-checkbox"
                  name=""
                  id={tag.tag}
                  defaultChecked={selected.includes(tag.tag)
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
          )
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default TagsFilter;
