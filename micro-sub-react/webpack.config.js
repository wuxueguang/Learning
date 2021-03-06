const path = require('path');
const packageName = require('./package.json').name;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'main': './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/static/',
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${packageName}`,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [{
            test: /\.m?jsx?$/,
            use: {
                loader: 'babel-loader',
            },
        }, {
            test: /\.css$/,
            use: [{
                loader: 'style-loader',
            }, { 
                loader: "css-loader",
                options: {
                    modules: true,
                },
            }],
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader',
            }, { 
                loader: "css-loader",
                options: {
                    modules: true,
                },
            }, {
                loader: 'less-loader',
            }],
        }],
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9001, 
    }
    
};
