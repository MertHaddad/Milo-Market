import { configureStore} from "@reduxjs/toolkit";
import basketReducer from "../features/basketSlice";
import productReducer from "../features/productSlice";
import brandReducer from "../features/brandSlice";
import queryReducer from "../features/querySlice";
import allproductsSlice from "../features/allProductsSlice";
import filteredProductsSlice from "../features/filteredProducts";

export const store = configureStore(
  {
    reducer: {
      basket: basketReducer,
      product: productReducer,
      brand: brandReducer,
      query: queryReducer,
      allProducts: allproductsSlice,
      filteredProducts: filteredProductsSlice,
    },
  },
);
