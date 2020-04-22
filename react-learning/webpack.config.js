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
        }]
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    }
};