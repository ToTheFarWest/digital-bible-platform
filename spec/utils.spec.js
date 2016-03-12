import { optionsToParams } from "../src/utils";

describe( "Utils Specs ", () => {
	it( "should turn null options into empty parameters", () => {
		const options = null;
		const defaultOptions = null;
		const results = optionsToParams( options, defaultOptions );
		results.length.should.equal( 0 );
	} );

	it( "should turn options into parameters", () => {
		const options = { test: 1 };
		const defaultOptions = { test: 2, test2: 3 };
		const results = optionsToParams( options, defaultOptions );
		results.length.should.equal( 2 );
		results.should.deep.equal( [ "test=1", "test2=3" ] );
	} );

	it( "should include boolean parameters", () => {
		const options = { test: 1 };
		const defaultOptions = { test: 2, test2: 3, someval: false };
		const results = optionsToParams( options, defaultOptions );
		results.length.should.equal( 3 );
		results.should.deep.equal( [ "test=1", "test2=3", "someval=false" ] );
	} );
} );
