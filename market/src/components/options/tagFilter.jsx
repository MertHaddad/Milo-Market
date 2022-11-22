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
  const [selected, setSelected] = useState([{tag:"All"}]);
  const querySelector = useSelector((state) => state.query.value);
  const selectTags = useSelector((state) => state.allProducts.stockByTag);
  const selectBrands = useSelector((state) => state.brand.value);
  const productsNumberSelector = useSelector((state) => state.filteredProducts);

  const dispatch = useDispatch();

  const handleChange = (tag) => {
    if (tag.tag === "All") {
      setSelected(
        selected.some(el=> el.tag === "All")
          ? selected.filter((item) => item.tag !== "All")
          : [{tag:"All"}]
      );
    } else {
      let filtered = selected;
      if (selected.some(el=> el.tag === "All")) {
        filtered = selected.filter((item) => item.tag !== "All");
      }
      setSelected(
        filtered.some((item) => item.tag === tag.tag)
          ? filtered.filter((item) => item.tag !== tag.tag)
          : [...filtered, tag]
      );
    }
    let query = `tags_like=(?<!\\s)\\b${tag.tag}\\b(?!\\s)`;
    dispatch(setQuery(query));
  };

  useDidMountEffect(() => {
    if (productsNumberSelector.status === "fulfilled")
      dispatch(
        getStockByBrands({
          brands: selectBrands,
          selected: selected.map((item) => item.tag),
          filteredProductsNum: productsNumberSelector.currentProductNumber,
        })
      );
  }, [selected]);

  useDidMountEffect(() => {
    dispatch(getItems(querySelector));
    dispatch(getFilteredItemsNumber());
    // dispatch(getStockByTags({selected:selected,else:productsNumberSelector.currentProductNumber}));
  }, [selected]);

  useDidMountEffect(() => {
    let res = selectTags.filter((tag) =>
      tag.tag.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setSearchResults(res);
  }, [search]);

  useDidMountEffect(() => {
    console.log("selectedTags");
    console.log(selected);
    console.log("searchResults");
    console.log(searchResults);
  }, [selected, search]);

  return (
    <>

      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        type="text"
        placeholder="Search tag"
        className="search-bar"
      />
      <div  className="filter-body custom-scrollbar">
        {selectTags.length ? (
          (searchResults.length ? searchResults : selectTags).map((tag, i) =>
            tag.products ? (
              <div className="form-group filter-item" key={i}>
                <input
                  key={selected}
                  onChange={() => handleChange(tag)}
                  type="checkbox d-block"
                  // className="custom-checkbox"
                  name=""
                  id={tag.tag}
                  defaultChecked={selected.some((x) => x.tag === tag.tag)
                  }
                />
                <label
                  className="filtering-label d-block text-secondary"
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
