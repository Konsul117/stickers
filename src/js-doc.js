/**
 * @typedef {object} StickerModel Стикер.
 *
 * @property {number}  id    Идентификатор
 * @property {number}  index Индекс сортировки
 * @property {string}  text  Текст
 * @property {boolean} isNew Новый стикер
 */

/**
 * @typedef {object} Coords Координаты объекта.
 *
 * @property {number} beginX Координаты левой границы по горизонтальной оси
 * @property {number} beginY Координаты верхней границы по вертикальной оси
 * @property {number} endX   Координаты правой границы по горизонтальной оси
 * @property {number} endY   Координаты нижней границы по вертикальной оси
 */

/**
 * @typedef {object} StickerPosition Данные о перемещении стикера
 *
 * @property {number} stickerId Идентификатор стикера
 * @property {number} index     Индекс стикера, который должен быть ему назначен
 */