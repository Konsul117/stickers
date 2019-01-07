import * as React from "react";
import StickersContainer from "./../components/StickersContainer";
import {connect} from 'react-redux';
import {createSticker, deleteSticker, edit, editComplete, editDismiss, moveSticker} from '../actions/index';

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		onStickerMoved: (stickerId, movementCoords, allStickersCoords) => {
			dispatch(moveSticker(stickerId, movementCoords, allStickersCoords));
		},
		onCreateSticker: () => {
			dispatch(createSticker());
		},
		onEditSticker: (id) => {
			dispatch(edit(id));
		},
		onEditComplete: (text) => {
			dispatch(editComplete(text));
		},
		onDelete: (id) => {
			dispatch(deleteSticker(id));
		},
		onEditDismiss: () => {
			dispatch(editDismiss());
		},
	};
};

const VisibleStickers = connect(
	mapStateToProps,
	mapDispatchToProps
)(StickersContainer);

export default VisibleStickers;