import AppConstants from "../AppConstants";

export const add =
	/**
	 * @param {Board} board
	 */
	(board) => {
		return {
			type: AppConstants.EVENT_BOARD_CREATE_STARTED,
			board,
		};
	};

export const edit =
	/**
	 * @param {Board} board
	 */
	(board) => {
		return {
			type: AppConstants.EVENT_BOARD_EDIT_STARTED,
			board,
		};
	};

export const deleteBatch =
	(list) => {
		return {
			type: AppConstants.EVENT_BOARD_DELETE_BATCH_STARTED,
			list,
		};
	};