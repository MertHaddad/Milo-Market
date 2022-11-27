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

test("Should make api request and render 16 item as result and add all to Cart", async () => {
  render(
    <Provider store={store}>
        <App />
    </Provider>
  );
  const products = await waitFor(()=>screen.findAllByTestId("product-item"),{ timeout: 4000 })
  expect(products.length).toBeGreaterThan(15)
  const addButtons = screen.getAllByText("Add")
  for (const button of addButtons){
    button.click()
  }
  const basketProducts = store.getState().basket.basketProducts;
  expect(basketProducts.length).toEqual(addButtons.length);
});
