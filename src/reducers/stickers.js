import AppConstants from "../AppConstants";

const initialState = {
	list:            new Map(),
	boardId:         null,
	editingSticker:  null,
	isSavingSuccess: false,
	isSavingFailed:  false,
	isLoading:       true,
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
				const item = Object.assign({}, newStickers.get(change.stickerId));
				item.index = change.index;
				newStickers.set(change.stickerId, item);
			});

			const newState = Object.assign({}, state);
			newState.list = newStickers;

			return newState;
		}

		case AppConstants.EVENT_STICKER_CREATE: {
			/** @type {StickerModel} */
			const sticker = {
				id:     null,
				index:  getMinIndex(state.list)-1,
				text:   '',
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

		case AppConstants.EVENT_STICKER_SAVE: {
			const newState = Object.assign({}, state);
			newState.isSavingSuccess = false;
			newState.isSavingFailed  = false;

			return newState;
		}

		case AppConstants.EVENT_STICKER_SAVE_SUCCESS: {
			const newState = Object.assign({}, state);
			newState.isSavingSuccess = true;
			newState.editingSticker  = null;

			/** @type {StickerModel} */
			const savedSticker = action.sticker;

			if (savedSticker.board_id === state.boardId) {
				const newStickers = new Map(state.list.entries());

				newStickers.set(savedSticker.id, savedSticker);
				newState.list = newStickers;
			}

			return newState;
		}

		case AppConstants.EVENT_STICKER_SAVE_FAILED: {
			const newState = Object.assign({}, state);
			newState.isSavingFailed = true;

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

		case AppConstants.EVENT_BOARD_SELECT: {
			const newState = Object.assign({}, state);
			newState.boardId = action.id;

			if (action.id === null) {
				newState.list = new Map();
			}

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
