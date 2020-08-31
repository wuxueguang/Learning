// import { createStore, compose, applyMiddleware } from "redux";

// import thunk from "redux-thunk";

// import createReducer from '@/reducers';

// const middlewares = [thunk];

// const enhancers = compose(applyMiddleware(...middlewares));

// const Reducer = createReducer()

// let Store = createStore(Reducer, enhancers);

// export default Store ;

// export function injectAsyncReducer(store, name, reducer) {
//   store.asyncReducers[name] = reducer;
//   store.replaceReducer(createReducer(store.asyncReducers));
// }