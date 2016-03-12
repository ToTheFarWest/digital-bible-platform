import Client from "../src/client";

describe( "Client Specs", () => {
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

			it( "volumeLanguageFamilyList should get a list of language families", ( done ) => {
				client.volumeLanguageFamilyList( ( err, res ) => {
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

			it( "volumeLanguageFamilyList should get a list of language families by media", ( done ) => {
				let options = { media: "audio" };
				client.volumeLanguageFamilyList( options, ( err, res ) => {
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

			it( "volumeListing should get a list of volumes for by language family code 'ENG'", ( done ) => {
				let options = { language_family_code: "ENG" };
				client.volumeListing( options, ( err, res ) => {
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

			it( "volumeListing should get a volumen by dam_id", ( done ) => {
				let options = { dam_id: DAM_ID };
				client.volumeListing( options, ( err, res ) => {
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

			it( "bookListing should get a list of books by dam_id", ( done ) => {
				client.bookListing( DAM_ID, ( err, res ) => {
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

			it( "verse should get the text for a given book, chapter, and verse", ( done ) => {
				should.exist( bookId );
				const options = { book_id: bookId, chapter_id: 1, verse_start: 1, verse_end: 1 };
				client.verse( DAM_ID, options, ( err, res ) => {
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
		} );
	}
} );
