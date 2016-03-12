"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var reqwest = require("reqwest");

var Client = function () {
	function Client(apiKey, options) {
		_classCallCheck(this, Client);

		this.apiKey = apiKey;
		this.options = options || {};
		if (!this.options.baseUrl) {
			this.options.baseUrl = "http://dbt.io/";
		}
	}

	_createClass(Client, [{
		key: "_get",
		value: function _get(path, callback) {
			// console.log( path );
			var url = path.indexOf("?") > -1 ? "" + this.options.baseUrl + path + "&key=" + this.apiKey + "&v=2" : "" + this.options.baseUrl + path + "?key=" + this.apiKey + "&v=2";

			reqwest({
				url: url,
				type: "json",
				method: "get"
			}).then(function (res) {
				callback(null, res);
			}).catch(function (err) {
				callback(err);
			});
		}
	}, {
		key: "languages",
		value: function languages(options, callback) {
			var defaults = { code: "", name: "", full_word: null, family_only: null, possibilities: null, sort_by: "" };
			if (typeof options === "function") {
				callback = options;
				options = {};
			}
			var params = (0, _utils.optionsToParams)(options, defaults);
			var path = params.length === 0 ? "library/language" : "library/language?" + params.join("&");
			this._get(path, callback);
		}
	}, {
		key: "versions",
		value: function versions(options, callback) {
			var defaults = { code: "", name: "", sort_by: "" };
			if (typeof options === "function") {
				callback = options;
				options = {};
			}
			var params = (0, _utils.optionsToParams)(options, defaults);
			var path = params.length === 0 ? "library/version" : "library/version?" + params.join("&");
			this._get(path, callback);
		}
	}, {
		key: "volumeLanguageFamilies",
		value: function volumeLanguageFamilies(options, callback) {
			var defaults = { media: "", root: "", full_word: false, language_code: "", delivery: "", status: "", resolution: "", organization_id: "" };
			if (typeof options === "function") {
				callback = options;
				options = {};
			}
			var params = (0, _utils.optionsToParams)(options, defaults);
			var path = params.length === 0 ? "library/volumelanguagefamily" : "library/volumelanguagefamily?" + params.join("&");
			this._get(path, callback);
		}
	}, {
		key: "volumes",
		value: function volumes(options, callback) {
			var defaults = { dam_id: "", fcbh_id: "", media: "", language: "", full_word: false, language_code: "",
				language_family_code: "", updated: "", status: "live", dbp_agreement: null, expired: null, resolution: "",
				organization_id: "", sort_by: "dam_id" };
			if (typeof options === "function") {
				callback = options;
				options = {};
			}
			var params = (0, _utils.optionsToParams)(options, defaults);
			var path = params.length === 0 ? "library/volume" : "library/volume?" + params.join("&");
			this._get(path, callback);
		}
	}, {
		key: "books",
		value: function books(damId, callback) {
			var path = "library/book?dam_id=" + damId;
			this._get(path, callback);
		}
	}, {
		key: "verses",
		value: function verses(damId, options, callback) {
			var defaults = { book_id: "", chapter_id: "", verse_start: "", verse_end: "", markup: "" };
			if (typeof options === "function") {
				callback = options;
				options = {};
			}
			options = options || {};
			options.dam_id = damId;
			var params = (0, _utils.optionsToParams)(options, defaults);
			var path = "text/verse?" + params.join("&");
			this._get(path, callback);
		}
	}, {
		key: "textSearch",
		value: function textSearch(damId, options, callback) {
			var defaults = { reply: "json", callback: "", echo: false, query: "", book_id: "", offset: 0, limit: 50 };
			if (options === null || typeof options === "function") {
				return callback(new Error("options required for textSearch()"));
			}
			options = options || {};
			options.dam_id = damId;
			var params = (0, _utils.optionsToParams)(options, defaults);
			var path = params.length === 0 ? "text/search" : "text/search?" + params.join("&");
			this._get(path, callback);
		}
	}]);

	return Client;
}();

exports.default = Client;