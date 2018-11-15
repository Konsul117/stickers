import * as React from "react";
import VisibleStickers from "../containers/VisibleStickers";

export default class App extends React.PureComponent {
	render() {
		return (
			<div>
				<VisibleStickers/>
			</div>
		);
	}
}