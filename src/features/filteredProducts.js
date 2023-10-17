import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllFiltered, GetItem } from "../services/items";

const initialState = {
  currentProductNumber: 0,
  item: {},
};

export const getFilteredItemsNumber = createAsyncThunk(
  "filteredProducts/api",
  async () => {
    const resp = await GetAllFiltered();
    return resp;
  }
);

export const getSelectedItem = createAsyncThunk(
  "getSelectedItem/api",
  async (payload) => {
    const resp = await GetItem(payload);
    return resp;
  }
);

export const filteredProductsSlice = createSlice({
  name: "filteredProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getFilteredItemsNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getFilteredItemsNumber.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.currentProductNumber = action.payload;
      })
      .addCase(getFilteredItemsNumber.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getSelectedItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSelectedItem.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.item = action.payload;
      });
  },
});

export const selectFilteredProducts = (state) => state.filteredProducts;
export default filteredProductsSlice.reducer;