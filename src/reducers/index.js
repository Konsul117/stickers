import {combineReducers} from 'redux';
import stickers from "./stickers";
import errors from "./errors";

let devtools = undefined;

if (module.hot) {
	devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

export default combineReducers({stickers, errors, devtools});