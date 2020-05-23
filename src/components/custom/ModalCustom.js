import * as React from "react";
import Modal from "@material-ui/core/Modal/Modal";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
	paper: {
		position:        'absolute',
		width:           theme.spacing.unit*50,
		backgroundColor: theme.palette.background.paper,
		boxShadow:       theme.shadows[5],
		padding:         theme.spacing.unit*4,
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
 * @property {boolean} props.open
 * @property {function} props.onClose
 */
class ModalInner extends React.PureComponent {
	render() {
		const props = Object.assign({}, {open: true}, this.props);

		return <Modal {...props} disableEnforceFocus>
			<div style={getModalStyle()} className={this.props.classes.paper}>
				{this.props.children}
			</div>
		</Modal>;
	}
}

const ModalCustom = withStyles(styles)(ModalInner);

export default ModalCustom;