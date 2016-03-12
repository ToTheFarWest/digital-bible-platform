import request from "request";

export default class Client {
	constructor( apiKey, options ) {
		this.apiKey = apiKey;
		this.options = options || {};
		if ( !this.options.baseUrl && !this.options.uri && !this.options.url ) {
			this.options.baseUrl = "http://dbt.io/";
		}
		this.options.qs = {
			key: apiKey,
			v: 2
		};
		this.options.json = true;
		if ( this.options.proxy ) {
			process.env[ "NODE_TLS_REJECT_UNAUTHORIZED" ] = "0";
		}
		this.client = request.defaults( this.options );
	}

	// http://dbt.io/library/volumelanguagefamily?key={API-Key}&media=audio&v=2
	languageFamilies( media, callback ) {
		if ( typeof media === "function" ) {
			callback = media;
			media = null;
		}

		const path = media ? `library/volumelanguagefamily?media=${media}` : "library/volumelanguagefamily";
		this.client.get( path, ( err, res, body ) => {
			callback( err, body );
		} );
	}
}
