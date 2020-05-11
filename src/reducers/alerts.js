import AppConstants from "../AppConstants";

const initialState = {
	error:   null,
	success: null,
	id:      null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AppConstants.EVENT_SHOW_MESSAGE_SUCCESS: {
			return Object.assign({}, state, {
				success: action.message,
				error:   null,
				id:      action.id,
			});
		}

		case AppConstants.EVENT_SHOW_MESSAGE_ERROR: {
			return Object.assign({}, state, {
				success: null,
				error:   action.message,
				id:      action.id,
			});
		}

		default:
			return state;
	}
};