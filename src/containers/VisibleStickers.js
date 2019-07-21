import * as React from "react";
import StickersContainer from "./../components/StickersContainer";
import {connect} from 'react-redux';
import {createSticker, deleteSticker, edit, editComplete, editDismiss, moveSticker} from '../actions/index';

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		/**
		 * @param {number} stickerId Идентификатор стикера
		 * @param {Coords} movementCoords Координаты, на которые стикер был перемещён
		 * @param {Map<string, Coords>} allStickersCoords Кооординаты всех стикеров
		 * @param {Map<number, StickerModel>} stickersList Стикеры
		 */
		onStickerMoved: (stickerId, movementCoords, allStickersCoords, stickersList) => {
			const newStickers = new Map(stickersList.entries());

			/** @type {StickerPosition[]} */
			const changes = [
				{
					stickerId: stickerId,
					index: 0,
				},
				{
					stickerId: null,
					index: 0,
				},
			];

			let isChanged = false;
			allStickersCoords.forEach((itemCoords, itemId) => {
				if (itemId === stickerId) {
					return;
				}

				let isChange = false;
				if (movementCoords.beginY >= itemCoords.beginY && movementCoords.beginY <= itemCoords.endY && movementCoords.beginX >= itemCoords.beginX && movementCoords.beginX <= itemCoords.endX) {
					isChange = true;
				}

				if (isChange) {
					isChanged = true;
					/** @type {StickerModel} Стикер, с которым надо поменяться индексами */
					let itemSticker = newStickers.get(itemId);
					/** @type {StickerModel} Стикер, который был передвинут */
					let currSticker = newStickers.get(stickerId);

					changes[0].index = itemSticker.index;
					changes[1].stickerId = itemId;
					changes[1].index = currSticker.index;
				}
			});

			if (!isChanged) {
				return;
			}

			dispatch(moveSticker(changes));
		},
		onCreateSticker: () => {
			dispatch(createSticker());
		},
		onEditSticker: (id) => {
			dispatch(edit(id));
		},
		onEditComplete: (text) => {
			dispatch(editComplete(text));
		},
		onDelete: (id) => {
			dispatch(deleteSticker(id));
		},
		onEditDismiss: () => {
			dispatch(editDismiss());
		},
	};
};

const VisibleStickers = connect(
	mapStateToProps,
	mapDispatchToProps
)(StickersContainer);

export default VisibleStickers;