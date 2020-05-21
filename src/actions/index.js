import AppConstants from "../AppConstants";
import uuid from "js-uuid";

export const moveSticker =

	/**
	 * @param {StickerPosition[]} changes Изменения, вызванные перемещением
	 *
	 * @return {object}
	 */
	(changes) => {
		return {
			type: AppConstants.EVENT_STICKER_MOVE,
			changes,
		};
	};

export const createSticker =

	/**
	 * Создание стикера.
	 *
	 * @return {object}
	 */
	() => {
		return {
			type: AppConstants.EVENT_STICKER_CREATE,
		};
	};

export const edit =

	/**
	 * Создание стикера.
	 *
	 * @return {object}
	 */
		(id) => {
		return {
			type: AppConstants.EVENT_STICKER_EDIT,
			id:   id,
		};
	};

export const save =

	/**
	 * Создание стикера.
	 *
	 * @return {object}
	 */
	(sticker) => {
		return {
			type:    AppConstants.EVENT_STICKER_SAVE,
			sticker: sticker,
		};
	};

export const editDismiss =

	/**
	 * Создание стикера.
	 *
	 * @return {object}
	 */
	() => {
		return {
			type: AppConstants.EVENT_STICKER_EDIT_DISMISS,
		};
	};

export const deleteSticker =

	/**
	 * Удаление стикера.
	 *
	 * @return {object}
	 */
		(id) => {
		return {
			type: AppConstants.EVENT_STICKER_DELETE,
			id:   id,
		};
	};

//@TODO-12.05.2020-Kazancev A. перенести в message actions
export const showSuccess =

	/**
	 * Удаление стикера.
	 *
	 * @return {object}
	 */
		(message) => {
		return {
			type:    AppConstants.EVENT_SHOW_MESSAGE_SUCCESS,
			message: message,
			id:      uuid.v4(),
		};
	};

export const showError =

	/**
	 * Удаление стикера.
	 *
	 * @return {object}
	 */
	(message) => {
		return {
			type:    AppConstants.EVENT_SHOW_MESSAGE_ERROR,
			message: message,
			id:      uuid.v4(),
		};
	};

	//@TODO-10.05.2020-Kazancev A. перенести в boards actions
export const loadBoards = () => {
	return {
		type: AppConstants.EVENT_BOARDS_LOADING,
	};
};

export const loadedBoards = (boards) => {
	return {
		type:   AppConstants.EVENT_BOARDS_LOADED,
		boards: boards,
	};
};

export const selectBoard = (id) => {
	return {
		type: AppConstants.EVENT_BOARD_SELECT,
		id:   id,
	};
}

export const loadStickers = (boardId) => {
	return {
		type: AppConstants.EVENT_STICKERS_LOADING,
		boardId,
	};
};

export const loadedStickers = (stickers) => {
	return {
		type:     AppConstants.EVENT_STICKERS_LOADED,
		stickers: stickers,
	};
};