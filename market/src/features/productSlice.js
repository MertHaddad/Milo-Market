import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { store } from "../app/store";
import { GetAll as GetProduts, GetPerView } from "../services/items";

//products Slice
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
  // reducers: { fillProducts: (state, action) => (state.value = action.payload) },
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

export const { fillProducts } = productSlice.actions;
export const selectProducts = (state) => state.products.value; //defined in alice name
export default productSlice.reducer;
