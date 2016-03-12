const optionsToParams = ( options, defaults ) => {
	let opt = {};
	Object.assign( opt, defaults, options );
	let params = [];
	Object.keys( opt ).forEach( ( key ) => {
		if ( opt[key] ) {
			params.push( `${key}=${opt[key]}` );
		}
	} );
	return params;
};

export { optionsToParams };
