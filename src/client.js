import request from "request";
import { optionsToParams } from "./utils";

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

	_get( path, callback ) {
		this.client.get( path, ( err, res, body ) => {
			callback( err, body );
		} );
	}

	volumeLanguageFamilyList( options, callback ) {
		const defaults = { media: "", root: "", full_word: false, language_code: "", delivery: "", status: "", resolution: "", organization_id: "" };
		if ( typeof options === "function" ) {
			callback = options;
			options = {};
		}
		const params = optionsToParams( options, defaults );
		const path = ( params.length === 0 ) ? "library/volumelanguagefamily" : "library/volumelanguagefamily?" + params.join( "&" );
		this._get( path, callback );
	}

	volumeListing( options, callback ) {
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
}
