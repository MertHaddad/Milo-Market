import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAll } from "../services/items";

const initialState = {
  value: [],
  stockByTag: [],
  stockByBrand: [],
  tags: [],
  status: "idle",
  types: [],
};

const getAllTags = (state) => {
  const tags = [];
  for (let item of state.value) {
    tags.push(...item.tags);
  }
  const uniqueTags = [...new Set(tags)];

  return uniqueTags;
};

const queryTypeMap = {
  mug: /mug/i,
  shirt: /shirt/i,
};

const checkQueryType = (query) => {
  for (const [type, regex] of Object.entries(queryTypeMap)) {
    if (regex.test(query)) {
      return type;
    }
  }
  return null;
};

const calculateStockByTags = (state, payload) => {
  const selectedBrands = payload.selected;
  const typeFilterExists = checkQueryType(payload.query);
  const stockByTag = [{ tag: "All", products: payload.filteredProductsNum }];

  const tagCounts = state.value.reduce((counts, item) => {
    item.tags.forEach((tag) => {
      if (selectedBrands.length && selectedBrands[0] !== "All") {
        const evaluateTag = typeFilterExists
          ? item.itemType === typeFilterExists &&
            selectedBrands.includes(item.manufacturer)
          : selectedBrands.includes(item.manufacturer);
        if (evaluateTag) {
          counts[tag] = (counts[tag] || 0) + 1;
        }
      } else if (typeFilterExists ? item.itemType === typeFilterExists : true) {
        counts[tag] = (counts[tag] || 0) + 1;
      }
    });
    return counts;
  }, {});

  state.tags.forEach((tag) => {
    stockByTag.push({
      tag: tag,
      products: tagCounts[tag] || 0,
    });
  });

  return stockByTag;
};

const calculateStockByBrands = (state, action) => {
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
          typeFilterExists
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
          typeFilterExists
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
    getTypes: (state) => {
      const types = state.value.map((item) => item.itemType);
      const uniqueTypes = [...new Set(types)];
      state.types = uniqueTypes;
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

export const { getTags, getStockByTags, getStockByBrands, getTypes } =
  allProductsSlice.actions;
// export const selectProducts = (state) => state.allproducts.value;
export default allProductsSlice.reducer;
