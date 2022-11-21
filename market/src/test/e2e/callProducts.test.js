import React from "react";
import { render, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as axios from "axios";
import { Provider } from "react-redux";
import { store } from "./../../app/store";
import Products from "../../components/products/products";
import App from "./../../App"
// jest.mock("axios");

test("Should make api request and render 16 item as result", async () => {
  render(
    <Provider store={store}>
        <App />
    </Provider>
  );
  const products = await waitFor(()=>screen.findAllByTestId("product-item"),{ timeout: 4000 })
  expect(products.length).toBeGreaterThan(15)
//   for (let item of sortButtons) {
//     await userEvent.click(item);
//     expect(item).toBeChecked();
//     const queryArray = store.getState().query.value
//     expect(queryArray.length).toBeGreaterThan(1)
//     expect(/&_order/.test(queryArray)).toBeTruthy()
//   }
});
