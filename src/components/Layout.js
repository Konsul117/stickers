import * as React from "react";
import AuthorizedApp from "./AuthorizedApp";
import LoginContainer from "../containers/auth/LoginContainer";
import AlertContainer from "react-alert";

const alertOptions = {
	offset:     14,
	position:   'bottom left',
	theme:      'dark',
	time:       5000,
	transition: 'scale'
};

/**
 * @property {boolean}     props.isAuth
 * @property {boolean}     props.isReady
 * @property {string|null} props.successMessage Сообщение об успехе
 * @property {string|null} props.errorMessage   Сообщение об ошибке
 */
export default class Layout extends React.PureComponent {
	/**
	 * @inheritdoc
	 */
	componentDidUpdate(prevProps) {
		//если есть сообщение об ошибке и объект-контейнер ошибки отличается от предыдущего состояния, то ошибка обновилась и её нужно вывести
		if (this.props.successMessage && this.props.successMessage !== prevProps.successMessage) {
			this.msg.show(this.props.successMessage, {
				type: 'success',
			});
		}

		if (this.props.errorMessage && this.props.errorMessage !== prevProps.errorMessage) {
			this.msg.show(this.props.errorMessage, {
				type: 'error',
			});
		}
	}
	render() {
		return <React.Fragment>
			{
				this.props.isReady
					? this.props.isAuth
						? <AuthorizedApp/>
						: <LoginContainer/>
					: <p>Грузимся</p>
			}

			<AlertContainer ref={a => this.msg = a} {...alertOptions} />
		</React.Fragment>
	}
}
