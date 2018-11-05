import * as React from "react";
import "../styles/stickers.scss";
import StickerContainer from "./StickerContainer";

const stickers = new Map([
	[1, {id: 1, text: 'qwe', index: 1}],
	[2, {id: 2, text: 'asd', index: 2}],
	[3, {id: 3, text: 'zxc', index: 3}],
	[4, {id: 4, text: 'rty', index: 4}],
	[5, {id: 5, text: 'fgh', index: 5}],
	[6, {id: 6, text: 'vbn', index: 6}],
]);

export default class App extends React.PureComponent {
	render() {
		return (
			<StickerContainer stickers={stickers}/>
		);
	}
}