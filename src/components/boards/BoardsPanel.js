import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import "../../styles/stickers.scss";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddBoardDialog from "./AddBoardDialog";
import ManageBoardsDialog from "./ManageBoardsDialog";

/**
 * @property {function}           props.onOpened
 * @property {function}           props.onSelect
 * @property {function}           props.onAdd
 * @property {function}           props.onEdit
 * @property {function}           props.showError
 * @property {function}           props.logOut
 * @property {Map<number, Board>} props.list       Список досок
 * @property {number|null}        props.selectedId Текущая выбранная доска
 * @property {function}           props.onAdd
 * @property {boolean}            props.isCreationInProcess
 * @property {boolean}            props.isCreationSuccess
 * @property {boolean}            props.isCreationFailed
 *
 * @property {boolean} state.menuOpened
 */
export default class BoardsPanel extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			menuOpened:  false,
			isAddShown:  false,
			isEditShown: false,
		};

		this.onChangeTab        = this.onChangeTab.bind(this);
		this.onMenuBtnClicked   = this.onMenuBtnClicked.bind(this);
		this.onMenuClose        = this.onMenuClose.bind(this);
		this.onAddBoardClick    = this.onAddBoardClick.bind(this);
		this.onEditBoardsClick  = this.onEditBoardsClick.bind(this);
		this.onAddBoardClosed   = this.onAddBoardClosed.bind(this);
		this.onEditBoardsClosed = this.onEditBoardsClosed.bind(this);
		this.onLogout           = this.onLogout.bind(this);
		this.props.onOpened();
		this.anchorEl = null;
	}

	onChangeTab(event, newValue) {
		this.props.onSelect(newValue);
	}

	onMenuBtnClicked(e) {
		this.setState({menuOpened: !this.state.menuOpened});
		this.anchorEl = e.currentTarget;
	}

	onMenuClose() {
		this.setState({menuOpened: false});
	}

	onAddBoardClick() {
		this.setState({
			menuOpened: false,
			isAddShown: true,
		});
	}

	onAddBoardClosed() {
		this.setState({
			isAddShown: false,
		});
	}

	onEditBoardsClick() {
		this.setState({
			menuOpened: false,
			isEditShown: true,
		});
	}

	onEditBoardsClosed() {
		this.setState({
			isEditShown: false,
		});
	}

	onLogout() {
		this.props.logOut();
	}

	render() {
		return (
			<div className="sticker-boards">
				<AppBar position="static">
					<Toolbar>
						<IconButton edge="start" color="inherit" aria-label="simple-menu" onClick={this.onMenuBtnClicked}>
							<MenuIcon />
						</IconButton>
						<Menu
							id="simple-menu"
							keepMounted
							open={this.state.menuOpened}
							onClose={this.onMenuClose}
							anchorEl={this.anchorEl}
						>
							<MenuItem onClick={this.onAddBoardClick}>Добавить доску</MenuItem>
							<MenuItem onClick={this.onEditBoardsClick}>Редактирование досок</MenuItem>
							<MenuItem onClick={this.onLogout}>Выход</MenuItem>
						</Menu>
						{
							(this.props.selectedId !== null)
							?
								<Tabs
									onChange={this.onChangeTab}
									value={this.props.selectedId}
									className="board-buttons"
									centered={true}
								>
									{
										Array.from(this.props.list.values()).map(/** @param {Board} board */(board) => {
											return <Tab key={board.id} label={board.title} id={board.id} value={board.id} />
										})
									}
								</Tabs>
							:
								null
						}
					</Toolbar>
				</AppBar>

				{
					this.state.isAddShown
					? <AddBoardDialog
						onClose={this.onAddBoardClosed}
						onAdd={this.props.onAdd}
						isCreationSuccess={this.props.isCreationSuccess}
						isCreationFailed={this.props.isCreationFailed}
					/>
					: null
				}

				{
					this.state.isEditShown
					? <ManageBoardsDialog
						list={this.props.list}
						onEdit={this.props.onEdit}
						onClose={this.onEditBoardsClosed}
						onDeleteBatch={this.props.onDeleteBatch}
						isEditingSuccess={this.props.isEditingSuccess}
						isEditingFailed={this.props.isEditingFailed}
						isDeletingBatchInProcess={this.props.isDeletingBatchInProcess}
						showError={this.props.showError}
					/>
					: null
				}

			</div>
		);
	}
}