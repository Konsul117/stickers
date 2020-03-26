import AppConstants from "../AppConstants";

const initialState = {
	list:           new Map(),
	editingSticker: null,
	isLoading:      false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AppConstants.EVENT_STICKERS_LOADING: {
			const newState = Object.assign({}, state);
			newState.isLoading = true;

			return newState;
		}
		case AppConstants.EVENT_STICKERS_LOADED: {
			const newState = Object.assign({}, state);

			newState.list = action.stickers;
			newState.isLoading = false;

			return newState;
		}

		case AppConstants.EVENT_STICKER_MOVE: {
			const newStickers = new Map(state.list.entries());

			//по переданным изменениям позиций стикеров обновляем индексы у стикеров в состоянии
			action.changes.forEach(/** @param {StickerPosition} change */(change) => {
				newStickers.get(change.stickerId).index = change.index;
			});

			const newState = Object.assign({}, state);
			newState.list = newStickers;

			return newState;
		}

		case AppConstants.EVENT_STICKER_CREATE: {
			let maxId;
			if (state.list.size > 0) {
				maxId = Math.max.apply(Math, Array.from(state.list.keys()));
			}
			else {
				maxId = 0;
			}

			/** @type {StickerModel} */
			const sticker = {
				id:     maxId+1,
				index:  getMinIndex(state.list)-1,
				text:   '',
				is_new: true,
			};

			const newState          = Object.assign({}, state);
			newState.editingSticker = sticker;

			return newState;
		}

		case AppConstants.EVENT_STICKER_EDIT: {
			const newState          = Object.assign({}, state);

			newState.editingSticker = Object.assign({}, state.list.get(action.id));

			return newState;
		}

		case AppConstants.EVENT_STICKER_EDIT_COMPLETE: {
			const newState          = Object.assign({}, state);

			/** @type {StickerModel} */
			const sticker = Object.assign({}, action.sticker);
			sticker.is_new = false;

			const newStickers = new Map(state.list.entries());
			newStickers.set(sticker.id, sticker);

			newState.editingSticker = null;
			newState.list           = newStickers;

			return newState;
		}

		case AppConstants.EVENT_STICKER_EDIT_DISMISS: {
			const newState          = Object.assign({}, state);
			newState.editingSticker = null;

			return newState;

		}

		case AppConstants.EVENT_STICKER_DELETE: {
			const newList = new Map(state.list.entries());
			newList.delete(action.id);

			const newState = Object.assign({}, state);

			newState.list           = newList;
			newState.editingSticker = null;

			return newState;

		}

		default:
			return state;
	}
};

/**
 * Получение минимального индекса стикеров из списка.
 *
 * @param {Map<number, StickerModel>} list Список стикеров
 *
 * @return {number}
 */
const getMinIndex = (list) => {
	let result = null;

	list.forEach((item) => {
		if (result === null || item.index < result) {
			result = item.index;
		}

	});

	return (result !== null ? result : 0);
};