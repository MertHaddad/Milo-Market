import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetPerView } from "../services/items";

const initialState = {
  value: [],
  status: "idle",
};

export const getItems = createAsyncThunk("getItems/api", async (query = []) => {
  const resp = await GetPerView();
  return resp.data;
});


export const productSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.value = action.payload;
      })
      .addCase(getItems.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const selectProducts = (state) => state.products.value;
export default productSlice.reducer;
