//This file renders our application and attach it to the redux store

import React from "react";
// import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";

import App from "./App";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
//deprec createStore could be causing hook error - likely
//const store = createStore(reducers, compose(applyMiddleware(thunk)));
const store = configureStore(
  { reducer: reducers },
  compose(applyMiddleware(thunk))
);
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// ReactDOM.render(
//   <Provider>
//     <App store={store} />
//   </Provider>,
//   document.getElementById("root")
// );

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
