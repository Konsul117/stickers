import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import ModalCustom from "./custom/ModalCustom";

/**
 * Компонент операций со стикером.
 *
 * @property {StickerModel|null} props.sticker    Стикер
 * @property {function}          props.onDelete   Коллбэк удаления, аргументом передаётся идентификатор стикера
 * @property {function}          props.onComplete Коллбэк завершения правки
 * @property {function}          props.onDismiss  Коллбэк отмены редактирования
 *
 * @property {boolean} state.isOpen      Открыта ли модалка
 * @property {string}  state.text        Текст стикера
 * @property {boolean} isDeleteRequested Запрошено ли удаление
 */
export default class StickerOptions extends React.PureComponent {
	/**
	 * @inheritdoc
	 */
	constructor(props) {
		super(props);

		this.state = this.getInitialStickerState(this.props.sticker);

		this.handleChange         = this.handleChange.bind(this);
		this.onComplete           = this.onComplete.bind(this);
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
	onComplete() {
		const sticker = this.props.sticker;
		sticker.text = this.state.text;
		this.props.onComplete(sticker);
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
						<Typography variant="title" id="modal-title">
							Стикер №{this.props.sticker.id}
						</Typography>
						<Typography variant="subheading" id="simple-modal-description">
							<TextField
								required
								label="Текст"
								className={this.props.textField}
								margin="normal"
								name="text"
								value={this.state.text}
								onChange={this.handleChange}
							/>
						</Typography>

						<br/>

						<Grid container justify="space-between">
							<Button variant="contained" color="primary" onClick={this.onComplete}>
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
		if (this.props.sticker.is_new) {
			return null;
		}

		if (this.state.isDeleteRequested === true) {
			return <Button color="primary" className={this.props.classes.button} onClick={this.onDeleteConfirmClick}>
				Точно?
			</Button>;
		}

		return <Button color="primary" className={this.props.classes.button} onClick={this.onDeleteClick}>
			Удалить
		</Button>;
	}

}