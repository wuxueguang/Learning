const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
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