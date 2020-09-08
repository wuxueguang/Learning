

const path = require('path');
// const packageName = require('./package.json').name;

module.exports = {
    mode: 'development',
    entry: {
        'main': './src/client/main.tsx',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/js'),
        publicPath: 'http://localhost:7777/static/js/',
    },
    module: {
        rules: [{
          test: /\.tsx?$/,
          loader: [ 'ts-loader'],
          exclude: /(node_modules|bower_components)/,
        }, /*{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
        },*/ {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader'],
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'less-loader',
                options: {
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }],
        }]
    },
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    resolve: {
        extensions: ['ts', 'tsx', '.js', '.jsx'],
    },
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000
    }
};