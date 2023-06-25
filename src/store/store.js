import { applyMiddleware } from "redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducer } from "../state/reducers/allProductsReducers";
import { productDetailsReducer } from "../state/reducers/productDetialsReducers";
import { cartListReducer } from "../state/reducers/cartListReducers"

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cartList: cartListReducer,
})
const initialState = {}
const middleWare = [thunk]
const store = configureStore({ reducer }, initialState,
    composeWithDevTools(applyMiddleware(...middleWare)))

export default store
