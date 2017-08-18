'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
    },
    externals: [nodeExternals()],
    entry: {
        server: './server.js',
    },
    output: {
        path: path.join(__dirname, './src'),
        filename: 'server-app.js',
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, './src'),
                use: {
                    loader: 'babel-loader'
                },
            }
        ]
    }
};
