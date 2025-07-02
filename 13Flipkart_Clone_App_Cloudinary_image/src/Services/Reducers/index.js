import { combineReducers } from "redux";
import Product_Reducer from "./ProductReducers";
import authReducer from "./authReducers";

const rootReducer = combineReducers({
    Product_Reducer,
    authReducer,
});

export default rootReducer;