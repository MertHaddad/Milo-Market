import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllFiltered } from "../services/items";

const initialState = {
  currentProductNumber:0
};


export const getFilteredItemsNumber = createAsyncThunk(
  "filteredProducts/api",
  async () => {
    const resp = await GetAllFiltered();
    return resp;
  }
);

export const filteredProductsSlice = createSlice({
  name: "filteredProducts",
  initialState,
  reducers: {
  },
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
      });
  },
});

export const selectProducts = (state) => state.filteredProducts.value; //defined in alice name
export default filteredProductsSlice.reducer;
