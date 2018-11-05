import Moment from "moment/moment";
import Config from "./../Config";

Moment.locale('ru');
Moment.prototype.formatLocal = function(template) {
	return this.utcOffset(Config.localTimezoneOffset).format(template);
};
Moment.prototype.formatUtc = function(template) {
	return this.utcOffset(0).format(template);
};
Moment.DATE_TIME_INPUT_FORMAT = 'DD.MM.YYYY';
Moment.parseLocal = function(dateTime) {
	let textDateAtom = (new Moment(dateTime, Moment.DATE_TIME_INPUT_FORMAT)).format('YYYY-MM-DDTHH:mm:ss+0' + Config.localTimezoneOffset + ':00');

	return new Moment.parseZone(textDateAtom);
};
/**
 * Приведение даты к началу недели.
 *
 * @return {moment}
 */
Moment.prototype.convertToWeekStart = function() {
	//считаем разницу между номером текущего дня недели и нулевого (понедельника) и, если она есть, то отнимаем от даты эту разницу
	let daysDiff = (0 - this.weekday());

	if (daysDiff !== 0) {
		this.add(daysDiff, 'day');
	}

	return this;
};

String.prototype.toTitleCase = function () {
	return this.replace(/^([\wа-я])/g, (txt) => {
		return txt.charAt(0).toUpperCase();
	});
};

/**
 * Преобразование справочника в виде объекта в Map.
 * Учитывает, что идентификаторы - это number и сохраняет их тип в результирующем Map;
 *
 * @param {object}  object      Объект данных
 * @param {boolean} isKeyNumber Преобразовывать ли ключи в number
 */
Map.createFromObject = (object, isKeyNumber = false) => {
	let result = new Map();

	Object.entries(object).forEach((row) => {
		let key = row[0];

		if (isKeyNumber === true) {
			key = parseInt(key);
		}

		result.set(key, row[1]);
	});

	return result;
};