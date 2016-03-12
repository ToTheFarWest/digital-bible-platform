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
	volumeLanguageFamilyList( options, callback ) {
		const defaultOptions = { media: "", root: "", full_word: false, language_code: "", delivery: "", status: "", resolution: "", organization_id: "" };
		if ( typeof options === "function" ) {
			callback = options;
			options = {};
		}
		Object.assign( options, defaultOptions );
		// console.log( options );
		let params = [];
		Object.keys( options ).forEach( ( key ) => {
			if ( options[key] ) {
				params.push( `${key}=${options[key]}` );
			}
		} );

		const path = ( params.length === 0 ) ? "library/volumelanguagefamily" : "library/volumelanguagefamily?" + params.join( "&" );

		// console.log( "path:", path );

		this.client.get( path, ( err, res, body ) => {
			callback( err, body );
		} );
	}
}
