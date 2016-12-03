/**
 * mix some common methods
 */
export default function() {

	/***
	 * fake console method if in production mode
	 */
	if (process.env.NODE_ENV === 'production') {
		const console = {};
		console.log = () => {};
		console.warn = () => {};
		console.error = () => {};
		window.console = console;
	}

	/***
	 * detect if dom has scrollbar
	 */
	$.fn.hasScrollBar = function() {
		return this.get(0).scrollHeight > this.height();
	};

	/**
	 * serialize form
	 */
	$.fn.serializeObject = function () {
		const o = {};
		const a = this.serializeArray();
		$.each(a, function () {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};


	/**
	 * date format
	 */
	Date.prototype.format = function(format) {
		var o = {
			'M+' : this.getMonth() + 1, // month
			'd+' : this.getDate(), // day
			'h+' : this.getHours(), // hour
			'm+' : this.getMinutes(), // minute
			's+' : this.getSeconds(), // second
			'q+' : Math.floor((this.getMonth() + 3) / 3), // quarter
			'S' : this.getMilliseconds() // millisecond
		};
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (this.getFullYear() + '')
				.substr(4 - RegExp.$1.length));
		}
		for (const k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ('00' + o[k]).substr(('' + o[k]).length));
			}
		}
		return format;
	};
}
