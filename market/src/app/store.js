import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { helloSaga } from "./../features/saga";

import basketReducer from "../features/basketSlice";
import productReducer from "../features/productSlice";
import brandReducer from "../features/brandSlice";
import queryReducer from "../features/querySlice";
import allproductsSlice from "../features/allProductsSlice";
import filteredProductsSlice from "../features/filteredProducts";

const sagaMiddleware = createSagaMiddleware();

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
    // middleware: (getDefaultMiddleware) => {
    //   return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware)
    // },
  },
);
// sagaMiddleware.run(helloSaga)
