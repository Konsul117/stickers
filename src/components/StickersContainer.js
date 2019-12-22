import * as React from "react";
import Sticker from "./Sticker";
import "../styles/stickers.scss";
import StickerOptions from "./StickerOptions";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import AlertContainer from "react-alert";
import VisibleStickers from "../containers/VisibleStickers";

const alertOptions = {
	offset:     14,
	position:   'bottom left',
	theme:      'dark',
	time:       5000,
	transition: 'scale'
};

/**
 * Контейнер стикеров.
 *
 * @property {Map<number, StickerModel>} props.stickers.list      Стикеры
 * @property {boolean}                   props.stickers.isLoading Идёт загрузка
 * @property {Map<number, StickerModel>} state.stickers           Стикеры
 *
 * @property {Map<number, Sticker>} stickersRefs
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
		this.registerStickerRef = this.registerStickerRef.bind(this);
		this.onWindowResize     = this.onWindowResize.bind(this);

		this.stickersCoords = new Map();

		this.stickersRefs = new Map();
	}

	/**
	 * @inheritdoc
	 */
	componentDidMount() {
		this.props.onOpened();
		window.addEventListener('resize', this.onWindowResize);
		this.updaterStickersCoords();
	}

	/**
	 * @inheritdoc
	 */
	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}

	/**
	 * @inheritdoc
	 */
	componentDidUpdate(prevProps) {
		if (prevProps.stickers.list !== this.props.stickers.list) {
			this.setState({
				stickers: this.sortStickers(this.props.stickers.list),
			}, () => {
				this.updaterStickersCoords();
			});

			//очищаем стикеры, которые были удалены
			Array.from(this.stickersRefs.keys()).forEach((id) => {
				if (this.props.stickers.list.has(id) === false) {
					this.stickersRefs.delete(id);
				}
			});
		}

		//если есть сообщение об ошибке и объект-контейнер ошибки отличается от предыдущего состояния, то ошибка обновилась и её нужно вывести
		if (this.props.errors.message && this.props.errors !== prevProps.errors) {
			this.msg.show(this.props.errors.message, {
				type: 'error',
			});
		}
	}

	/**
	 * Обработка при изменении размера экрана.
	 */
	onWindowResize() {
		this.updaterStickersCoords();
	}

	/**
	 * Регистрация ref стикера в списке.
	 */
	registerStickerRef(r) {
		//если стикер отмонтирован, то мы не сможем удалить его из списка, т.к. не знаем его id, потому он будет удалён при обнловлении списка.
		if (r === null) {
			return;
		}

		this.stickersRefs.set(r.props.sticker.id, r);
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
		this.props.onStickerMoved(id, newCoords, this.stickersCoords, this.props.stickers.list);
	}

	/**
	 * Обновление актуальных координат стикеров.
	 */
	updaterStickersCoords() {
		this.stickersCoords = new Map();
		Array.from(this.state.stickers.keys()).forEach((id) => {
			if (this.stickersRefs.has(id) === false) {
				console.debug('Отсутствует ref для стикера', id);

				return;
			}

			this.stickersCoords.set(id, this.stickersRefs.get(id).getCurrentCoords());
		})
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
	 * Обработка клика по стикеру.
	 *
	 * @param {StickerModel} sticker
	 */
	onStickerClick(sticker) {
		this.props.onEditSticker(sticker.id);
	}

	/**
	 * Обработка клика по кнопке добавления стикера.
	 */
	onAddStickerClick() {
		this.props.onCreateSticker();
	}

	/**
	 * @inheritdoc
	 */
	render() {
		return <div className="sticker-container">
			{
				this.props.stickers.isLoading
				? <div className="loading-badge">Загрузка...</div>
				: null

			}
			<Button variant="fab" color="primary" aria-label="Add" onClick={this.onAddStickerClick}>
				<AddIcon />
			</Button>
			{
				Array.from(this.state.stickers.values()).map(/** @param {StickerModel} sticker */(sticker) => {
					return <Sticker ref={this.registerStickerRef} onClick={this.onStickerClick} key={sticker.id} sticker={sticker} onSetCoords={this.onStickerSetCoords} onMoved={this.onStickerMoved}/>
				})
			}

			<StickerOptions
				sticker={this.props.stickers.editingSticker}
				onComplete={this.props.onEditComplete}
				onDelete={this.props.onDelete}
				onDismiss={this.props.onEditDismiss}
			/>
			<AlertContainer ref={a => this.msg = a} {...alertOptions} />
		</div>
	}
}