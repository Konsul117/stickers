import AppConstants from "../AppConstants";

const initialState = {
	error:   null,
	success: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AppConstants.EVENT_SHOW_MESSAGE_SUCCESS: {
			return Object.assign({}, state, {
				success: action.message,
				error:   null,
			});
		}

		case AppConstants.EVENT_SHOW_MESSAGE_ERROR: {
			return Object.assign({}, state, {
				success: null,
				error:   action.message
			});
		}

		default:
			return state;
	}
};