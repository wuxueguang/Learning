
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseCfg = require('./base');

module.exports = {
	...baseCfg,

	mode: process.env.NODE_ENV || 'development',

	plugins: [
		new webpack.DllReferencePlugin({
			context: path.join(__dirname, '..'),
			manifest: require(path.join(__dirname, '../.temp/vendor.manifest.json')),
		}),

		new HtmlWebpackPlugin({
			filename: 'entry.html',
			template: path.join(__dirname, '../.temp/index.html'),
		}),
	],

	// devServer: {
	// 	port: 9000,
	// 	compress: true,
	// 	writeToDisk: true,
	// 	contentBase: path.join(__dirname, '../dist'),
	// 	contentBasePublicPath: baseCfg.output.publicPath,
	// 	before: function(app) {
	// 		app.get(/^\/(?!(static\/.*|api\/.*))/, function(req, res){
	// 			res.sendFile(path.join(__dirname, '../dist/entry.html'));
	// 		});
	// 	}
	// },
};
