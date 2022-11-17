import {  createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: 0,
  basketProducts: [],
};

const handleQuantityChange = (state, action) => {
  console.log(action);
  
  if(action.action === "increase"){
    state.basketProducts.map(product=>product.name===action.product && product.quantity++)
    state.payment+=action.price
  }
  else{
    state.basketProducts.map(product=>product.name===action.product && product.quantity--)
    state.payment-=action.price;
    let checkQuantity = state.basketProducts.find(
      (product) => product.name === action.product
    );
    if(checkQuantity.quantity === 0){
      state.basketProducts = state.basketProducts.filter(product=> product.name!==checkQuantity.name) 
    }
  }
};

const handleAddProduct = (state, action) => {
  const checkExisting = state.basketProducts.find(
    (product) => product.name === action.payload.product.name
  );
  if (!checkExisting) {
    state.basketProducts.push({
      quantity: 1,
      name: action.payload.product.name,
      price: action.payload.product.price,
    });
    state.payment += action.payload.product.price;
  } else {
    handleQuantityChange(state,{
      product: action.payload.product.name,
      action: "increase",
      price:action.payload.product.price
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
  },
});

export const { addProduct, setQuantity } = basketSlice.actions;

export const selectBasket = (state) => state.counter;

export default basketSlice.reducer;
