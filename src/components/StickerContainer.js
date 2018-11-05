import * as React from "react";
import Sticker from "./Sticker";

/**
 * @property {Map<string, StickerModel>} props.stickers Стикеры
 *
 * @property {Map<string, StickerModel>} state.stickers Стикеры
 */
export default class StickerContainer extends React.PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			stickers: this.sortStickers(this.props.stickers),
		};

		this.onStickerSetCoords = this.onStickerSetCoords.bind(this);
		this.onStickerMoved   = this.onStickerMoved.bind(this);

		this.stickersCoords = new Map();
	}

	onStickerSetCoords(id, coords) {
		this.stickersCoords.set(id, coords);
	}

	onStickerMoved(id, movementCoords) {
		const newStickers = new Map(this.state.stickers.entries());

		this.stickersCoords.forEach((itemCoords, itemId) => {
			if (itemId === id) {
				return;
			}

			let isChange = false;
			if (movementCoords.beginY >= itemCoords.beginY && movementCoords.beginY <= itemCoords.endY && movementCoords.beginX >= itemCoords.beginX && movementCoords.beginX <= itemCoords.endX) {
				isChange = true;
			}

			if (isChange) {
				let itemSticker = newStickers.get(itemId);
				let currSticker = newStickers.get(id);

				const itemIndex = itemSticker.index;

				itemSticker = Object.assign({}, itemSticker);
				itemSticker.index = currSticker.index;

				currSticker = Object.assign({}, currSticker);
				currSticker.index = itemIndex;

				newStickers.set(id, currSticker);
				newStickers.set(itemId, itemSticker);

				this.setState({
					stickers: this.sortStickers(newStickers),
				});
			}
		});
	}

	/**
	 beginX
	 beginY
	 endX
	 endY
	 */

	componentDidUpdate(prevProps) {
		if (prevProps.stickers !== this.props.stickers) {
			this.setState({
				stickers: this.sortStickers(this.props.stickers),
			});
		}
	}

	sortStickers(stickersInput) {
		const stickersArray = Array.from(stickersInput.values());

		const newStickersArray = stickersArray.sort(/**
		 * @param {StickerModel} a
		 * @param {StickerModel} b
		 */(a, b) => {
			if (a.index < b.index) {
				return -1;
			}
			else if (a.index < b.index) {
				return 1;
			}

			return 0;
		});

		const newStickersMap = new Map();

		newStickersArray.forEach(/** @param {StickerModel} sticker */(sticker) => {
			newStickersMap.set(sticker.id, sticker);
		});

		return newStickersMap;
	}

	render() {
		if (this.state.stickers === null) {
			return null;
		}

		return <div className="sticker-container">
			{
				Array.from(this.state.stickers.values()).map(/** @param {StickerModel} sticker */(sticker) => {
					return <Sticker key={sticker.id} sticker={sticker} onSetCoords={this.onStickerSetCoords} onMoved={this.onStickerMoved}/>
				})
			}
		</div>
	}

}