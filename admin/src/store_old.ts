import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducers from "@/reducers";

console.log(Reducers, '666')

const middlewares = [thunk];

const enhancers = compose(applyMiddleware(...middlewares));
const store = createStore(Reducers, enhancers);
export default store;
