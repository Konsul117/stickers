import AppConstants from "../AppConstants";

const initialState = {
	list: new Map([
		[1, {id: 1, text: 'qwe', index: 1, isNew: false}],
		[2, {id: 2, text: 'asd', index: 2, isNew: false}],
		[3, {id: 3, text: 'zxc', index: 3, isNew: false}],
		[4, {id: 4, text: 'rty', index: 4, isNew: false}],
		[5, {id: 5, text: 'fgh', index: 5, isNew: false}],
		[6, {id: 6, text: 'vbn', index: 6, isNew: false}],
	]),
	editingSticker: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
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
			const maxId = Math.max.apply(Math, Array.from(state.list.keys()));

			/** @type {StickerModel} */
			const sticker = {
				id:    maxId+1,
				index: getMinIndex(state.list) - 1,
				text:  '',
				isNew: true,
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
			const editingSticker = Object.assign({}, newState.editingSticker);
			editingSticker.text  = action.text;
			editingSticker.isNew = false;

			const newStickers = new Map(state.list.entries());
			newStickers.set(editingSticker.id, editingSticker);

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