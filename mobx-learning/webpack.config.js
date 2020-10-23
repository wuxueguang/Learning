const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        'main': './src/main.js',
        'vender': [
            'react',
            'react-dom',
            'mobx',
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/static/',
        // library: `${packageName}-[name]`,
        // libraryTarget: 'umd',
        // jsonpFunction: `webpackJsonp_${packageName}`,
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
        }],
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'async',
    //         minSize: 20000,
    //         minRemainingSize: 0,
    //         maxSize: 0,
    //         minChunks: 1,
    //         maxAsyncRequests: 30,
    //         maxInitialRequests: 30,
    //         automaticNameDelimiter: '~',
    //         enforceSizeThreshold: 50000,
    //         cacheGroups: {
    //           defaultVendors: {
    //             test: /[\\/]node_modules[\\/]/,
    //             priority: -10
    //           },
    //           default: {
    //             minChunks: 2,
    //             priority: -20,
    //             reuseExistingChunk: true
    //           }
    //         }
    //       }
    //     }
    // },
    plugins: [
        new CleanWebpackPlugin(),
        // new webpack.HashedModuleIdsPlugin(),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'manifest'
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vender'
        // }),
    ],
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000,
    },
};
