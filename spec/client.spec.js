import Client from "../src/client";

describe( "Client Specs", () => {
	const apiKey = process.env["DBP_API_KEY"];
	let runIntegrationSpecs = !!apiKey;

	if ( runIntegrationSpecs ) {
		describe( "Client Integration Specs", () => {
			let client = {};
			let damId = null;

			before( () => {
				client = new Client( apiKey );
			} );

			it( "should get a list of language families", ( done ) => {
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

			it( "should get a list of language families by media", ( done ) => {
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

			it( "should get a list of volumes for by language family code 'ENG'", ( done ) => {
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
					damId = volume.dam_id;
					volume.should.have.property( "fcbh_id" );
					volume.should.have.property( "volume_name" );
					volume.should.have.property( "language_family_code" ).that.is.equal( "ENG" );
					volume.should.have.property( "language_iso" ).that.is.equal( "eng" );
					volume.should.have.property( "resolution" ).that.is.instanceOf( Array );
					volume.should.have.property( "delivery" ).that.is.instanceOf( Array );
					done();
				} );
			} );

			it( "should get a list of books by dam_id", ( done ) => {
				should.exist( damId );
				client.bookListing( damId, ( err, res ) => {
					should.not.exist( err );
					should.exist( res );
					console.log( res );
					// res.should.be.instanceOf( Array );
					// res.length.should.be.above( 0 );
					// console.log( res.length );
					// 24
					// let volume = res[ 0 ];
					// console.log( volume );
					// volume.should.have.property( "dam_id" );
					// volume.should.have.property( "fcbh_id" );
					// volume.should.have.property( "volume_name" );
					// volume.should.have.property( "language_family_code" ).that.is.equal( "ENG" );
					// volume.should.have.property( "language_iso" ).that.is.equal( "eng" );
					// volume.should.have.property( "resolution" ).that.is.instanceOf( Array );
					// volume.should.have.property( "delivery" ).that.is.instanceOf( Array );
					done();
				} );
			} );
		} );
	}
} );
