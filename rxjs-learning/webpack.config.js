const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'main': './src/main.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/static/',
        // library: `${packageName}-[name]`,
        // libraryTarget: 'umd',
        // jsonpFunction: `webpackJsonp_${packageName}`,
    },
    // resolve: {
    //     extensions: ['.js', '.jsx'],
    // },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader',
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
            loader: 'file-loader',
            options: {}
            }],
        }, {
            test: /\.tsx?$/,
            loader: [ 'ts-loader'],
            exclude: /(node_modules|bower_components)/,
        }, {
            test: /\.jsx?$/,
            loader: [ 'babel-loader'],
            // exclude: /(node_modules|bower_components)/,
        }, {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader'],
        }, {
            test: /\.scss$/,
            use: [{
            loader: 'style-loader',
            }, {
            loader: 'css-loader',
            options: {
                modules: true,
            },
            }, {
            loader: 'sass-loader',
            }],
        }, {
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
        port: 9000,
    },
};
