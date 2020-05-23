import AppConstants from "../AppConstants";

export const login = (authRequest) => {
	return {
		type: AppConstants.EVENT_LOGIN_STARTED,
		request: authRequest
	};
};

export const checkAuth = (token) => {
	return {
		type: AppConstants.EVENT_AUTH_BY_TOKEN_STARTED,
		token
	};
};

export const logOut = () => {
	return {
		type: AppConstants.EVENT_AUTH_LOGOUT_STARTED,
	};
};

export const notAuthenticated = () => {
	return {
		type: AppConstants.EVENT_NO_LOGIN,
	};
};