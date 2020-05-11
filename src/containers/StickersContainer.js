import * as React from "react";
import Stickers from "../components/Stickers";
import {connect} from 'react-redux';
import {createSticker, deleteSticker, edit, editDismiss, loadStickers, moveSticker, save} from '../actions/index';

const mapStateToProps = (state) => {
	return Object.assign({}, state.stickers, {
		boardId:    state.boards.boardId,
		boardsList: state.boards.boards,
	});
};

const mapDispatchToProps = (dispatch) => {
	return {
		/**
		 * @param {number} stickerId Идентификатор стикера
		 * @param {Coords} movementCoords Координаты, на которые стикер был перемещён
		 * @param {Map<string, Coords>} allStickersCoords Кооординаты всех стикеров
		 * @param {Map<number, StickerModel>} stickersList Стикеры
		 */
		onStickerMoved:  (stickerId, movementCoords, allStickersCoords, stickersList) => {
			const newStickers = new Map(stickersList.entries());

			/** @type {StickerPosition[]} */
			const changes = [
				{
					stickerId: stickerId,
					index:     0,
				},
				{
					stickerId: null,
					index:     0,
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
		onEditSticker:   (id) => {
			dispatch(edit(id));
		},
		onSave:          (sticker) => {
			dispatch(save(sticker));
		},
		onDelete:        (id) => {
			dispatch(deleteSticker(id));
		},
		onEditDismiss:   () => {
			dispatch(editDismiss());
		},
		onOpened:        (boardId) => {
			dispatch(loadStickers(boardId));
		},
	};
};

const StickersContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Stickers);

export default StickersContainer;