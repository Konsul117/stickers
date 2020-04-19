import {combineReducers} from 'redux';
import stickers from "./stickers";
import auth from "./auth";
import alerts from "./alerts";
import bootstrap from "./bootstrap";

let devtools = undefined;

if (module.hot) {
	devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

export default combineReducers({
	bootstrap,
	stickers,
	alerts,
	auth,
	devtools,
});