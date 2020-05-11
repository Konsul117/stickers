import * as React from "react";
import {loadBoards, selectBoard, showError} from "../actions";
import {add, deleteBatch, edit} from "../actions/board";
import {connect} from "react-redux";
import BoardsPanel from "../components/boards/BoardsPanel";

const mapStateToProps = (state) => {
	return {
		list:                     state.boards.boards,
		selectedId:               state.boards.boardId,
		isCreationSuccess:        state.boards.isCreationSuccess,
		isCreationFailed:         state.boards.isCreationFailed,
		isDeletingBatchInProcess: state.boards.isDeletingBatchInProcess,
		isEditingSuccess:         state.boards.isEditingSuccess,
		isEditingFailed:          state.boards.isEditingFailed,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOpened: () => {
			dispatch(loadBoards());
		},
		onSelect: (id) => {
			dispatch(selectBoard(id));
		},
		onAdd: (board) => {
			dispatch(add(board));
		},
		onEdit: (board) => {
			dispatch(edit(board));
		},
		onDeleteBatch: (list) => {
			dispatch(deleteBatch(list));
		},
		showError: (message) => {
			dispatch(showError(message));
		},
	};
};

const BoardsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(BoardsPanel);

export default BoardsContainer;