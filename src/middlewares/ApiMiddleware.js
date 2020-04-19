import axios from "../axios";
import {loadedStickers, showError} from '../actions/index';
import AppConstants from "../AppConstants";
import AuthService from "./../services/AuthService";

export default store => next => action => {
	switch(action.type) {
		case AppConstants.EVENT_STICKER_EDIT_COMPLETE:
			/** @type {StickerModel} */
			const sticker = action.sticker;

			if (sticker.is_new) {
				axios.post('/ticket', sticker)
					.then()
					.catch(() => {
						store.dispatch(showError('Не удалось сохранить стикер'));
					});
			} else {
				axios.put('/ticket/' + sticker.id, sticker)
					.then()
					.catch(() => {
						store.dispatch(showError('Не удалось сохранить стикер'));
					});
			}

			break;

		case AppConstants.EVENT_STICKER_MOVE:
			axios.post('/ticket/batch', Array.from(store.getState().stickers.list.values()))
				.then()
				.catch(() => {
					store.dispatch(showError('Не удалось сохранить стикеры'));
				});

			break;

		case AppConstants.EVENT_STICKERS_LOADING:
			axios.get('/ticket')
				.then(/** @param {AjaxResponse} result */(result) => {
					const stickers = new Map();
					result.data.forEach(/** @param {StickerModel} item */(item) => {
						item.is_new = false;
						stickers.set(item.id, item);
					});
					store.dispatch(loadedStickers(stickers))
				})
				.catch(() => {
					store.dispatch(showError('Не удалось загрузить стикеры'));
				});
			break;

		case AppConstants.EVENT_LOGIN_STARTED:
			axios.post('/auth/login', action.request)
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
						store.dispatch({
							type:    AppConstants.EVENT_SHOW_MESSAGE_ERROR,
							message: response.message,
						});
					}
					//@TODO-19.04.2020-Kazancev A. общая обработка неизвестных ошибок
				});
			break;

		case AppConstants.EVENT_AUTH_BY_TOKEN_STARTED:
			axios.get('/auth/status?token=' + action.token)
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
	}

	next(action);
}