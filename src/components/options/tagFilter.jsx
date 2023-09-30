import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../features/querySlice";
import { getItems } from "../../features/productSlice";
import { getStockByBrands } from "../../features/allProductsSlice";
import { getFilteredItemsNumber } from "../../features/filteredProducts";
import useDidMountEffect from "../../helpers/useDidMountEffect";
import Spinner from "../main/spinner";
const TagsFilter = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState(["All"]);
  const querySelector = useSelector((state) => state.query.value);
  const selectSoloTags = useSelector((state) => state.allProducts.tags);
  const selectBrands = useSelector((state) => state.brand.value);
  const productsNumberSelector = useSelector((state) => state.filteredProducts);
  const selectQuery = useSelector((state) => state.query.value);
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
        filtered.includes(e.target.id) ||
          selectQuery.includes(`tags_like=(?<!\\s)\\b${e.target.id}\\b(?!\\s)`)
          ? filtered.filter((item) => item !== e.target.id)
          : [...filtered, e.target.id]
      );
    }
    let query = `tags_like=(?<!\\s)\\b${e.target.id}\\b(?!\\s)`;
    dispatch(setQuery(query));
  };

  useDidMountEffect(() => {
    if (productsNumberSelector.status === "fulfilled") {
      dispatch(
        getStockByBrands({
          query: querySelector,
          brands: selectBrands,
          selected: selected,
          filteredProductsNum: productsNumberSelector.currentProductNumber,
        })
      );
    }
  }, [productsNumberSelector.currentProductNumber]);

  useDidMountEffect(() => {
    dispatch(getItems(querySelector));
    dispatch(getFilteredItemsNumber());
  }, [selected]);

  useDidMountEffect(() => {
    let res = selectSoloTags.filter((tag) =>
      tag.toLocaleLowerCase().includes(search.toLocaleLowerCase())
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
      <div key={selectQuery} className="filter-body custom-scrollbar">
        {selectSoloTags.length>0 ? (
          (searchResults.length>0 ? searchResults : selectSoloTags).map(
            (tag, i) => (
              // tag.products ? (
              <div className="form-group filter-item" key={i}>
                <input
                  key={selected}
                  onChange={handleChange}
                  type="checkbox"
                  className="custom-checkbox"
                  name=""
                  id={tag}
                  defaultChecked={
                    selected.includes(tag) ||
                    selectQuery.includes(
                      `tags_like=(?<!\\s)\\b${tag}\\b(?!\\s)`
                    )
                  }
                />
                <label className="filtering-label text-secondary" htmlFor={tag}>
                  {tag}{" "}
                  {/* <span className="text-dark-gray ">({tag.products})</span> */}
                </label>
              </div>
            )
            // ) : null
          )
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default TagsFilter;
