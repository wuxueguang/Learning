const path = require('path');
const packageName = require('./package.json').name;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${packageName}`,
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            use: ['style-loader', "css-loader"],
        }, {
            test: /\.less$/,
            use: [{
                loader:'style-loader',
            }, {
                loader: "css-loader",
                options: {
                    modules: true,
                },
            }, {
                loader: "less-loader"
            }],
        }, ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
















    // optimization: {
    //     runtimeChunk: {
    //         name: 'runtime'
    //     }
    // },
};