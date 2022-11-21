import React, { useState, useTransition } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../features/querySlice";
import { getItems } from "../../features/productSlice";
import { getStockByTags } from "../../features/allProductsSlice";
import { getFilteredItemsNumber } from "../../features/filteredProducts";
import useDidMountEffect from "../../helpers/useDidMountEffect";
import Spinner from "../spinner";

const BrandFilter = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selected, setSelected] = useState(["All"]);
  const querySelector = useSelector((state) => state.query.value);
  const selectBrand = useSelector((state) => state.allProducts.stockByBrand);
  const productsNumberSelector = useSelector((state) => state.filteredProducts);
  const dispatch = useDispatch();

  const [isPending,startTransition] = useTransition();

  useDidMountEffect(() => {
    let res = selectBrand.filter((brand) =>
      brand.brand.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setSearchResults(res);
  }, [search]);

  const handleChange = (e) => {
    startTransition(() => {
      if (e.target.name === "All") {
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
      let query = `manufacturer=${
        e.target.id === "All" ? "uncheck-brands" : e.target.id
      }`;
      dispatch(setQuery(query));
    });
  };

  useDidMountEffect(() => {
    if (productsNumberSelector.status === "fulfilled")
      dispatch(
        getStockByTags({
          selected: selected,
          filteredProductsNum: productsNumberSelector.currentProductNumber,
        })
      );
  }, [productsNumberSelector.status]);

  useDidMountEffect(() => {
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
        {selectBrand.length ? (
          (searchResults.length ? searchResults : selectBrand).map((brand, i) =>
            brand.products ? (
              <div className="filter-item" key={i}>
                <input
                  key={selected}
                  onChange={handleChange}
                  type="checkbox"
                  name={brand.brand.name}
                  className="custom-checkbox"
                  data-testid="test-brand-filter-checkbox"
                  id={brand.brand.slug}
                  defaultChecked={
                    selected.includes(brand.brand.slug) ||
                    selected.includes(brand.brand.name)
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
          )
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
};

export default BrandFilter;
