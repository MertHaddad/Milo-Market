import React from "react";
import { render, waitFor } from "@testing-library/react";
import { rest } from "msw"; //mock server worker
import { setupServer } from "msw/node"; //mock server worker
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as axios from "axios";
import { Provider } from "react-redux";
import { store } from "./../../app/store";
import Products from "../../components/products/products";
import App from "./../../App";
// jest.mock("axios");

const response = [
  {
    tags: ["Trees"],
    price: 10.99,
    name: "Handcrafted Trees shirt",
    description:
      "enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur",
    slug: "Handcrafted-Trees-shirt",
    added: 1485723766805,
    manufacturer: "OHara-Group",
    itemType: "shirt",
  },
  {
    tags: ["Beach", "Ocean", "Water"],
    price: 19.99,
    name: "Rustic Beach Mug",
    description:
      "totam at veritatis eligendi assumenda ex quia praesentium quibusdam ducimus",
    slug: "Rustic-Beach-Mug",
    added: 1481573896833,
    manufacturer: "Sipes-Inc",
    itemType: "mug",
  },
  {
    tags: ["Animal", "Bear"],
    price: 17.99,
    name: "Handcrafted Bear Mug",
    description:
      "vitae mollitia et in accusantium est voluptas officiis est non",
    slug: "Handcrafted-Bear-Mug",
    added: 1485991071829,
    manufacturer: "Weissnat-Schowalter-and-Koelpin",
    itemType: "mug",
  },
];
const responseMug = [
  {
    tags: ["Beach", "Ocean", "Water"],
    price: 19.99,
    name: "Rustic Beach Mug",
    description:
      "totam at veritatis eligendi assumenda ex quia praesentium quibusdam ducimus",
    slug: "Rustic-Beach-Mug",
    added: 1481573896833,
    manufacturer: "Sipes-Inc",
    itemType: "mug",
  },
  {
    tags: ["Animal", "Bear"],
    price: 17.99,
    name: "Handcrafted Bear Mug",
    description:
      "vitae mollitia et in accusantium est voluptas officiis est non",
    slug: "Handcrafted-Bear-Mug",
    added: 1485991071829,
    manufacturer: "Weissnat-Schowalter-and-Koelpin",
    itemType: "mug",
  },
];
const responseShirt = [
  {
    tags: ["Trees"],
    price: 10.99,
    name: "Handcrafted Trees shirt",
    description:
      "enim corporis voluptatibus laudantium possimus alias dolorem voluptatem similique aut aliquam voluptatem voluptatem omnis id consequatur",
    slug: "Handcrafted-Trees-shirt",
    added: 1485723766805,
    manufacturer: "OHara-Group",
    itemType: "shirt",
  },
];

beforeAll(() => server.listen());
beforeAll(() => server.resetHandlers());
afterAll(() => server.close());

const server = setupServer(
  rest.get("http://194.233.161.103:7000/items", (req, res, ctx) => {
    const type = req.url.searchParams.getAll("itemType")[0];
    return res(
      ctx.status(200),
      ctx.json(
        type === "mug" ? responseMug : type === "shirt" ? responseShirt : response
      )
    );
  })
);

test("should spinner shows while loading", async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const spinnerElement = screen.getByTestId("spinner");
  expect(spinnerElement).toBeInTheDocument();
});

test("should render products and add to cart on Click", async () => {
  render(
    <Provider store={store}>
      <Products />
    </Provider>
  );
  const products = await waitFor(() => screen.findAllByTestId("product-item"), {
    timeout: 4000,
  });
  expect(products.length).toBeGreaterThanOrEqual(3);
  const addButtons = screen.getAllByTestId("add-button");
  for (let [index, item] of addButtons.entries()) {
    await userEvent.click(item);
    const basketProducts = store.getState().basket.basketProducts;
    expect(basketProducts.length).toBeGreaterThan(index);
  }
});

test("should filter by type works efficiently", async () => {
  render(
    <Provider store={store}>
      <Products />
    </Provider>
  );
  const filterMug = screen.getByTestId("filter-by-type-mug");
  const filterShirt = screen.getByTestId("filter-by-type-shirt");
  await userEvent.click(filterMug);
  const queryArrayMug = store.getState().query.value;
  const productArrayAfterMugFilter = store.getState().product.value;
  for (let item of productArrayAfterMugFilter){
    expect(item.itemType).toEqual("mug")
  }
  expect(/itemType=mug/.test(queryArrayMug)).toBeTruthy();
  await userEvent.click(filterShirt);
  const queryArrayMugShirt = store.getState().query.value;

  expect(/itemType=shirt/.test(queryArrayMugShirt)).toBeTruthy();
  const productsAfterTypeFilter = store.getState().product.value;
  for (let item of productsAfterTypeFilter){
    expect(item.itemType).toEqual("shirt")
  }
});
