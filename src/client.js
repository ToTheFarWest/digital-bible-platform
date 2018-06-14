const axios = require('axios');
const utils = require('./utils');

class Client {
    constructor( apiKey, options ) {
        this.apiKey = apiKey;
        this.options = options || {};
        if ( !this.options.baseUrl ) {
            this.options.baseUrl = "http://dbt.io/";
        }
    }

    async _get (path) {
        const url = ( path.indexOf( "?" ) > -1 ) ? `${this.options.baseUrl}${path}&key=${this.apiKey}&v=2` : `${this.options.baseUrl}${path}?key=${this.apiKey}&v=2`;

        try {
            const res = await axios.get(url);
            return res.data;
        }
        catch (err) {
            throw new Error('Bad path.' + err.message);
        }

    }

    languages (options) {
        const defaults = { code: "", name: "", full_word: null, family_only: null, possibilities: null, sort_by: "" };

        const params = utils.optionsToParams( options, defaults );
        const path = ( params.length === 0 ) ? "library/language" : "library/language?" + params.join( "&" );

        return this._get(path);
    }

    versions (options) {
        const defaults = { code: "", name: "", sort_by: "" };
        const params = utils.optionsToParams( options, defaults );
        const path = ( params.length === 0 ) ? "library/version" : "library/version?" + params.join( "&" );
        return this._get(path);
    }

    volumeLanguageFamilies (options) {
        const defaults = { media: "", root: "", full_word: false, language_code: "", delivery: "", status: "", resolution: "", organization_id: "" };
        const params = utils.optionsToParams( options, defaults );
        const path = ( params.length === 0 ) ? "library/volumelanguagefamily" : "library/volumelanguagefamily?" + params.join( "&" );
        return this._get(path);
    }

    volumes (options) {
        const defaults = { dam_id: "", fcbh_id: "", media: "", language: "", full_word: false, language_code: "",
            language_family_code: "", updated: "", status: "live", dbp_agreement: null, expired: null, resolution: "",
            organization_id: "", sort_by: "dam_id" };
        const params = utils.optionsToParams( options, defaults );
        const path = ( params.length === 0 ) ? "library/volume" : "library/volume?" + params.join( "&" );
        return this._get(path);
    }

    books (damId) {
        const path = `library/book?dam_id=${damId}`;
        return this._get(path);
    }

    verses (damId, options) {
        const defaults = { book_id: "", chapter_id: "", verse_start: "", verse_end: "", markup: "" };

        options = options || {};
        options.dam_id = damId;
        const params = utils.optionsToParams( options, defaults );
        const path = "text/verse?" + params.join( "&" );
        return this._get(path);
    }

    textSearch (damId, options) {
        const defaults = { reply: "json", callback: "", echo: null, query: "", book_id: "", offset: 0, limit: 50 };

        options = options || {};
        options.dam_id = damId;
        const params = utils.optionsToParams( options, defaults );
        const path = ( params.length === 0 ) ? "text/search" : "text/search?" + params.join( "&" );
        this._get(path);
    }
}

module.exports = Client;
