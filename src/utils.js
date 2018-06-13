const optionsToParams = ( options, defaults ) => {
	let opt = {};
	Object.assign( opt, defaults || {}, options || {} );
	let params = [];
	Object.keys( opt ).forEach( ( key ) => {
		if ( opt[key] || typeof opt[key] === "boolean" ) {
			params.push( `${key}=${opt[key]}` );
		}
	} );
	return params;
};

exports.optionsToParams = optionsToParams;
