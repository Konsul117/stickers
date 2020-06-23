import axios from "../axios";
import {loadedBoards, loadedStickers, showError, showSuccess} from '../actions/index';
import AppConstants from "../AppConstants";
import AuthService from "./../services/AuthService";
import {selectBoard} from "../actions";

const CURRENT_BOARD_ID_KEY = 'currentBoardId';

export default store => next => action => {
	let callDefaultNext = true;
	switch(action.type) {
		case AppConstants.EVENT_STICKER_SAVE:
			/** @type {StickerModel} */
			const sticker = action.sticker;

			if (sticker.id === null) {
				axios.post(URL_PREFIX + '/ticket', sticker)
					.then((result) => {
						/** @type {StickerModel} */
						const stickerResult = result.data;

						store.dispatch({
							type:    AppConstants.EVENT_STICKER_SAVE_SUCCESS,
							sticker: stickerResult,
						});
					})
					.catch(() => {
						store.dispatch(showError('Не удалось сохранить стикер'));
					});
			} else {
				axios.put(URL_PREFIX + '/ticket/' + sticker.id, sticker)
					.then((result) => {
						/** @type {StickerModel} */
						const stickerResult = result.data;

						store.dispatch({
							type:    AppConstants.EVENT_STICKER_SAVE_SUCCESS,
							sticker: stickerResult,
						});
					})
					.catch(() => {
						store.dispatch(showError('Не удалось сохранить стикер'));
					});
			}
			break;

		case AppConstants.EVENT_STICKER_DELETE:
			axios.delete(URL_PREFIX + '/ticket/' + action.id)
				.then(() => {
					store.dispatch({
						type: AppConstants.EVENT_STICKER_DELETE_SUCCESS,
						id:   action.id,
					});
					store.dispatch(showSuccess('Стикер успешно удалён'));
				})
				.catch(() => {
					store.dispatch({
						type: AppConstants.EVENT_STICKER_DELETE_SUCCESS,
						id:   action.id,
					});
					store.dispatch(showError('Не удалось удалить стикер'));
				});
			break;

		case AppConstants.EVENT_STICKER_MOVE:
			axios.post(URL_PREFIX + '/ticket/batch', action.changes)
				.then()
				.catch(() => {
					store.dispatch(showError('Не удалось сохранить стикеры'));
				});
			break;

		case AppConstants.EVENT_BOARD_SELECT:
			let boardId = localStorage.getItem(CURRENT_BOARD_ID_KEY);
			if (boardId !== action.id) {
				if (action.id !== null) {
					localStorage.setItem(CURRENT_BOARD_ID_KEY, action.id);
				} else {
					localStorage.removeItem(CURRENT_BOARD_ID_KEY);
				}
			}
			break;

		case AppConstants.EVENT_BOARDS_LOADING:
			axios.get(URL_PREFIX + '/board')
				.then(/** @param {AjaxResponse} result */(result) => {
					/** @type {Map<number, Board>} */
					const boards = new Map();
					result.data.forEach(/** @param {StickerModel} item */(item) => {
						boards.set(item.id, item);
					});
					store.dispatch(loadedBoards(boards))

					//берём из сессии идентификатор доски. Если его нет или он не существует в списке, то берём первую доску в списке
					let boardId = localStorage.getItem(CURRENT_BOARD_ID_KEY);
					if (boardId === null || (boards.has(boardId) === false)) {
						if (boards.size > 0) {
							/** @type {Board} */
							const firstBoard = boards.entries().next().value[1];
							boardId = firstBoard.id;
						}
					}

					if (boardId !== null) {
						boardId = parseInt(boardId);
						store.dispatch(selectBoard(boardId));
					}
				})
				.catch(() => {
					store.dispatch(showError('Не удалось загрузить стикеры'));
				});
			break;

		case AppConstants.EVENT_STICKERS_LOADING:
			//@TODO-03.05.2020-Kazancev A. сохранение и получение из локального кэша
			// const savedData = StickerStorage.get(action.boardId);
			//
			// if (savedData !== false) {
			// 	callDefaultNext = false;
			// 	store.dispatch(loadedStickers(savedData));
			// }

			axios.get(URL_PREFIX + '/ticket?boardId='+action.boardId)
				.then(/** @param {AjaxResponse} result */(result) => {
					const stickers = new Map();
					result.data.forEach(/** @param {StickerModel} item */(item) => {
						stickers.set(item.id, item);
					});
					store.dispatch(loadedStickers(stickers));
					// StickerStorage.save(action.boardId, stickers);
				})
				.catch(() => {
					store.dispatch(showError('Не удалось загрузить стикеры'));
					store.dispatch(loadedStickers(new Map()));
				});
			break;

		case AppConstants.EVENT_LOGIN_STARTED:
			axios.post(URL_PREFIX + '/auth/login', action.request)
				.then((result) => {
					/** @type {AjaxResponse} */
					const response = result.data;
					/** @type {UserFront} */
					const user = response.data;

					AuthService.saveAuthToken(user.token);

					store.dispatch({
						type: AppConstants.EVENT_LOGIN_SUCCESS,
						user: user,
					});
					store.dispatch({
						type:    AppConstants.EVENT_SHOW_MESSAGE_SUCCESS,
						message: 'Вы авторизовались как пользователь: ' + user.name,
					});
				})
				.catch((e) => {
					store.dispatch({type: AppConstants.EVENT_LOGIN_FAILED});

					if (e.response) {
						/** @type {AjaxResponse} */
						const response = e.response.data;
						store.dispatch(showError(response.message));
					}
					//@TODO-19.04.2020-Kazancev A. общая обработка неизвестных ошибок
				});
			break;

		case AppConstants.EVENT_AUTH_BY_TOKEN_STARTED:
			axios.get(URL_PREFIX + '/auth/status?token=' + action.token)
				.then((result) => {
					/** @type {AjaxResponse} */
					const response = result.data;

					/** @type {UserFront|null} */
					const user = response.data;
					store.dispatch({
						type: (user !== null) ? AppConstants.EVENT_AUTH_BY_TOKEN_SUCCESS : AppConstants.EVENT_AUTH_BY_TOKEN_FAILED,
						user: user,
					});
				})
				.catch(() => {
					store.dispatch({type: AppConstants.EVENT_AUTH_BY_TOKEN_FAILED});
				});
			break;

		case AppConstants.EVENT_AUTH_LOGOUT_STARTED:
			axios.post(URL_PREFIX + '/auth/logout')
				.then(() => {
					AuthService.removeAuthToken();

					store.dispatch({
						type: AppConstants.EVENT_AUTH_LOGOUT_SUCCESS,
					});
				})
				.catch(() => {
					store.dispatch({
						type: AppConstants.EVENT_AUTH_LOGOUT_FAILED,
					});
				});
			break;
	}

	if (callDefaultNext) {
		next(action);
	}
}
