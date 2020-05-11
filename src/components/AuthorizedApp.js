import * as React from "react";
import StickersContainer from "../containers/StickersContainer";
import BoardsContainer from "../containers/BoardsContainer";

export default class AuthorizedApp extends React.PureComponent {
	render() {
		return <React.Fragment>
			<BoardsContainer/>
			<StickersContainer/>
		</React.Fragment>;
	}
}