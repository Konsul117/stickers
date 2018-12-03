import * as React from "react";
import Sticker from "./Sticker";
import "../styles/stickers.scss";
import StickerOptions from "./StickerOptions";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

/**
 * Контейнер стикеров.
 *
 * @property {Map<string, StickerModel>} props.stickers Стикеры
 */
export default class StickersContainer extends React.PureComponent {
	/**
	 * @inheritdoc
	 */
	constructor(props) {
		super(props);

		this.state = {
			stickers:       this.sortStickers(this.props.stickers.list),
			editingSticker: null,
		};

		this.onStickerSetCoords = this.onStickerSetCoords.bind(this);
		this.onStickerMoved     = this.onStickerMoved.bind(this);
		this.onStickerClick     = this.onStickerClick.bind(this);
		this.onAddStickerClick  = this.onAddStickerClick.bind(this);

		this.stickersCoords = new Map();
	}

	/**
	 * Обработка получения координат от стикера.
	 *
	 * @param {number} id     Идентификатор стикера
	 * @param {Coords} coords Координаты
	 */
	onStickerSetCoords(id, coords) {
		this.stickersCoords.set(id, coords);
	}

	/**
	 * Обработка перемещения от стикера.
	 *
	 * @param {number} id        Идентификатор стикера
	 * @param {Coords} newCoords Новые координаты
	 */
	onStickerMoved(id, newCoords) {
		this.props.onStickerMoved(id, newCoords, this.stickersCoords);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.stickers.list !== this.props.stickers.list) {
			this.setState({
				stickers: this.sortStickers(this.props.stickers.list),
			});
		}
	}

	/**
	 * Сортировка стикеров.
	 *
	 * @param {Map<number, StickerModel>} stickersInput Стикеры для сортировки
	 *
	 * @return {Map<number, StickerModel>}
	 */
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

	/**
	 *
	 * @param {StickerModel} sticker
	 */
	onStickerClick(sticker) {
		this.props.onEditSticker(sticker.id);
	}

	onAddStickerClick() {
		this.props.onCreateSticker();

		// this.setState({
		// 	editingSticker: sticker,
		// });
	}

	/**
	 * @inheritdoc
	 */
	render() {
		return <div className="sticker-container">
			<Button variant="fab" color="primary" aria-label="Add" onClick={this.onAddStickerClick}>
				<AddIcon />
			</Button>
			{
				Array.from(this.state.stickers.values()).map(/** @param {StickerModel} sticker */(sticker) => {
					return <Sticker onClick={this.onStickerClick} key={sticker.id} sticker={sticker} onSetCoords={this.onStickerSetCoords} onMoved={this.onStickerMoved}/>
				})
			}

			<StickerOptions sticker={this.props.stickers.editingSticker} onComplete={this.props.onEditComplete} onDismiss={this.props.onEditDismiss} />
		</div>
	}
}