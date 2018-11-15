import * as React from "react";
import StickersContainer from "./../components/StickersContainer";
import {connect} from 'react-redux';
import {moveSticker} from '../actions/index';

const mapStateToProps = (state) => {
	return state;
};

const mapDispatchToProps = (dispatch) => {
	return {
		onStickerMoved: (stickerId, movementCoords, allStickersCoords) => {
			dispatch(moveSticker(stickerId, movementCoords, allStickersCoords));
		}
	}
};

const VisibleStickers = connect(
	mapStateToProps,
	mapDispatchToProps
)(StickersContainer);

export default VisibleStickers;