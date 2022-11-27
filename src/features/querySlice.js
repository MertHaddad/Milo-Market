import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: ["?_page=1&_limit=16"] };

const manageQueries = (que, state, action) => {
  const findElement = state.find((x) =>
    (que === "_page" ? /_page/ : que === "itemType" ? /itemType/ : /sort/).test(
      x
    )
  );
  const filterResult = state.filter((x) => x !== findElement);
  const resutlt = [...filterResult, action.payload];
  return resutlt;
};

const evaluateQuery = (state, action) => {
  let result = [];
  const sameFilterExists = state.includes(action.payload);
  const pageChanged = /_page=/.test(action.payload);
  const typeFilterExists =
    /itemType/.test(state) && /itemType/.test(action.payload);
  const sortFilterExists = /sort/.test(state) && /sort/.test(action.payload);
  if (/All/.test(action.payload) || /uncheck-brands/.test(action.payload)) {
    if (/All/.test(action.payload)) {
      result = state.filter((query) => !/tags_like/.test(query));
    } else {
      result = state.filter((query) => !/manufacturer/.test(query));
    }
  } else if (sameFilterExists) {
    result = state.filter((query) => query !== action.payload);
  } else if (pageChanged) {
    result = manageQueries("_page", state, action);
  } else if (typeFilterExists) {
    result = manageQueries("itemType", state, action);
  } else if (sortFilterExists) {
    result = manageQueries("sort", state, action);
  } else {
    result = [...state, action.payload];
  }
  return { value: result };
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    setQuery: (state, action) => (state = evaluateQuery(state.value, action)),
  },
});

export const { setQuery } = querySlice.actions;
export const selectQueries = (state) => state.query.value; //defined in alice name
export default querySlice.reducer;
