import axios from "../axios";
import {showError, loadedStickers} from '../actions/index';
import AppConstants from "../AppConstants";

export default store => next => action => {
	switch(action.type) {
		case AppConstants.EVENT_STICKER_EDIT_COMPLETE:
			/** @type {StickerModel} */
			const sticker = action.sticker;

			if (sticker.is_new) {
				axios.post('/ticket', sticker)
					.then()
					.catch((e) => {
						store.dispatch(showError('Не удалось сохранить стикер'));
					});
			} else {
				axios.put('/ticket/' + sticker.id, sticker)
					.then()
					.catch((e) => {
						store.dispatch(showError('Не удалось сохранить стикер'));
					});
			}

			break;

		case AppConstants.EVENT_STICKER_MOVE:
			axios.post('/ticket/batch', Array.from(store.getState().stickers.list.values()))
				.then()
				.catch((e) => {
					store.dispatch(showError('Не удалось сохранить стикеры'));
				});

			break;

		case AppConstants.EVENT_STICKERS_LOADING:
			axios.get('/ticket')
				.then((result) => {
					const stickers = new Map();
					result.data.forEach(/** @param {StickerModel} item */(item) => {
						item.is_new = false;
						stickers.set(item.id, item);
					});
					store.dispatch(loadedStickers(stickers))
				})
				.catch((e) => {
					store.dispatch(showError('Не удалось загрузить стикеры'));
				});
			break;
	}

	next(action);
}