import * as React from "react";

/**
 * @property {StickerModel} props.sticker     Стикер
 * @property {function}     props.onSetCoords Событие установки координат стикера. Передаёт аргументы: id, Coords
 * @property {function}     props.onMoved     Событие перемещения стикера. Передаёт аргументы: id, Coords
 */
export default class Sticker extends React.PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			isDragging: false,
		};

		this.onDragStart = this.onDragStart.bind(this);
		this.onDragEnd   = this.onDragEnd.bind(this);
		this.setRef   = this.setRef.bind(this);

		this.stickerRef = null;
	}
	onDragStart() {
		this.setState({
			isDragging: true,
		});
	}
	onDragEnd(e) {
		this.setState({
			isDragging: false,
		});
		this.props.onMoved(this.props.sticker.id, {
			beginX: e.clientX,
			beginY: e.clientY,
			endX:   e.clientX + this.stickerRef.offsetWidth,
			endY:   e.clientY + this.stickerRef.offsetHeight,
		});
	}

	setRef(node) {
		this.stickerRef = node;
	}

	componentDidMount() {
		this.props.onSetCoords(this.props.sticker.id, this.getCurrentCoords());
	}

	componentDidUpdate(prevProps) {
		if (this.props.sticker !== prevProps.sticker) {
			this.props.onSetCoords(this.props.sticker.id, this.getCurrentCoords());
		}
	}

	getCurrentCoords() {
		return {
			beginX: this.stickerRef.offsetLeft,
			beginY: this.stickerRef.offsetTop,
			endX:   this.stickerRef.offsetLeft+this.stickerRef.offsetWidth,
			endY:   this.stickerRef.offsetTop+this.stickerRef.offsetHeight,
		};
	}

	render() {
		let divClass = 'sticker';

		if (this.state.isDragging) {
			divClass += ' is-dragging';
		}

		return <div ref={this.setRef} className={divClass} draggable="true" onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>{this.props.sticker.text}</div>
	}
}