"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require("request");

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
	function Client(apiKey, options) {
		_classCallCheck(this, Client);

		this.apiKey = apiKey;
		this.options = options || {};
		if (!this.options.baseUrl && !this.options.uri && !this.options.url) {
			this.options.baseUrl = "http://dbt.io/";
		}
		this.options.qs = {
			key: apiKey,
			v: 2
		};
		this.options.json = true;
		if (this.options.proxy) {
			process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
		}
		this.client = _request2.default.defaults(this.options);
	}

	// http://dbt.io/library/volumelanguagefamily?key={API-Key}&media=audio&v=2


	_createClass(Client, [{
		key: "languageFamilies",
		value: function languageFamilies(media, callback) {
			if (typeof media === "function") {
				callback = media;
				media = null;
			}

			var path = media ? "library/volumelanguagefamily?media=" + media : "library/volumelanguagefamily";
			this.client.get(path, function (err, res, body) {
				callback(err, body);
			});
		}
	}]);

	return Client;
}();

exports.default = Client;