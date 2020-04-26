import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import addNotes from "./Reducers";

const middleware = applyMiddleware(thunk);
let store = createStore(addNotes, middleware);

export default store;
