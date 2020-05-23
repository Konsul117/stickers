import axios from "../axios";
import AppConstants from "../AppConstants";
import {checkAuth, notAuthenticated} from '../actions/auth';
import store from "./../store";

class AuthService {
	constructor() {
		const token = localStorage.getItem(AppConstants.STORAGE_TOKEN_KEY);

		if (token !== null) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			store.dispatch(checkAuth(token));
		} else {
			store.dispatch(notAuthenticated());
		}
	}

	saveAuthToken(token) {
		axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
		localStorage.setItem(AppConstants.STORAGE_TOKEN_KEY, token);
	}

	removeAuthToken() {
		axios.defaults.headers.common['Authorization'] = '';
		localStorage.removeItem(AppConstants.STORAGE_TOKEN_KEY);
	}
}



export default new AuthService();