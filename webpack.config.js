var config = {
	entry: ['./app/Calc.js'],
	output: {
		filename: 'dist/calc.js'
	},
	
	module: {
		preLoaders: [
			{ loader: 'eslint', test: /\.js$/,  exclude: /node_modules/ }
		],

		loaders: [
			{ loader: 'babel', query: { presets: ['es2015'] }, test: /\.js$/, exclude: /node_modules/ }
		]
	},

	resolve: {
		extensions: ['', '.js']
	},

	eslint: {
        failOnWarning: true,
        failOnError: true
    }
}

module.exports = config;