import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAll } from "../services/items";

const initialState = {
  value: [],
  stockByTag: [],
  stockByBrand: [],
  tags: [],
  status: "idle",
};

const getAllTags = (state) => {
  const tags = [];
  for (let item of state.value) {
    tags.push(...item.tags);
  }
  const uniqueTags = [...new Set(tags)];

  return uniqueTags;
};

const checkQueryType = (query) => {
  if (/itemType/.test(query)) {
    if (/mug/i.test(query)) {
      return "mug";
    } else if (/shirt/i.test(query)) {
      return "shirt";
    }
  } else {
    return false;
  }
};

const calculateStockByTags = (state, payload) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!");
  console.log("calculateStockByTags");
  console.time("calculateStockByTags");
  const selectedBrands = payload.selected;
  const typeFilterExists = checkQueryType(payload.query);
  const stockByTag = [{ tag: "All", products: payload.filteredProductsNum }];
  state.tags.forEach((tag) => {
    let count = 0;
    for (let item of state.value) {
      
      if (
        
        selectedBrands.length &&
        selectedBrands[0] !== "All"
      ) {
        if (
          (item.itemType === typeFilterExists && item.tags.includes(tag)) ||
          item.tags.includes(tag)
        ) {
          const evaluateTag = selectedBrands.includes(item.manufacturer);

          if (evaluateTag) count++;
        }
      } else if (
        (item.itemType === typeFilterExists && item.tags.includes(tag)) ||
        item.tags.includes(tag)
      ) {
        count++;
      }
    }
    stockByTag.push({
      tag: tag,
      products: count,
    });
  });
  console.timeEnd("calculateStockByTags");
  return stockByTag;
};

const calculateStockByBrands = (state, action) => {
  console.log("#######################");
  console.log("calculateStockByBrands");
  // console.log(action.payload.query);
  const typeFilterExists = checkQueryType(action.payload.query);
  const stockByBrand = [
    {
      brand: { name: "All", slug: "uncheck-brands" },
      products: action.payload.filteredProductsNum,
    },
  ];
  const brandsArray = action.payload.brands;
  brandsArray.forEach((brand) => {
    let count = 0;
    for (let item of state.value) {
      if (
        action.payload.selected.length &&
        action.payload.selected[0] !== "All"
      ) {
        if (
          !!typeFilterExists
            ? item.itemType === typeFilterExists &&
              item.manufacturer === brand.slug
            : item.manufacturer === brand.slug
        ) {
          const evaluateTag = action.payload.selected.find((tag) =>
            item.tags.includes(tag)
          );
          if (evaluateTag) count++;
        }
      } else {
        if (
          !!typeFilterExists
            ? item.itemType === typeFilterExists &&
              item.manufacturer === brand.slug
            : item.manufacturer === brand.slug
        )
          count++;
      }
    }
    stockByBrand.push({
      brand: brand,
      products: count,
    });
  });
  return stockByBrand;
};

export const getAllItems = createAsyncThunk("getAllItems/api", async () => {
  const resp = await GetAll();
  return resp.data;
});

export const allProductsSlice = createSlice({
  name: "allproducts",
  initialState,
  reducers: {
    getTags: (state) => {
      state.tags = getAllTags(state);
    },
    getStockByTags: (state, action) => {
      state.stockByTag = calculateStockByTags(state, action.payload);
    },
    getStockByBrands: (state, action) => {
      state.stockByBrand = calculateStockByBrands(state, action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.value = action.payload;
      })
      .addCase(getAllItems.rejected, (state) => {
        state.status = "rejected";
      });
  },
});

export const { getTags, getStockByTags, getStockByBrands } =
  allProductsSlice.actions;
export const selectProducts = (state) => state.allproducts.value; //defined in alice name
export default allProductsSlice.reducer;
