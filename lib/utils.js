"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var optionsToParams = function optionsToParams(options, defaults) {
	var opt = {};
	Object.assign(opt, defaults, options);
	var params = [];
	Object.keys(opt).forEach(function (key) {
		if (opt[key]) {
			params.push(key + "=" + opt[key]);
		}
	});
	return params;
};

exports.optionsToParams = optionsToParams;