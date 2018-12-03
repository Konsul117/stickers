import AppConstants from "../AppConstants";

export const moveSticker =

	/**
	 * Перемещение стикера.
	 *
	 * @param {number} stickerId Идентификатор стикера
	 * @param {Coords} movementCoords Координаты, на которые стикер был перемещён
	 * @param {Map<string, Coords>} allStickersCoords Кооординаты всех стикеров
	 *
	 * @return {object}
	 */
	(stickerId, movementCoords, allStickersCoords) => {
		return {
			type:              AppConstants.EVENT_STICKER_MOVE,
			stickerId:         stickerId,
			movementCoords:    movementCoords,
			allStickersCoords: allStickersCoords,
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
		(text) => {
		return {
			type: AppConstants.EVENT_STICKER_EDIT_DISMISS,
		};
	};