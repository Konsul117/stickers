import * as React from "react";

/**
 * Стикер.
 *
 * @property {StickerModel} props.sticker     Стикер
 * @property {function}     props.onSetCoords Событие установки координат стикера. Передаёт аргументы: id, Coords
 * @property {function}     props.onMoved     Событие перемещения стикера. Передаёт аргументы: id, Coords
 * @property {function}     props.onClick     Событие клика по стикеру. Передаётся аргументом модель стикера
 */
export default class Sticker extends React.PureComponent {
	/**
	 * @inheritdoc
	 */
	constructor(props) {
		super(props);

		this.state = {
			isDragging: false,
		};

		this.onDragStart    = this.onDragStart.bind(this);
		this.onDragEnd      = this.onDragEnd.bind(this);
		this.setRef         = this.setRef.bind(this);
		this.onClick        = this.onClick.bind(this);

		this.stickerRef = null;
	}

	/**
	 * Обработка начала перемещения.
	 */
	onDragStart() {
		this.setState({
			isDragging: true,
		});
	}

	/**
	 * Обработка окончания перемещения.
	 *
	 * @param {SyntheticEvent} e Событие
	 */
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

	/**
	 * Указание ref.
	 *
	 * @param {Node} node Нода дерева
	 */
	setRef(node) {
		this.stickerRef = node;
	}

	/**
	 * Получение текущих координат.
	 *
	 * @return {Coords}
	 */
	getCurrentCoords() {
		return {
			beginX: this.stickerRef.offsetLeft,
			beginY: this.stickerRef.offsetTop,
			endX:   this.stickerRef.offsetLeft+this.stickerRef.offsetWidth,
			endY:   this.stickerRef.offsetTop+this.stickerRef.offsetHeight,
		};
	}

	/**
	 * Обработка клика по стикеру.
	 */
	onClick() {
		this.props.onClick(this.props.sticker);
	}

	/**
	 * @inheritdoc
	 */
	render() {
		let divClass = 'sticker';

		if (this.state.isDragging) {
			divClass += ' is-dragging';
		}

		return <div
			ref={this.setRef}
			className={divClass}
			draggable="true"
			onDragStart={this.onDragStart}
			onDragEnd={this.onDragEnd}
			onClick={this.onClick}
		>
			{this.props.sticker.text}
		</div>
	}
}