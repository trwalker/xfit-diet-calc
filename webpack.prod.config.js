var stripLoader = require('strip-loader');
var defaultConfig = require('./webpack.config.js');

var stripLoaderConfig = {
	test: loader: stripLoader.loader('console.log', 'debugger'), [ /\.js$/, /\.es6$/ ], exclude: /node_modules/
};

defaultConfig.module.loaders.push(stripLoaderConfig);

module.exports = defaultConfig;