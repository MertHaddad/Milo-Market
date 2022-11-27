import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAll as GetBrands } from "../services/brands";

const initialState = {
  value: [],
  status: "idle",
};

export const getBrands = createAsyncThunk("getBrands/api", async () => {
  const resp = await GetBrands();
  return resp.data;
});

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  // reducers: { fillProducts: (state, action) => (state.value = action.payload) },
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.value = action.payload;
      })
      .addCase(getBrands.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

// export const { fillProducts } = brandSlice.actions;
export const selectBrands = (state) => state.brands.value; //defined in alice name
export default brandSlice.reducer;
