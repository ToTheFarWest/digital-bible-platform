import path from "path";

// globals

let sourcePath = path.resolve( "src" );
let outputPath = path.resolve( "lib" );

// loader definitions

let babelLoader = {
	test: /\.js$/,
	include: /src/,
	exclude: /node_modules/,
	loader: "babel",
	query: {
		presets: [ "es2015", "stage-0" ]
	}
};

// configurations

let appConfiguration = {
	context: sourcePath,
	entry: {
		client: "./client.js"
	},
	output: {
		path: outputPath,
		filename: "[name].js"
	},
	module: {
		loaders: [ babelLoader ]
	}
};

let configuration = [ appConfiguration ];

export default configuration;
