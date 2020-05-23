import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";

/**
 * @property {Board}    [props.board]
 * @property {boolean}  props.isAdd
 * @property {boolean}  props.isProcessing
 * @property {function} props.onSubmit
 * @property {function} props.onCancel
 */
export default class BoardForm extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
		};

		if (this.props.board) {
			this.state = Object.assign({}, this.state, this.getStateByBoard(this.props.board));
		}

		this.handleChange = this.handleChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	/**
	 * @param {Board} board
	 */
	getStateByBoard(board) {
		return {
			title: board.title,
		};
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	onSubmit() {
		/** @var {Board} */
		const model = {
			title: this.state.title,
		};

		if (this.props.board) {
			model.id = this.props.board.id;
		}

		this.props.onSubmit(model);
	}

	render() {
		return <React.Fragment>
			<Typography variant="subtitle1" id="modal-title">
				{
					this.props.isAdd
					? 'Добавить доску'
					: 'Редактирование доски'
				}
			</Typography>

			<FormControl fullWidth={true}>
				<TextField
					required
					label="Название"
					margin="normal"
					name="title"
					value={this.state.title}
					onChange={this.handleChange}
				/>
			</FormControl>

			<br/><br/>

			<Grid container justify="space-between">
				<Button variant="contained" color="primary" onClick={this.onSubmit} disabled={this.props.isProcessing}>
					{
						this.props.isAdd
						? 'Добавить'
						: 'Сохранить'
					}
				</Button>

				<Button variant="contained" color="primary" onClick={this.props.onCancel} disabled={this.props.isProcessing}>
					Отмена
				</Button>
			</Grid>
		</React.Fragment>;
	}
}