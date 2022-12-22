import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllFiltered, GetItem } from "../services/items";

const initialState = {
  currentProductNumber: 0,
  item:{}
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
  async (state,action) => {
    const resp = await GetItem(state);
    return resp;
  }
);

export const filteredProductsSlice = createSlice({
  name: "filteredProducts",
  initialState,
  // reducers: {
  //   getItem: (state,action) => {
  //     state.item = GetItem(action.payload);
  //   },
  // },
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
      builder.addCase(getSelectedItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSelectedItem.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.item = action.payload;
      })
      .addCase(getSelectedItem.rejected, (state) => {
        state.status = "rejected";
      });
      
  },
  
});

export const selectProducts = (state) => state.filteredProducts.value; //defined in alice name
export default filteredProductsSlice.reducer;

// export const { getItem } = filteredProductsSlice.actions;
