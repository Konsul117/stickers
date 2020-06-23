import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import ModalCustom from "../custom/ModalCustom";
import Grid from "@material-ui/core/Grid/Grid";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import {Map} from "immutable";
import EditIcon from '@material-ui/icons/Edit';
import BoardForm from "./BoardForm";

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	thead: {
		'& TR': {
			'& TH': {
				fontWeight: "bold",
				'&.title-column': {
					width: '100%',
				},
			},
		},
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
}));

function StyledTable(props) {
	const classes = useStyles();

	return <Paper>
		<TableContainer>
			<Table size="small">
				<TableHead className={classes.thead}>
					{props.tableHeadInner}
				</TableHead>
				<TableBody>
					{props.tableBodyInner}
				</TableBody>
			</Table>
		</TableContainer>
	</Paper>;
}

/**
 * @property {function}           props.onEdit
 * @property {function}           props.onClose
 * @property {function}           props.showError
 * @property {Map<number, Board>} props.list                     Список досок
 * @property {Map<number, Board>} props.isDeletingBatchInProcess Идёт удаление пачки
 * @property {boolean}            props.isEditingSuccess
 * @property {boolean}            props.isEditingFailed
 */
export default class ManageBoardsDialog extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			selectedIds:             new Map(),
			isSelectedIndeterminate: false,
			isSelectedAll:           false,
			isDeleteRequested:       false,
			isProcessing:            false,
			isEditFormShown:         false,
			isEditBoardId:           null,
		};

		this.onSelectOne   = this.onSelectOne.bind(this);
		this.onSelectAll   = this.onSelectAll.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
		this.onDeleteConfirmClick = this.onDeleteConfirmClick.bind(this);
		this.onDeleteDeclineClick = this.onDeleteDeclineClick.bind(this);
		this.onEditClick = this.onEditClick.bind(this);
		this.onEditCancel = this.onEditCancel.bind(this);
		this.onEditSubmit = this.onEditSubmit.bind(this);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (this.props.isDeletingBatchInProcess !== prevProps.isDeletingBatchInProcess) {
			const newState = {isProcessing: this.props.isDeletingBatchInProcess};

			if (this.props.isDeletingBatchInProcess) {
				newState.selectedIds = new Map();
				newState.isSelectedIndeterminate = false;
				newState.isSelectedAll = false;
				newState.isDeleteRequested = false;
			}
			this.setState(newState);
		}

		if (this.props.isEditingSuccess !== prevProps.isEditingSuccess && this.props.isEditingSuccess) {
			this.setState({
				isProcessing: false,
				isEditFormShown: false,
				isEditBoardId: null,
			});
		}

		if (this.props.isEditingFailed !== prevProps.isEditingFailed && this.props.isEditingFailed) {
			this.setState({
				isProcessing: false,
			});
		}
	}

	onSelectAll(e) {
		let selectedIds;

		if (e.target.checked) {
			const idsArray = [];
			Array.from(this.props.list.keys()).forEach((id) => {
				idsArray.push([id, true]);
			});
			selectedIds = new Map(idsArray);
		} else {
			selectedIds = new Map();
		}

		this.setState({
			selectedIds,
			isSelectedIndeterminate: false,
			isSelectedAll:           e.target.checked,
		});
	}

	onDeleteClick() {
		if (this.state.isSelectedAll) {
			this.props.showError('Нельзя удалять все доски!');

			return;
		}

		this.setState({isDeleteRequested: true});
	}

	onDeleteConfirmClick() {
		const request = [];
		Array.from(this.state.selectedIds.keys()).forEach((id) => {
			request.push(id);
		});

		this.props.onDeleteBatch(request);
	}
	
	onDeleteDeclineClick() {
		this.setState({isDeleteRequested: false});
	}

	onSelectOne(e) {
		let newList;
		const id = parseInt(e.target.value);

		if (e.target.checked) {
			newList = this.state.selectedIds.set(id, true);
		} else {
			newList = this.state.selectedIds.delete(id);
		}

		let isSelectedIndeterminate = false;
		if (newList.size < this.props.list.size && newList.size > 0) {
			isSelectedIndeterminate = true;
		}

		this.setState({
			selectedIds: newList,
			isSelectedIndeterminate,
			isSelectedAll: newList.size === this.props.list.size,
		});
	}

	onEditClick(id) {
		this.setState({
			isEditFormShown: true,
			isEditBoardId:   id,
		});
	}

	render() {
		return <ModalCustom>
			{
				this.state.isEditFormShown
					? this.renderEditForm()
					: this.renderList()
			}
		</ModalCustom>;
	}

	onEditCancel() {
		this.setState({
			isEditFormShown: false,
			isEditBoardId:   null,
		});
	}

	/**
	 * @param {Board} board
	 */
	onEditSubmit(board) {
		this.setState({isProcessing: true});
		this.props.onEdit(board);
	}

	renderEditForm() {
		const board = this.props.list.get(this.state.isEditBoardId);

		return <BoardForm isAdd={false} onCancel={this.onEditCancel} onSubmit={this.onEditSubmit} board={board} isProcessing={this.state.isProcessing} />
	}

	renderList() {
		if (this.props.list.size === 0) {
			return <React.Fragment>
				<p>Доски отсутствуют</p>
				<Button variant="contained" color="primary" onClick={this.props.onClose} disabled={this.state.isProcessing}>
					Закрыть
				</Button>
			</React.Fragment>;
		}

		return <React.Fragment>
			<Typography variant="subtitle1" id="modal-title">
				Редактирование досок
			</Typography>

			<StyledTable {...this.props}
			             tableHeadInner={this.renderTableHeadInner()}
			             tableBodyInner={this.renderTableBodyInner()}

			/>

			<br/>

			<Grid container justify="space-between">
				{
					this.state.isDeleteRequested
						? <React.Fragment>
							<Button variant="contained" color="primary" onClick={this.onDeleteConfirmClick} disabled={this.state.selectedIds.size === 0 || this.state.isProcessing}>
								Точно удалить
							</Button>

							<Button variant="contained" color="secondary" onClick={this.onDeleteDeclineClick} disabled={this.state.selectedIds.size === 0 || this.state.isProcessing}>
								Отмена
							</Button>
						</React.Fragment>
						: <Button variant="contained" color="primary" onClick={this.onDeleteClick} disabled={this.state.selectedIds.size === 0 || this.state.isProcessing}>
							Удалить
						</Button>
				}

				<Button variant="contained" color="primary" onClick={this.props.onClose} disabled={this.state.isProcessing}>
					Закрыть
				</Button>
			</Grid>
		</React.Fragment>;
	}

	renderTableHeadInner() {
		return <TableRow>
			<TableCell padding="checkbox">
				<Checkbox
					indeterminate={this.state.isSelectedIndeterminate}
					checked={this.state.isSelectedAll}
					onChange={this.onSelectAll}
				/>
			</TableCell>
			<TableCell className="title-column">
				Название
			</TableCell>
			<TableCell/>
		</TableRow>;
	}

	renderTableBodyInner() {
		return <React.Fragment>
			{
				Array.from(this.props.list.values()).map(/** @param {Board} board */(board) => {
					const isSelected = this.state.selectedIds.has(board.id);

					return <TableRow
						hover
						role="checkbox"
						aria-checked={isSelected}
						tabIndex={-1}
						key={board.id}
						selected={isSelected}
					>
						<TableCell padding="checkbox">
							<Checkbox
								onClick={this.onSelectOne}
								value={board.id}
								checked={isSelected}
							/>
						</TableCell>
						<TableCell>
							{board.title}
						</TableCell>

						<TableCell>
							<Button color="default" size="small" onClick={() => this.onEditClick(board.id)}>
								<EditIcon/>
							</Button>
						</TableCell>
					</TableRow>;
				})
			}
		</React.Fragment>;
	}
}
