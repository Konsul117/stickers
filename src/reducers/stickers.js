import AppConstants from "../AppConstants";

const initialState = {
	list: new Map([
		[1, {id: 1, text: 'qwe', index: 1}],
		[2, {id: 2, text: 'asd', index: 2}],
		[3, {id: 3, text: 'zxc', index: 3}],
		[4, {id: 4, text: 'rty', index: 4}],
		[5, {id: 5, text: 'fgh', index: 5}],
		[6, {id: 6, text: 'vbn', index: 6}],
	]),
	editingSticker: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case AppConstants.EVENT_STICKER_MOVE: {
			const newStickers = new Map(state.list.entries());

			const movementCoords = action.movementCoords;

			action.allStickersCoords.forEach((itemCoords, itemId) => {
				if (itemId === action.stickerId) {
					return;
				}

				let isChange = false;
				if (movementCoords.beginY >= itemCoords.beginY && movementCoords.beginY <= itemCoords.endY && movementCoords.beginX >= itemCoords.beginX && movementCoords.beginX <= itemCoords.endX) {
					isChange = true;
				}

				if (isChange) {
					/** @type {StickerModel} Стикер, с которым надо поменяться индексами */
					let itemSticker = newStickers.get(itemId);
					/** @type {StickerModel} Стикер, который был передвинут */
					let currSticker = newStickers.get(action.stickerId);

					const itemIndex = itemSticker.index;

					itemSticker = Object.assign({}, itemSticker);
					itemSticker.index = currSticker.index;

					currSticker = Object.assign({}, currSticker);
					currSticker.index = itemIndex;

					newStickers.set(action.stickerId, currSticker);
					newStickers.set(itemId, itemSticker);
				}
			});

			const newState = Object.assign({}, state);
			newState.list = newStickers;

			return newState;
		}

		case AppConstants.EVENT_STICKER_CREATE: {
			const maxId = Math.max.apply(Math, Array.from(state.list.keys()));

			const sticker = {
				id:    maxId+1,
				index: 0,
				text:  '',
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

			const editingSticker = Object.assign({}, newState.editingSticker);
			editingSticker.text = action.text;

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

		default:
			return state;
	}
};