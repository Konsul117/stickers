import AppConstants from "../AppConstants";
import axios from "../axios";
import {selectBoard, showError} from "../actions";

export default store => next => action => {
	switch (action.type) {
		case AppConstants.EVENT_BOARD_CREATE_STARTED:
			axios.post('/board', action.board)
				.then((result) => {
					/** @type {Board} */
					const board = result.data;

					store.dispatch({
						type:  AppConstants.EVENT_BOARD_CREATE_SUCCESS,
						board: board,
					});
					store.dispatch({
						type:    AppConstants.EVENT_SHOW_MESSAGE_SUCCESS,
						message: 'Доска успешно добавлена: ' + board.title,
					});
				})
				.catch((e) => {
					store.dispatch({
						type:  AppConstants.EVENT_BOARD_CREATE_FAILED,
					});
					if (e.response) {
						/** @type {AjaxResponse} */
						const response = e.response.data;

						if (response.message) {
							store.dispatch(showError(response.message));
						} else if (e.response.status === 422) {
							store.dispatch(showError(response[0].message));
						}
					}
				});
			break;

		case AppConstants.EVENT_BOARD_EDIT_STARTED:
			/** @type {Board} */
			const board = action.board;
			axios.put('/board/' + board.id, board)
				.then((result) => {
					/** @type {Board} */
					const resultBoard = result.data;

					store.dispatch({
						type:  AppConstants.EVENT_BOARD_EDIT_SUCCESS,
						board: resultBoard,
					});
					store.dispatch({
						type:    AppConstants.EVENT_SHOW_MESSAGE_SUCCESS,
						message: 'Доска успешно сохранена',
					});
				})
				.catch((e) => {
					store.dispatch({
						type:  AppConstants.EVENT_BOARD_EDIT_FAILED,
					});
					if (e.response) {
						/** @type {AjaxResponse} */
						const response = e.response.data;

						if (response.message) {
							store.dispatch(showError(response.message));
						} else if (e.response.status === 422) {
							store.dispatch(showError(response[0].message));
						}
					}
				});
			break;

		case AppConstants.EVENT_BOARD_DELETE_BATCH_STARTED:
			const ids = action.list;
			const currentBoardId = store.getState().stickers.boardId;
			//если среди удаляемых досок есть та, которая открыта сейчас, то открываем другую доску
			if (ids.includes(currentBoardId)) {
				let newBoardId = null;

				/** @type {Map<number, Board>} */
				const boards = store.getState().boards.boards;
				boards.forEach((board) => {
					if (ids.includes(board.id) === false) {
						newBoardId = board.id;
					}
				});

				if (newBoardId !== null) {
					store.dispatch(selectBoard(newBoardId));
				}
			}

			axios.post('/board/batch', action.list)
				.then((result) => {
					/** @type {Board} */
					const board = result.data;

					store.dispatch({
						type:  AppConstants.EVENT_BOARD_DELETE_BATCH_SUCCESS,
						board: board,
					});
					store.dispatch({
						type:    AppConstants.EVENT_SHOW_MESSAGE_SUCCESS,
						message: 'Доски успешно удалены',
					});
				})
				.catch((e) => {
					store.dispatch({
						type:  AppConstants.EVENT_BOARD_DELETE_BATCH_FAILED,
					});
					if (e.response) {
						/** @type {AjaxResponse} */
						const response = e.response.data;

						if (response.message) {
							store.dispatch(showError(response.message));
						} else if (e.response.status === 422) {
							store.dispatch(showError(response[0].message));
						}
					}
				});
			break;

		case AppConstants.EVENT_BOARD_DELETE_BATCH_SUCCESS:
			store.dispatch({
				type: AppConstants.EVENT_BOARDS_LOADING,
			});
			break;
	}

	next(action);
};