import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import reducers from "./modules";

const punkApiClient = axios.create({
  baseURL: "https://api.punkapi.com/v2/beers",
  responseType: "json"
});

const composedMiddlewares = applyMiddleware(
  axiosMiddleware(punkApiClient),
  thunkMiddleware
);

const storeEnhancers = composeWithDevTools({
  name: "Archieewald: BeerGURU"
})(composedMiddlewares);

const makeStore = initialState => {
  return createStore(reducers, initialState, storeEnhancers);
};

const initialState = {};

export default makeStore(initialState);
