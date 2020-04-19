import AppConstants from "../AppConstants";

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

export const editComplete =

	/**
	 * Создание стикера.
	 *
	 * @return {object}
	 */
	(sticker) => {
		return {
			type:    AppConstants.EVENT_STICKER_EDIT_COMPLETE,
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
		};
	};

export const loadStickers = () => {
	return {
		type: AppConstants.EVENT_STICKERS_LOADING,
	};
};

export const loadedStickers = (stickers) => {
	return {
		type:     AppConstants.EVENT_STICKERS_LOADED,
		stickers: stickers,
	};
};