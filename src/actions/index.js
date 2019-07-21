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
		(text) => {
		return {
			type: AppConstants.EVENT_STICKER_EDIT_COMPLETE,
			text: text,
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