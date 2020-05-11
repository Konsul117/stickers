import * as React from "react";
import Sticker from "./Sticker";
import "../styles/stickers.scss";
import StickerOptions from "./StickerOptions";
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

/**
 * Контейнер стикеров.
 *
 * @property {Map<number, Board>}        props.boardsList      Список досок
 * @property {number|null}               props.boardId         Текущая доска
 * @property {Map<number, StickerModel>} props.list            Стикеры
 * @property {boolean}                   props.isLoading       Идёт загрузка
 * @property {boolean}                   props.isSavingSuccess
 * @property {boolean}                   props.isSavingFailed
 * @property {Map<number, StickerModel>} state.stickers        Стикеры
 *
 * @property {Map<number, Sticker>} stickersRefs
 */
export default class Stickers extends React.PureComponent {
	/**
	 * @inheritdoc
	 */
	constructor(props) {
		super(props);

		this.state = {
			stickers:       this.sortStickers(this.props.list),
			editingSticker: null,
		};

		this.onStickerSetCoords = this.onStickerSetCoords.bind(this);
		this.onStickerMoved     = this.onStickerMoved.bind(this);
		this.onStickerClick     = this.onStickerClick.bind(this);
		this.onAddStickerClick  = this.onAddStickerClick.bind(this);
		this.registerStickerRef = this.registerStickerRef.bind(this);
		this.onWindowResize     = this.onWindowResize.bind(this);

		this.stickersCoords = new Map();
		this.stickersRefs   = new Map();
	}

	/**
	 * @inheritdoc
	 */
	componentDidMount() {
		if (this.props.boardId) {
			this.props.onOpened(this.props.boardId);
		}
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
		if (this.props.boardId !== prevProps.boardId) {
			this.props.onOpened(this.props.boardId);
		}
		if (prevProps.list !== this.props.list) {
			this.setState({
				stickers: this.sortStickers(this.props.list),
			}, () => {
				this.updaterStickersCoords();
			});

			//очищаем стикеры, которые были удалены
			Array.from(this.stickersRefs.keys()).forEach((id) => {
				if (this.props.list.has(id) === false) {
					this.stickersRefs.delete(id);
				}
			});
		}

		//если есть сообщение об ошибке и объект-контейнер ошибки отличается от предыдущего состояния, то ошибка обновилась и её нужно вывести
		if (this.props.errorMessage && this.props.errorMessage !== prevProps.errorMessage) {
			this.msg.show(this.props.errorMessage, {
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
		this.props.onStickerMoved(id, newCoords, this.stickersCoords, this.props.list);
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
				this.props.isLoading
				? <div className="loading-badge">Загрузка...</div>
				: <React.Fragment>
					<Fab color="primary" aria-label="Add" onClick={this.onAddStickerClick}>
						<AddIcon />
					</Fab>
					{
						Array.from(this.state.stickers.values()).map(/** @param {StickerModel} sticker */(sticker) => {
							return <Sticker ref={this.registerStickerRef} onClick={this.onStickerClick} key={sticker.id} sticker={sticker} onSetCoords={this.onStickerSetCoords} onMoved={this.onStickerMoved}/>
						})
					}

					<StickerOptions
						sticker={this.props.editingSticker}
						onSave={this.props.onSave}
						onDelete={this.props.onDelete}
						onDismiss={this.props.onEditDismiss}
						boardsList={this.props.boardsList}
						currentBoardId={this.props.boardId}
						isSavingSuccess={this.props.isSavingSuccess}
						isSavingFailed={this.props.isSavingFailed}
					/>
				</React.Fragment>
			}
		</div>
	}
}