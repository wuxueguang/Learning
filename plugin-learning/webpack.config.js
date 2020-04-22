const path = require('path');
const APlugin = require('./plugins/a-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/main.js',
        'iframe': './src/iframe.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /.m?js$/,
            loader: [
                'a-loader',
                // 'b-loader',
                // 'c-loader'
            ],
            exclude: /(node_modules|bower_components)/,
        }]
    },
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    },
    plugins: [
        new APlugin()
    ]
};