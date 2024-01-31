import { combineReducers } from "redux";
import user from "./user-reducer";
import products from "./products-reducer";
import product from "./product-reducer";
import cart from "./shopping-cart-reducer";
import url from "./payment-reducer";

export default combineReducers({ user, products, product, cart, url });
