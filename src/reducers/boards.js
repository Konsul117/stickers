import AppConstants from "../AppConstants";

const initialState = {
	isCreationSuccess:        false,
	isCreationFailed:         false,
	isEditingSuccess:         false,
	isEditingFailed:          false,
	isDeletingBatchInProcess: false,
	deletingIds:              null,
	boards:                   new Map(),
	boardId:                  null,
	isLoading:                true,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AppConstants.EVENT_BOARDS_LOADING: {
			const newState = Object.assign({}, state);
			newState.isLoading = true;

			return newState;
		}

		case AppConstants.EVENT_BOARDS_LOADED: {
			const newState = Object.assign({}, state);
			newState.isLoading = false;
			newState.boards    = action.boards;

			return newState;
		}

		case AppConstants.EVENT_BOARD_SELECT: {
			const newState = Object.assign({}, state);
			newState.boardId = action.id;

			return newState;
		}

		case AppConstants.EVENT_BOARD_CREATE_STARTED: {
			const newState = Object.assign({}, state);
			newState.isCreationSuccess   = false;
			newState.isCreationFailed    = false;

			return newState;
		}

		case AppConstants.EVENT_BOARD_CREATE_SUCCESS: {
			const newState = Object.assign({}, state);
			newState.isCreationSuccess   = true;
			newState.isCreationFailed    = false;
			const boardsArray = Array.from(newState.boards.values());
			boardsArray.push(action.board);

			const boardsArraySorted = boardsArray.sort(/**
			 * @param {Board} a
			 * @param {Board} b
			 */(a, b) => {
				if (a.index < b.index) {
					return -1;
				}
				else if (a.index < b.index) {
					return 1;
				}

				return 0;
			});

			newState.boards = new Map();
			boardsArraySorted.forEach((item, i) => {
				newState.boards.set(i, item);
			});

			return newState;
		}

		case AppConstants.EVENT_BOARD_CREATE_FAILED: {
			const newState = Object.assign({}, state);
			newState.isCreationSuccess   = false;
			newState.isCreationFailed    = true;

			return newState;
		}

		case AppConstants.EVENT_BOARD_DELETE_BATCH_STARTED: {
			const newState = Object.assign({}, state);
			newState.isDeletingBatchInProcess = true;
			newState.deletingIds              = action.list;

			return newState;
		}

		case AppConstants.EVENT_BOARD_DELETE_BATCH_SUCCESS: {
			const newState = Object.assign({}, state);
			newState.isDeletingBatchInProcess = false;

			const newList = new Map();
			state.boards.forEach((board, id) => {
				if (state.deletingIds.includes(id) === false) {
					newList.set(id, board);
				}
			});
			newState.deletingIds = null;
			newState.boards = newList;

			return newState;
		}

		case AppConstants.EVENT_BOARD_DELETE_BATCH_FAILED: {
			const newState = Object.assign({}, state);
			newState.isDeletingBatchInProcess = false;

			return newState;
		}

		case AppConstants.EVENT_BOARD_EDIT_STARTED: {
			const newState = Object.assign({}, state);
			newState.isEditingSuccess = false;
			newState.isEditingFailed  = false;

			return newState;
		}

		case AppConstants.EVENT_BOARD_EDIT_SUCCESS: {
			/** @type {Board} */
			const editedBoard = action.board;
			const newState = Object.assign({}, state);
			newState.isEditingSuccess = true;

			const newList = new Map();
			state.boards.forEach(/** @param {Board} board */(board) => {
				if (board.id === editedBoard.id) {
					newList.set(editedBoard.id, editedBoard);
				} else {
					newList.set(board.id, board);
				}
			});
			newState.boards = newList;

			return newState;
		}

		case AppConstants.EVENT_BOARD_EDIT_FAILED: {
			const newState = Object.assign({}, state);
			newState.isEditingFailed = true;

			return newState;

		}

		default:
			return state;
	}
};
