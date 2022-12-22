import React, { useEffect } from "react";
import BrandFilter from "./brandFilter";
import TagFilter from "./tagFilter";
import Sort from "./sort";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllItems,
  getStockByBrands,
  getStockByTags,
  getTags,
} from "../../features/allProductsSlice";
import { getBrands } from "../../features/brandSlice";
import useDidMountEffect from "../../helpers/useDidMountEffect";
import { getFilteredItemsNumber } from "../../features/filteredProducts";

const Options = () => {
  const dispatch = useDispatch();
  const selectBrands = useSelector((state) => state.brand);
  const selectAllProducts = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(getAllItems());
    dispatch(getBrands());
    dispatch(getFilteredItemsNumber())
  }, []);
  
  useDidMountEffect(() => {
    if (selectAllProducts.status === "fulfilled") {
      dispatch(getTags());
      //dispatch(getStockByTags({selected:[],filteredProductsNum:selectAllProducts.value.length}));
    }
  }, [selectAllProducts.status]);

  useDidMountEffect(() => {
    if (
      selectBrands.status === "fulfilled" &&
      selectAllProducts.status === "fulfilled"
    ) {
      dispatch(getStockByBrands({ brands: selectBrands.value, selected: [],filteredProductsNum:selectAllProducts.value.length }));
    }
  }, [selectBrands.status, selectAllProducts.status]);

  return (
    <>
      <div className="filters">
        <span className="filters-title">Sorting</span>
        <div className="filter-container">
          <Sort />
        </div>
        <span className="filters-title">Brands</span>
        <div className="filter-container">
          <BrandFilter />
        </div>
        <span className="filters-title">Tags</span>
        <div className="filter-container">
          <TagFilter />
        </div>
      </div>
    </>
  );
};

export default Options;
