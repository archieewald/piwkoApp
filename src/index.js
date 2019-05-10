import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import BeerApp from "./components/App";
import "./style/index.scss";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <BeerApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
