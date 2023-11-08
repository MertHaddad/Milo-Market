import { configureStore} from "@reduxjs/toolkit";
import basketReducer from "../features/basketSlice";
import productReducer from "../features/productSlice";
import brandReducer from "../features/brandSlice";
import queryReducer from "../features/querySlice";
import allproductsSlice from "../features/allProductsSlice";
import filteredProductsSlice from "../features/filteredProducts";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedProductsReducer = persistReducer(persistConfig,allproductsSlice);
const persistedBasketReducer = persistReducer(persistConfig,basketReducer);

export const store = configureStore(
  {
    reducer: {
      basket: persistedBasketReducer,
      product: productReducer,
      brand: brandReducer,
      query: queryReducer,
      allProducts: persistedProductsReducer,
      filteredProducts: filteredProductsSlice,
    },
  },
);

export const persistor = persistStore(store);
