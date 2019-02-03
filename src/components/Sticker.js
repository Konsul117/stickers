import * as React from "react";

/**
 * Стикер.
 *
 * @property {StickerModel} props.sticker     Стикер
 * @property {function}     props.onSetCoords Событие установки координат стикера. Передаёт аргументы: id, Coords
 * @property {function}     props.onMoved     Событие перемещения стикера. Передаёт аргументы: id, Coords
 * @property {function}     props.onClick     Событие клика по стикеру. Передаётся аргументом модель стикера
 *
 * @property {boolean}     state.isDragging      Идёт перемещение стикера через события onDragStart, onDragEnd
 * @property {boolean}     state.isTouchDragging Идёт перемещение стикера через события для тач-экрана
 * @property {number|null} state.x               Координата x начала перемещения для тач-экрана
 * @property {number|null} state.y               Координата y начала перемещения для тач-экрана
 * @property {number|null} state.stickerX        Координата x относительно границ стикера в начале перемещения для тач-экрана
 * @property {number|null} state.stickerY        Координата y относительно границ стикера в начале перемещения для тач-экрана
 * @property {number|null} state.width           Ширина стикера (для корректного отображения стикера во время перемещения)
 * @property {number|null} state.height          Высота стикера (для корректного отображения стикера во время перемещения)
 */
export default class Sticker extends React.PureComponent {
	/**
	 * @inheritdoc
	 */
	constructor(props) {
		super(props);

		this.state = {
			isDragging:      false,
			isTouchDragging: false,
			x:               null,
			y:               null,
			stickerX:        null,
			stickerY:        null,
			width:           null,
			height:          null,
		};

		this.onDragStart    = this.onDragStart.bind(this);
		this.onDragEnd      = this.onDragEnd.bind(this);
		this.setRef         = this.setRef.bind(this);
		this.onClick        = this.onClick.bind(this);

		this.onTouchStart  =this.onTouchStart.bind(this);
		this.onTouchEnd  =this.onTouchEnd.bind(this);
		this.onTouchMove  =this.onTouchMove.bind(this);

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
	 * Обработка события касания к стикеру на тач-экране.
	 *
	 * @property {SyntheticEvent} e Событие
	 */
	onTouchStart(e) {
		this.setState({
			isTouchDragging: true,
			width:           e.target.clientWidth,
			height:          e.target.clientHeight,
			x:               e.touches[0].pageX,
			y:               e.touches[0].pageY,
			stickerX:        e.touches[0].pageX-e.target.offsetLeft,
			stickerY:        e.touches[0].pageY-e.target.offsetTop,
		});
	}

	/**
	 * Обработка события завершения перемещения при касании для тач-экрана.
	 */
	onTouchEnd() {
		this.setState({
			isTouchDragging: false,
		});

		this.props.onMoved(this.props.sticker.id, {
			beginX: this.state.x,
			beginY: this.state.y,
			endX:   this.state.x + this.stickerRef.offsetWidth,
			endY:   this.state.y + this.stickerRef.offsetHeight,
		});
	}

	/**
	 * Обработка события перемещения после касания на тач-экране
	 *
	 * @property {SyntheticEvent} e Событие
	 */
	onTouchMove(e) {
		this.setState({
			x: e.touches[0].pageX,
			y: e.touches[0].pageY,
		})
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
		let wrapperClass = 'sticker';

		let stickerStyle = {};
		let wrapperStyle = {};

		if (this.state.isTouchDragging || this.state.isDragging) {
			wrapperClass += ' is-dragging';
		}

		if (this.state.isTouchDragging) {
			stickerStyle = {
				position: 'absolute',
				left:     this.state.x - this.state.stickerX,
				top:      this.state.y - this.state.stickerY,
				width:    this.state.width - 24,
				height:   this.state.height - 24,
			};

			wrapperStyle = {
				// width:  this.state.width,
				height: this.state.height,
			};
		}

		return <div className="sticker-wrapper" style={wrapperStyle}>
			<div
				ref={this.setRef}
				className={wrapperClass}
				draggable="true"
				onDragStart={this.onDragStart}
				onDragEnd={this.onDragEnd}
				onTouchStart={this.onTouchStart}
				onTouchEnd={this.onTouchEnd}
				onTouchMove={this.onTouchMove}
				onClick={this.onClick}
				style={stickerStyle}
			>
				{this.props.sticker.text}
			</div>
		</div>;
	}
}