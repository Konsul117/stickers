const storage = {};

class StickerStorage {
	/**
	 *
	 * @param {number} boardId
	 *
	 * @return {Map<number, Sticker>|boolean}}
	 */
	get(boardId) {
		if (storage[boardId] !== undefined) {
			return storage[boardId];
		}

		return false;
	}

	/**
	 *
	 * @param {number} boardId
	 * @param {Map<number, Sticker>} data
	 */
	save(boardId, data) {
		storage[boardId] = data;
	}
}

export default new StickerStorage();