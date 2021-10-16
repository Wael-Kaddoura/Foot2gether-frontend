import { userReducer } from "./reducer";
import { createStore } from "redux";

export const store = createStore(userReducer);

export default store;
