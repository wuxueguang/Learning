

const path = require('path');
const packageName = require('./package.json').name;

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:7777/static/',
        // library: `${packageName}-[name]`,
        // libraryTarget: 'umd',
        // jsonpFunction: `webpackJsonp_${packageName}`,
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
        }, {
            test: /\.less$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'less-loader',
        }]
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};