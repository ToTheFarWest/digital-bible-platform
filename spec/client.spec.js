import Client from "../src/client";

describe( "Client Specs", () => {
	const apiKey = process.env["DBP_API_KEY"];
	let runIntegrationSpecs = !!apiKey;

	if ( runIntegrationSpecs ) {
		describe( "Client Integration Specs", () => {
			let client = {};

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
		} );
	}
} );
