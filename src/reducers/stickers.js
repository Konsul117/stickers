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

		default:
			return state;
	}
};