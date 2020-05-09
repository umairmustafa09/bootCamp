import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import noteReducer from "./Reducers/notes";
import userReducer from "./Reducers/user";
import usersReducer from "./Reducers/users";

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({ noteReducer, userReducer, usersReducer });
let store = createStore(rootReducer, middleware);

export default store;
