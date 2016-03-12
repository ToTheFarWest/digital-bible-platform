const reqwest = require( "reqwest" );
import { optionsToParams } from "./utils";

export default class Client {
	constructor( apiKey, options ) {
		this.apiKey = apiKey;
		this.options = options || {};
		if ( !this.options.baseUrl ) {
			this.options.baseUrl = "http://dbt.io/";
		}
	}

	_get( path, callback ) {
		// console.log( path );
		const url = ( path.indexOf( "?" ) > -1 ) ? `${this.options.baseUrl}${path}&key=${this.apiKey}&v=2`
			: `${this.options.baseUrl}${path}?key=${this.apiKey}&v=2`;

		reqwest( {
			url: url,
			type: "json",
			method: "get"
		} )
			.then( ( res ) => {
				callback( null, res );
			} )
			.catch( ( err ) => {
				callback( err );
			} );
	}

	languages( options, callback ) {
		const defaults = { code: "", name: "", full_word: null, family_only: null, possibilities: null, sort_by: "" };
		if ( typeof options === "function" ) {
			callback = options;
			options = {};
		}
		const params = optionsToParams( options, defaults );
		const path = ( params.length === 0 ) ? "library/language" : "library/language?" + params.join( "&" );
		this._get( path, callback );
	}

	versions( options, callback ) {
		const defaults = { code: "", name: "", sort_by: "" };
		if ( typeof options === "function" ) {
			callback = options;
			options = {};
		}
		const params = optionsToParams( options, defaults );
		const path = ( params.length === 0 ) ? "library/version" : "library/version?" + params.join( "&" );
		this._get( path, callback );
	}

	volumeLanguageFamilies( options, callback ) {
		const defaults = { media: "", root: "", full_word: false, language_code: "", delivery: "", status: "", resolution: "", organization_id: "" };
		if ( typeof options === "function" ) {
			callback = options;
			options = {};
		}
		const params = optionsToParams( options, defaults );
		const path = ( params.length === 0 ) ? "library/volumelanguagefamily" : "library/volumelanguagefamily?" + params.join( "&" );
		this._get( path, callback );
	}

	volumes( options, callback ) {
		const defaults = { dam_id: "", fcbh_id: "", media: "", language: "", full_word: false, language_code: "",
			language_family_code: "", updated: "", status: "live", dbp_agreement: null, expired: null, resolution: "",
			organization_id: "", sort_by: "dam_id" };
		if ( typeof options === "function" ) {
			callback = options;
			options = {};
		}
		const params = optionsToParams( options, defaults );
		const path = ( params.length === 0 ) ? "library/volume" : "library/volume?" + params.join( "&" );
		this._get( path, callback );
	}

	books( damId, callback ) {
		const path = `library/book?dam_id=${damId}`;
		this._get( path, callback );
	}

	verses( damId, options, callback ) {
		const defaults = { book_id: "", chapter_id: "", verse_start: "", verse_end: "", markup: "" };
		if ( typeof options === "function" ) {
			callback = options;
			options = {};
		}
		options = options || {};
		options.dam_id = damId;
		const params = optionsToParams( options, defaults );
		const path = "text/verse?" + params.join( "&" );
		this._get( path, callback );
	}

	textSearch( damId, options, callback ) {
		const defaults = { reply: "json", callback: "", echo: false, query: "", book_id: "", offset: 0, limit: 50 };
		if ( options === null || typeof options === "function" ) {
			return callback( new Error( "options required for textSearch()" ) );
		}
		options = options || {};
		options.dam_id = damId;
		const params = optionsToParams( options, defaults );
		const path = ( params.length === 0 ) ? "text/search" : "text/search?" + params.join( "&" );
		this._get( path, callback );
	}
}
