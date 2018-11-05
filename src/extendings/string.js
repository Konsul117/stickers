/**
 *
 * @file Extend default String class.
 */

(function(window) {

	/**
	 *
	 * return postfix for concrete (<value>) value
	 *
	 * @this {String}                           - using like value
	 *
	 * @param {String[]}  variants              - [var1, var2, var3]
	 *                                              var1 for 1, 21, 31,..., 101, 121,...
	 *                                              var2 for 2-4, 22-24, 32-34,..., 102-104, 122-124, 132-134...
	 *                                              var3 for 0, 5-20, 25-30, 35-40,..., 100, 105-120, 125-130, 135-140,...
	 *
	 * @param {Object|String} [words]           - if <string> then it is zero word: <word> equal { 0 : <word> }
	 *                                              example for different values:
	 *                                                  String(0).countPostfix([], 'нет домов');
	 *                                                  << нет домов
	 *
	 * @param {Boolean=true} [postfixOnly]      if set to <false> return value + postfix variant.
	 *                                              example postfixOnly = true:
	 *                                                  String.countPostfix(12, ['дом', 'дома', 'домов'], 'нет домов');
	 *                                                  << домов
	 *                                                  String.countPostfix(0, ['дом', 'дома', 'домов'], 'нет домов', true);
	 *                                                  << нет домов
	 *
	 *                                              example postfixOnly = false:
	 *                                                  String.countPostfix(12, ['дом', 'дома', 'домов'], 'нет домов', false);
	 *                                                  << 12 домов
	 *                                                  String.countPostfix(0, ['дом', 'дома', 'домов'], 'нет домов', false);
	 *                                                  << нет домов
	 *
	 * @param {String} [template='%c %w']       output template (ignore if <postfixOnly> != false :: %c - count, %w - word, %% - '%' symbol
	 *
	 * @return {String}
	 */
	String.prototype.countPostfix = function(variants, words, postfixOnly, template) {
		var index = 0;
		if (postfixOnly != false) {
			postfixOnly = true;
		}
		if (!template || typeof template.valueOf() != 'string') {
			template = '%c %w';
		}
		if (!(words instanceof Object)) {
			if (!words && words != 0 && words != '') {
				words = {}
			}
			else {
				words = {
					0: (words != 0 && !words ? 0 : words.valueOf())
				}
			}
		}
		var value = this instanceof Object ? this.valueOf() : String(this);
		/*
		 check value in words.
		 */
		if (value in words) {
			return String(words[value]);
		}

		value = +String(this instanceof Object ? this.valueOf() : String(this)).replace(/[^\d^\.]+/g, '');
		/*
		 in JavaScript, !value is true in next cases:
		 value is undefined;
		 value is null;
		 value is NaN;
		 value is '' (not here, because value is Number (see higher);
		 value is 0 (zero)
		 customize undefined, null, etc. to 0
		 */
		if (!value) {
			value = 0;
		}
		var dec  = value % 10;
		var hung = value % 100;
		if (dec > 0 && dec < 1) {
			index = 1
		}
		else if (dec >= 2 && dec <= 4) {
			index = 1;
		}
		else if (dec == 0 || (dec >= 5 && dec <= 9) || (hung >= 11 && hung <= 19)) {
			index = 2;
		}

		var result = variants[Math.min(index, variants.length)] || '';
		if (postfixOnly == false) {
			return template
				.replace(/([^%]|^)%c/gim, '$1' + value.toString())
				.replace(/([^%]|^)%w/gim, '$1' + result)
				.replace(/%%/gim, '%')
				;
		}
		return result
	};

	/**
	 *
	 * return postfix for current LString
	 *
	 * @param {Number|*} value
	 *
	 * @param {String[]}  variants              - [var1, var2, var3]
	 *                                              var1 for 1, 21, 31,..., 101, 121,...
	 *                                              var2 for 2-4, 22-24, 32-34,..., 102-104, 122-124, 132-134...
	 *                                              var3 for 0, 5-20, 25-30, 35-40,..., 100, 105-120, 125-130, 135-140,...
	 *
	 * @param {Object|String} [words]           - if <string> then it is zero word: <word> equal { 0 : <word> }
	 *                                              example for different values:
	 *                                                  String.countPostfix(0, [], 'нет домов');
	 *                                                  << нет домов
	 *                                                  String.countPostfix(undefined, [], { 0 : 'нет домов' });
	 *                                                  << нет домов
	 *                                                  String.countPostfix(1/0, [], { Infinity : 'бесконечно много домов' });
	 *                                                  << бесконечно много домов
	 *                                                  String.countPostfix(-1/0, [], { Infinity : 'бесконечно мало домов' });
	 *                                                  << бесконечно мало домов
	 *
	 * @param {Boolean=true} [postfixOnly]      if set to <false> return value + postfix variant.
	 *                                              example postfixOnly = true:
	 *                                                  String.countPostfix(12, ['дом', 'дома', 'домов'], 'нет домов');
	 *                                                  << домов
	 *                                                  String.countPostfix(0, ['дом', 'дома', 'домов'], 'нет домов', true);
	 *                                                  << нет домов
	 *
	 *                                              example postfixOnly = false:
	 *                                                  String.countPostfix(12, ['дом', 'дома', 'домов'], 'нет домов', false);
	 *                                                  << 12 домов
	 *                                                  String.countPostfix(0, ['дом', 'дома', 'домов'], 'нет домов', false);
	 *                                                  << нет домов
	 *
	 * @param {String} [template='%c %w']       output template (ignore if <postfixOnly> != false :: %c - count, %w - word, %% - '%' symbol
	 *
	 * @return {String}
	 */
	String.countPostfix = function(value, variants, words, postfixOnly, template) {
		return String.prototype.countPostfix.call(value, variants, words, postfixOnly, template);
	};

	/** @var {Number} Конвертирует символы строки в нижний регистр: 'HELLO world' -> 'hello world' */
	String.CASE_LOWER = 1;
	/** @var {Number} Конвертирует символы строки в верхний регистр: 'HELLO world' -> 'HELLO WORLD' */
	String.CASE_UPPER = 2;
	/** @var {Number} Конвертирует первый символ каждого слова в верхний регистр, остальные - в нижний: 'HELLO world' -> 'Hello World' */
	String.CASE_TITLE = 4;

	/**
	 * Функция конвертации регистра строки
	 * @param {string}  str
	 * @param {Number}  [mod=String.CASE_LOWER]
	 * @return {string}
	 */
	String.convertCharCase = function(str, mod) {
		(mod || (mod = String.CASE_LOWER));
		switch (mod) {
			case String.CASE_LOWER:
				return str.toLowerCase();
			case String.CASE_UPPER:
				return str.toUpperCase();
			case String.CASE_TITLE:
				var arr = str.match(/[\wа-я]+/g);
				for (var i = 0, il = arr.length; i < il; ++i) {
					str = str.replace(arr[i], arr[i][0].toUpperCase() + arr[i].substr(1).toLowerCase());
				}
				return str;
		}
		return str;
	};

	/**
	 * Функция конвертации регистра строки
	 * @param {Number}  [mod=String.CASE_LOWER]
	 * @return {string}
	 */
	String.prototype.convertCharCase = function(mod) {
		return String.convertCharCase(this.valueOf(), mod);
	};

})(window);