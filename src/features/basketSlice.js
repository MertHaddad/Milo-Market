import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: 0,
  quantity: 0,
  basketProducts: [],
  showBasket: {show:false,message:""},
};

const handleShowBasket = (state, action) => {
  state.showBasket = action;
};

const handleQuantityChange = (state, action) => {
  const checkExisting = state.basketProducts.find(
    (product) => product.name === action.product
  );
  if (checkExisting) {
    if (action.action === "increase") {
      console.log("recived increse order!");
      state.basketProducts.map(
        (product) => product.name === action.product && product.quantity++
      );
      state.payment += action.price;
      state.quantity++;
      state.showBasket = {payload:{show:true,message:"Quantity increased"}};
    } else if (action.action === "decrease") {
      state.basketProducts.map(
        (product) => product.name === action.product && product.quantity--
      );
      state.payment -= action.price;
      state.quantity--;
      let checkQuantity = state.basketProducts.find(
        (product) => product.name === action.product
      );
      if (checkQuantity.quantity === 0) {
        state.showBasket = {payload:{show:true,message:"Product removed"}};
        state.basketProducts = state.basketProducts.filter(
          (product) => product.name !== checkQuantity.name
        );
      }
      else{
        state.showBasket = {payload:{show:true,message:"Quantity decreased"}};
      }
    } else return;
  } else {
    if (action.action === "increase") {
      handleAddProduct(state, action);
    }
  }
};

const handleAddProduct = (state, action) => {
  const checkExisting = state.basketProducts.find(
    (product) =>
      product.name === (action?.payload?.product.name || action.product)
  );
  if (!checkExisting) {
    state.showBasket = {payload:{show:true,message:"Product added"}};
    console.log("recived first Adding order!");
    console.log(action);
    state.basketProducts.push({
      quantity: 1,
      name: action?.payload?.product.name || action.product,
      price: action?.payload?.product.price || action.price,
    });
    state.payment += action?.payload?.product.price || action.price;
    state.quantity++;
  } else {
    handleQuantityChange(state, {
      product: action.payload.product.name,
      action: "increase",
      price: action.payload.product.price,
    });
  }
};

export const basketSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setQuantity: (state, action) => {
      handleQuantityChange(state, action.payload);
    },
    addProduct: (state, action) => {
      handleAddProduct(state, action);
    },
    showBasket: (state, action) => {
      handleShowBasket(state, action);
    },
    emptyBasket: (state) => {
      state.basketProducts = [];
      state.payment = 0;
      state.quantity = 0;
    },
  },
});

export const { addProduct, setQuantity, showBasket,emptyBasket } = basketSlice.actions;

export const selectBasket = (state) => state.counter;

export default basketSlice.reducer;
