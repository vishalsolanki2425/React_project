import { combineReducers } from "redux";
import recipeReducer from "../Reducers/Recipe_reducer";

const rootReducer = combineReducers({
    recipeReducer
});

export default rootReducer;