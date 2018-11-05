import {AppContainer} from 'react-hot-loader';
import ReactDOM from "react-dom";
import React from "react";
import App from './components/App.js';
import 'moment/locale/ru';
import './extendings/extendings';
import './extendings/string';

const render = (Component) => {
	ReactDOM.render(
		<AppContainer>
			<Component />
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