import AppConstants from "../AppConstants";

const initialState = {
	user: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AppConstants.EVENT_LOGIN_SUCCESS:
		case AppConstants.EVENT_AUTH_BY_TOKEN_SUCCESS: {
			const newState = Object.assign({}, state);
			newState.user = action.user;

			return newState;
		}

		case AppConstants.EVENT_LOGIN_FAILED:
		case AppConstants.EVENT_AUTH_BY_TOKEN_FAILED: {
			const newState = Object.assign({}, state);
			newState.user = null;

			return newState;
		}

		default:
			return state;
	}
};