import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sort from "../../../components/options/sort";
import * as axios from "axios";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

jest.mock("axios");

test("should sorting elements renders correctry", () => {
  render(
    <Provider store={store}>
      <Sort />
    </Provider>
  );
  expect(screen.getAllByTestId(/test-sort-radio/i).length).toBeGreaterThan(0);
});

test("should sorting elements response to click", async () => {
  render(
    <Provider store={store}>
      <Sort />
    </Provider>
  );
  const sortButtons = screen.getAllByRole("radio");
  for (let item of sortButtons) {
    await userEvent.click(item);
    expect(item).toBeChecked();
    const queryArray = store.getState().query.value
    expect(queryArray.length).toBeGreaterThan(1)
    expect(/&_order/.test(queryArray)).toBeTruthy()
  }
});
