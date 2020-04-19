//если дев-режим, то подключаем devtools
import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./reducers";
import ApiMiddleware from "./middlewares/ApiMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(reducers, composeEnhancers(applyMiddleware(ApiMiddleware)));