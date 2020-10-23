const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/main.js',
        'iframe': './src/iframe.js',
        'vendor': [
            'lodash',
            'react',
        ],
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
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender'
        }),
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    }
};