import AppConstants from "../AppConstants";

const initialState = {
	message: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AppConstants.EVENT_SHOW_ERROR: {
			console.log(action.message);
			return Object.assign({}, state, {message: action.message});
		}

		default:
			return state;
	}
};