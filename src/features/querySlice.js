import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: ["?_page=1&_limit=24"] };

const evaluateQuery = (state, action) => {
  const { payload } = action;
  const sameFilterExists = state.includes(payload);
  const pageChanged = /_page=/.test(payload);
  const typeFilterExists = /itemType/.test(state) && /itemType/.test(payload);
  const sortFilterExists = /sort/.test(state) && /sort/.test(payload);

  let result = [];

  if (/All|uncheck-brands/.test(payload)) {
    result = state.filter((query) => !/tags_like|manufacturer/.test(query));
  } else if (sameFilterExists) {
    result = state.filter((query) => query !== payload);
  } else if (pageChanged || typeFilterExists || sortFilterExists) {
    const que = pageChanged ? "_page" : typeFilterExists ? "itemType" : "sort";
    const findElement = state.find((x) => new RegExp(que).test(x));
    const filterResult = state.filter((x) => x !== findElement);
    result = [...filterResult, payload];
  } else {
    result = [...state, payload];
  }

  return { value: result };
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action) => (state = evaluateQuery(state.value, action)),
    clearQuery: (state) => (state = initialState),
  },
});

export const { setQuery,clearQuery } = querySlice.actions;
export const selectQueries = (state) => state.query.value; //defined in alice name
export default querySlice.reducer;
