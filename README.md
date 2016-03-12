# digital-bible-platform
JavaScript and Node.js client for the Digital Bible Platform [Digital Bible Platform](http://digitalbibleplatform.com/)

The Digital Bible Platform is an online API for Bible Text, Audio, and Video. This client module for Node.js provides an easy-to-use set of functions designed to simplify the building of JavaScript applications that use the Digital Bible Platform.

### Requirements

* [Node.js](http://nodejs.org)
* A [Digital Bible Platform](http://www.digitalbibleplatform.com/dev/signup/) API key

### Installing the client

```
npm install digital-bible-platform
```

### Client usage (callbacks)

```
var Client = require( "digital-bible-platform" );
var client = new Client( "your-api-key" );

client.languageFamilies( function( err, languages ) {
	console.log( languages );
} );
```

### Proxy support

To use the client behind a proxy server, pass an options object to the module constructor that includes the proxy server. For example:

```
var Client = require("digital-bible-platform");
var client = new Client("your-api-client", { "proxy": "http://localproxy.com" } );
```

This `options` object is the same object used by the [request module](https://github.com/mikeal/request#requestoptions-callback).

### Running tests

To run integration tests, you'll need to set your API Key as an environment variable.

**OSX / Linux**

```
export DBP_API_KEY=your-api-key
```

**Windows**

```
setx DBP_API_KEY "your-api-key"
```

_Note:_ On Windows, you will need to reopen your command prompt after setting environment variables.

Open Terminal or command prompt, change to the digital-bible-platform client directory, and enter:

```
npm test
```

### License

The Digital Bible Platorm Node.js client is licensed under [MIT](http://www.opensource.org/licenses/mit-license.php). Refer to [license.txt](https://github.com/reverentgeek/digital-bible-platform/blob/master/LICENSE) for more information.
