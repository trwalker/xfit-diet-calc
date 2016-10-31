var stripLoader = require('strip-loader');
var defaultConfig = require('./webpack.config.js');

var stripLoaderConfig = {
	loader: stripLoader.loader('console.log', 'debugger'), test: [ /\.js$/, /\.es6$/ ], exclude: /node_modules/
};

defaultConfig.module.loaders.push(stripLoaderConfig);

module.exports = defaultConfig;