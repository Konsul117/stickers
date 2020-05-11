import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import ModalCustom from "./custom/ModalCustom";
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";

/**
 * Компонент операций со стикером.
 *
 * @property {Map<number, Board>} props.boardsList      Список досок
 * @property {StickerModel|null}  props.sticker         Стикер
 * @property {number}             props.currentBoardId  Текущая открытая доска
 * @property {function}           props.onDelete        Коллбэк удаления, аргументом передаётся идентификатор стикера
 * @property {function}           props.onSave
 * @property {function}           props.onDismiss       Коллбэк отмены редактирования
 * @property {boolean}            props.isSavingSuccess
 * @property {boolean}            props.isSavingFailed
 *
 * @property {boolean} state.isOpen            Открыта ли модалка
 * @property {string}  state.text              Текст стикера
 * @property {string}  state.boardId           Доска
 * @property {boolean} state.isDeleteRequested Запрошено ли удаление
 */
export default class StickerOptions extends React.PureComponent {
	/**
	 * @inheritdoc
	 */
	constructor(props) {
		super(props);

		this.state = this.getInitialStickerState(this.props.sticker);

		this.handleChange         = this.handleChange.bind(this);
		this.onSaveClick          = this.onSaveClick.bind(this);
		this.onDeleteClick        = this.onDeleteClick.bind(this);
		this.onDeleteConfirmClick = this.onDeleteConfirmClick.bind(this);
	}

	/**
	 * @inheritdoc
	 */
	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.sticker !== prevProps.sticker) {
			this.setState(this.getInitialStickerState(this.props.sticker));
		}

		if (
			(this.props.isSavingSuccess !== prevProps.isSavingSuccess && this.props.isSavingSuccess)
			|| (this.props.isSavingFailed !== prevProps.isSavingFailed && this.props.isSavingFailed)
		) {
			this.setState({isSaving: false});
		}
	}

	/**
	 * Получение начальных параметров состояния на основе нового стикера.
	 *
	 * @param {StickerModel|null} sticker Стикер
	 *
	 * @return {object}
	 */
	getInitialStickerState(sticker) {
		return {
			isOpen:            (sticker !== null),
			text:              (sticker !== null) ? sticker.text : '',
			isDeleteRequested: false,
			boardId:           (sticker !== null) ? (sticker.board_id || this.props.currentBoardId) : null,
			isSaving:          false,
		};
	}

	/**
	 * Обработка изменения формы.
	 *
	 * @param {SyntheticEvent} e Событие
	 */
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	/**
	 * Обработка завершения редактирования.
	 */
	onSaveClick() {
		const sticker = this.props.sticker;
		sticker.text = this.state.text;
		sticker.board_id = this.state.boardId;
		this.props.onSave(sticker);
		this.setState({isSaving: true});
	}

	/**
	 * Обработка нажатия на удаление.
	 */
	onDeleteClick() {
		this.setState({
			isDeleteRequested: true,
		});
	}

	/**
	 * Обработка нажатия на подтверждение удаления.
	 */
	onDeleteConfirmClick() {
		this.props.onDelete(this.props.sticker.id);
	}

	/**
	 * @inheritdoc
	 */
	render() {
		return <ModalCustom open={this.state.isOpen} onClose={this.props.onDismiss}>
			{
				(this.props.sticker !== null)
				? <React.Fragment>
						<Typography variant="subtitle1" id="modal-title">
							Стикер №{this.props.sticker.id}
						</Typography>

						<FormControl fullWidth={true}>
							<TextField
								required
								label="Текст"
								className={this.props.textField}
								margin="normal"
								name="text"
								value={this.state.text}
								onChange={this.handleChange}
								fullWidth={true}
							/>
						</FormControl>

						<br/><br/>

						<FormControl fullWidth={true}>
							<InputLabel>Доска</InputLabel>
							<Select
								value={this.state.boardId}
								name="boardId"
								onChange={this.handleChange}
								label="Доска"
							>
								{
									Array.from(this.props.boardsList.values()).map(/** @param {Board} board */(board) => {
										return <MenuItem key={board.id} value={board.id}>{board.title}</MenuItem>;
									})
								}
							</Select>
						</FormControl>

						<br/><br/>

						<Grid container justify="space-between">
							<Button variant="contained" color="primary" onClick={this.onSaveClick} disabled={this.state.isSaving}>
								Сохранить
							</Button>

							{this.renderDeleteBtn()}

							<Button color="primary" onClick={this.props.onDismiss}>
								Отмена
							</Button>
						</Grid>
				</React.Fragment>
				: null
			}
			</ModalCustom>;
	}

	/**
	 * Рендер кнопки удаления, если она нужна.
	 *
	 * @return {React.ReactNode|null}
	 */
	renderDeleteBtn() {
		if (this.props.sticker.id === null) {
			return null;
		}

		if (this.state.isDeleteRequested === true) {
			return <Button color="primary" onClick={this.onDeleteConfirmClick}>
				Точно?
			</Button>;
		}

		return <Button color="primary" onClick={this.onDeleteClick}>
			Удалить
		</Button>;
	}

}