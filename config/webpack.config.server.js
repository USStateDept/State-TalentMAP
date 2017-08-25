'use strict';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
    },
    externals: [nodeExternals()],
    entry: [
        require.resolve('./polyfills'),
        require.resolve('react-error-overlay'),
        './src/server.js',
    ],
    output: {
        path: path.join(__dirname, '../build'),
        filename: 'server-app.js',
    },
    resolve: {
        modules: ['node_modules',],
        extensions: ['.js', '.json', '.jsx'],
        plugins: [
            new ModuleScopePlugin('./src'),
        ],
    },
    module: {
        rules: [
            {
                exclude: [
                  /\.html$/,
                  /\.(js|jsx)$/,
                  /\.css$/,
                  /\.json$/,
                  /\.bmp$/,
                  /\.gif$/,
                  /\.jpe?g$/,
                  /\.png$/,
                  /\.scss$/,
                  /\.svg$/,
                ],
                loader: require.resolve('file-loader'),
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                  limit: 20000,
                  name: 'static/media/[name].[hash:8].[ext]',
                },
            },
            {
                test: /\.svg$/,
                use: [{
                    loader: 'babel-loader'
                  }, {
                    loader: 'react-svg-loader'
                  }]
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader'
                },
            },
            {
                test: /\.css$/,
                use: [
                  require.resolve('style-loader'),
                  {
                    loader: require.resolve('css-loader'),
                    options: {
                      importLoaders: 1,
                    },
                  },
                  {
                    loader: require.resolve('postcss-loader'),
                    options: {
                      ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                      plugins: () => [
                        require('postcss-flexbugs-fixes'),
                        autoprefixer({
                          browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009',
                        }),
                      ],
                    },
                  },
                ],
              },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader'],
                }),
            },
        ]
    }
};
