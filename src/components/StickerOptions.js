import Modal from "@material-ui/core/Modal/Modal";
import {withStyles} from '@material-ui/core/styles';
import * as React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";

const styles = theme => ({
	paper: {
		position:        'absolute',
		width:           theme.spacing.unit*50,
		backgroundColor: theme.palette.background.paper,
		boxShadow:       theme.shadows[5],
		padding:         theme.spacing.unit*4,
	},
	button: {
		margin: theme.spacing.unit,
	},
	textField: {
		marginLeft:  theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width:       '100%',
	},
});

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

/**
 * @property {StickerModel|null} props.sticker
 * @property {function}          props.onComplete
 * @property {function}          props.onDismiss
 */
class StickerOptions extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isOpen: (this.props.sticker !== null),
			text:   (this.props.sticker !== null) ? this.props.sticker.text : '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.onComplete   = this.onComplete.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.sticker !== prevProps.sticker) {
			this.setState({
				isOpen: (this.props.sticker !== null),
				text:   (this.props.sticker !== null) ? this.props.sticker.text : '',
			});
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: event.target.value,
		});
	};

	onComplete() {
		this.props.onComplete(this.state.text);
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Modal open={this.state.isOpen} onClose={this.props.onDismiss}>
					<div style={getModalStyle()} className={classes.paper}>
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
											className={classes.textField}
											margin="normal"
											name="text"
											value={this.state.text}
											onChange={this.handleChange}
										/>
									</Typography>

									<br/>

									<Grid container justify="space-between">
										<Button variant="contained" color="primary" className={classes.button} onClick={this.onComplete}>
											Сохранить
										</Button>

										<Button color="primary" className={classes.button} onClick={this.props.onDismiss}>
											Отмена
										</Button>
									</Grid>
							</React.Fragment>
							: null
						}

					</div>
				</Modal>
			</div>
		)
	}

}

const StickerOptionsWrapped = withStyles(styles)(StickerOptions);

export default StickerOptionsWrapped;