import {AppContainer} from 'react-hot-loader';
import ReactDOM from "react-dom";
import React from "react";
import App from './components/App.js';
import 'moment/locale/ru';
import './extendings/extendings';
import './extendings/string';
import {createStore} from "redux";
import reducers from "./reducers";
import {Provider} from "react-redux";

const store = createStore(reducers);

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Provider store={store}>
				<Component />
			</Provider>
		</AppContainer>,
		document.getElementById('mount-point')
	);
};

render(App);
// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./components/App', () => {
		const NextRootContainer = require('./components/App').default;
		render(NextRootContainer);
	});
}