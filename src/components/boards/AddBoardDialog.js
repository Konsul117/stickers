import ModalCustom from "../custom/ModalCustom";
import React from "react";
import BoardForm from "./BoardForm";

/**
 * @property {function} props.onClose
 * @property {function} props.onAdd
 * @property {boolean}  props.isCreationSuccess
 * @property {boolean}  props.isCreationFailed
 *
 * @property {boolean} state.isProcessing
 */
export default class AddBoardDialog extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			title:        '',
			isProcessing: false,
		}
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.isCreationSuccess !== prevProps.isCreationSuccess && this.props.isCreationSuccess === true) {
			this.setState({isProcessing: false}, () => this.props.onClose());
		}

		if (this.props.isCreationFailed !== prevProps.isCreationFailed && this.props.isCreationFailed === true) {
			this.setState({isProcessing: false});
		}
	}

	onSubmit(model) {
		this.setState({isProcessing: true});
		this.props.onAdd(model);
	}

	render() {
		return <ModalCustom onClose={this.props.onClose}>
			<BoardForm onSubmit={this.onSubmit} onCancel={this.props.onClose} isAdd={true} isProcessing={this.state.isProcessing}/>
		</ModalCustom>;
	}
}