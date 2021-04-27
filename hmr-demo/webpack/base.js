const path = require('path');

module.exports = {

	entry: {
		main: ['./src/main'],
	},

	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, '../dist'),
		publicPath: '/static/',
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader',
				}],
			},
			{
				test: /\.less$/,
				use: [{
					loader: 'style-loader'
				}, {
					loader: 'css-loader',
				}, {
					loader: 'less-loader',
					options: {
						lessOptions: {
							javascriptEnabled: true,
						},
					}
				}],
			},
		],
	},

	plugins: [],

	resolve: {
		extensions: ['.js', '.jsx'],
	},

	optimization: {
		runtimeChunk: {
			name: 'runtime',
		},
	},

};
