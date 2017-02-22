var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/client/app.js'],
    target: "node",
    output: { path: __dirname, filename: './dist/bundle.js' },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
