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