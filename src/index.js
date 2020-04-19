import {AppContainer} from 'react-hot-loader';
import ReactDOM from "react-dom";
import React from "react";
import 'moment/locale/ru';
import './extendings/extendings';
import './extendings/string';
import {Provider} from "react-redux";
import './axios';
import LayoutContainer from './containers/LayoutContainer';
import "./services/AuthService";
import store from "./store";

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

render(LayoutContainer);
// Webpack Hot Module Replacement API
if (module.hot) {
	module.hot.accept('./containers/LayoutContainer', () => {
		const NextRootContainer = require('./containers/LayoutContainer').StickersContainer;
		render(NextRootContainer);
	});
}