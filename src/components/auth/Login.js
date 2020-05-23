import * as React from "react";
import ModalCustom from "../custom/ModalCustom";
import TextField from "@material-ui/core/TextField/TextField";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";

/**
 * @property {function} props.doLogin
 * @property {string}   state.login
 * @property {string}   state.password
 */
export default class Login extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			login:    '',
			password: '',
		};

		this.onComplete = this.onComplete.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	onComplete() {
		/** @type {AuthRequest} */
		const request = {
			login:    this.state.login,
			password: this.state.password,
		};

		this.props.doLogin(request);
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

	render() {
		return <ModalCustom>
			<Typography variant="subtitle1" id="modal-title">
				Авторизация
			</Typography>

			<TextField
				required
				label="Логин"
				className={this.props.textField}
				margin="normal"
				name="login"
				value={this.state.login}
				onChange={this.handleChange}
			/>

			<br/>

			<TextField
				required
				label="Пароль"
				type="password"
				className={this.props.textField}
				margin="normal"
				name="password"
				value={this.state.password}
				onChange={this.handleChange}
			/>

			<br/>

			<Button variant="contained" color="primary" onClick={this.onComplete}>
				Войти
			</Button>
		</ModalCustom>;
	}
}