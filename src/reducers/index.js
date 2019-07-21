import {combineReducers} from 'redux';
import stickers from "./stickers";

let devtools = undefined;

if (module.hot) {
	devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

export default combineReducers({stickers, devtools});