import AppConstants from "../AppConstants";

const initialState = {
	isReady: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AppConstants.EVENT_NO_LOGIN:
		case AppConstants.EVENT_AUTH_BY_TOKEN_SUCCESS:
		case AppConstants.EVENT_AUTH_BY_TOKEN_FAILED: {
			return {isReady: true};
		}

		default:
			return state;
	}
};