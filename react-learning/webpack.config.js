const path = require('path');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        'main': './src/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/static/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            }
        ]
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000,
    },
};