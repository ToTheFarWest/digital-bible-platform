import Client from "../src/client";

describe( "Client Specs", function() {
	this.timeout( 10000 );
	const apiKey = process.env["DBP_API_KEY"];
	let runIntegrationSpecs = !!apiKey;

	if ( runIntegrationSpecs ) {
		describe( "Integration Specs", () => {
			let client = {};
			const DAM_ID = "ENGESVN2ET"; // ESV New Testament, text
			let bookId = null;

			before( () => {
				client = new Client( apiKey );
			} );

			it( "languages should get a list of languages", ( done ) => {
				client.languages( ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 0 );
					let language = res[ 0 ];
					language.should.have.property( "language_code" );
					language.should.have.property( "language_name" );
					language.should.have.property( "english_name" );
					language.should.have.property( "language_iso" );
					language.should.have.property( "language_iso_2B" );
					language.should.have.property( "language_iso_2T" );
					language.should.have.property( "language_iso_1" );
					language.should.have.property( "language_iso_name" );
					language.should.have.property( "language_family_code" );
					done();
				} );
			} );

			it( "languages should get a list of languages by language code", ( done ) => {
				client.languages( { code: "ENG" }, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.equal( 1 );
					let language = res[ 0 ];
					language.should.have.property( "language_code" );
					language.should.have.property( "language_name" );
					language.should.have.property( "english_name" );
					language.should.have.property( "language_iso" );
					language.should.have.property( "language_iso_2B" );
					language.should.have.property( "language_iso_2T" );
					language.should.have.property( "language_iso_1" );
					language.should.have.property( "language_iso_name" );
					language.should.have.property( "language_family_code" );
					done();
				} );
			} );

			it( "volumeLanguageFamilies should get a list of language families", ( done ) => {
				client.volumeLanguageFamilies( ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 0 );
					// console.log( res.length );
					// 1174
					let language = res[ 0 ];
					language.should.have.property( "language_family_code" );
					language.should.have.property( "language_family_name" );
					language.should.have.property( "language_family_english" );
					language.should.have.property( "language_family_iso" );
					language.should.have.property( "media" ).that.is.instanceOf( Array );
					language.should.have.property( "delivery" ).that.is.instanceOf( Array );
					// console.log( language );
					done();
				} );
			} );

			it( "versions should get a list of versions", ( done ) => {
				client.versions( ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 1 );
					let version = res[ 0 ];
					version.should.have.property( "version_code" );
					version.should.have.property( "version_name" );
					version.should.have.property( "english_name" );
					done();
				} );
			} );

			it( "versions should get a list of versions by code", ( done ) => {
				client.versions( { code: "ESV" }, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.equal( 1 );
					let version = res[ 0 ];
					version.should.have.property( "version_code" ).that.is.equal( "ESV" );
					version.should.have.property( "version_name" );
					version.should.have.property( "english_name" );
					done();
				} );
			} );

			it( "versions should get a list of versions by name", ( done ) => {
				client.versions( { name: "English" }, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 1 );
					let version = res[ 0 ];
					version.should.have.property( "version_code" );
					version.should.have.property( "version_name" ).that.contains( "English" );
					version.should.have.property( "english_name" );
					done();
				} );
			} );

			it( "volumeLanguageFamilies should get a list of language families by media", ( done ) => {
				let options = { media: "audio" };
				client.volumeLanguageFamilies( options, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 0 );
					// console.log( res.length );
					// 815
					let language = res[ 0 ];
					language.should.have.property( "language_family_code" );
					language.should.have.property( "language_family_name" );
					language.should.have.property( "language_family_english" );
					language.should.have.property( "language_family_iso" );
					language.should.have.property( "media" ).that.is.instanceOf( Array );
					language.should.have.property( "delivery" ).that.is.instanceOf( Array );
					// console.log( language );
					done();
				} );
			} );

			it( "volumes should get a list of volumes for by language family code 'ENG'", ( done ) => {
				let options = { language_family_code: "ENG" };
				client.volumes( options, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 0 );
					// console.log( res.length );
					// 24
					let volume = res[ 0 ];
					// console.log( volume );
					volume.should.have.property( "dam_id" );
					volume.should.have.property( "fcbh_id" );
					volume.should.have.property( "volume_name" );
					volume.should.have.property( "language_family_code" ).that.is.equal( "ENG" );
					volume.should.have.property( "language_iso" ).that.is.equal( "eng" );
					volume.should.have.property( "resolution" ).that.is.instanceOf( Array );
					volume.should.have.property( "delivery" ).that.is.instanceOf( Array );
					done();
				} );
			} );

			it( "volumes should get all volumes", ( done ) => {
				client.volumes( ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 0 );
					// console.log( res.length );
					// 24
					let volume = res[ 0 ];
					// console.log( volume );
					volume.should.have.property( "dam_id" );
					volume.should.have.property( "fcbh_id" );
					volume.should.have.property( "volume_name" );
					volume.should.have.property( "language_family_code" );
					volume.should.have.property( "language_iso" );
					volume.should.have.property( "resolution" ).that.is.instanceOf( Array );
					volume.should.have.property( "delivery" ).that.is.instanceOf( Array );
					done();
				} );
			} );

			it( "volumes should get a volume by dam_id", ( done ) => {
				let options = { dam_id: DAM_ID };
				client.volumes( options, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.equal( 1 );
					// console.log( res.length );
					// 24
					let volume = res[ 0 ];
					// console.log( volume );
					volume.should.have.property( "dam_id" ).that.is.equal( DAM_ID );
					volume.should.have.property( "fcbh_id" );
					volume.should.have.property( "volume_name" );
					volume.should.have.property( "language_family_code" ).that.is.equal( "ENG" );
					volume.should.have.property( "language_iso" ).that.is.equal( "eng" );
					volume.should.have.property( "resolution" ).that.is.instanceOf( Array );
					volume.should.have.property( "delivery" ).that.is.instanceOf( Array );
					done();
				} );
			} );

			it( "books should get a list of books by dam_id", ( done ) => {
				client.books( DAM_ID, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 0 );
					let book = res[ 0 ];
					book.should.have.property( "dam_id" ).that.is.equal( DAM_ID );
					book.should.have.property( "book_id" );
					book.should.have.property( "book_name" );
					book.should.have.property( "book_order" );
					book.should.have.property( "number_of_chapters" );
					book.should.have.property( "chapters" );
					bookId = book.book_id;
					done();
				} );
			} );

			it( "verses should get the text for entire given bible", ( done ) => {
				client.verses( DAM_ID, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.above( 1 );
					let verse = res[ 0 ];
					verse.should.have.property( "book_name" );
					verse.should.have.property( "book_id" ).that.is.equal( bookId );
					verse.should.have.property( "book_order" );
					verse.should.have.property( "chapter_id" );
					verse.should.have.property( "chapter_title" );
					verse.should.have.property( "verse_id" );
					verse.should.have.property( "verse_text" );
					verse.should.have.property( "paragraph_number" );
					done();
				} );
			} );

			it( "verses should get the text for a given book, chapter, and verse", ( done ) => {
				should.exist( bookId );
				const options = { book_id: bookId, chapter_id: 1, verse_start: 1, verse_end: 1 };
				client.verses( DAM_ID, options, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.equal( 1 );
					let verse = res[ 0 ];
					verse.should.have.property( "book_name" );
					verse.should.have.property( "book_id" ).that.is.equal( bookId );
					verse.should.have.property( "book_order" );
					verse.should.have.property( "chapter_id" );
					verse.should.have.property( "chapter_title" );
					verse.should.have.property( "verse_id" );
					verse.should.have.property( "verse_text" );
					verse.should.have.property( "paragraph_number" );
					done();
				} );
			} );

			//

			it( "textSearch should get search results", ( done ) => {
				const options = { query: "walk" };
				client.textSearch( DAM_ID, options, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					// console.log( res );
					res.should.be.instanceOf( Array );
					res.length.should.be.equal( 2 );
					done();
				} );
			} );

			it( "textSearch called with null options should return error", ( done ) => {
				client.textSearch( DAM_ID, null, ( err, res ) => {
					should.exist( err );
					should.not.exist( res );
					done();
				} );
			} );
		} );
	}
} );
