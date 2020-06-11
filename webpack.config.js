"use strict";

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");

const clientConfig = (env, argv) => {
	const URL_PREFIX = (argv.mode === 'production' ? '/api' : '');
	let result = {
		entry:        "./src/index.js",
		output:       {
			path:       __dirname+'/build/',
			publicPath: (argv.mode === 'production' ? '/' : 'http://0.0.0.0:8090/'),
			filename:   "bundle.js",
		},
		devServer:    {
			headers: {
				"Access-Control-Allow-Origin": "*"
			},
			hot:     		  true,
			disableHostCheck: true,
			host:             '0.0.0.0',
			port:             8090,
		},
		watchOptions: {
			aggregateTimeout: 300,
			poll:             1000
		},
		plugins: [
			new webpack.DefinePlugin({
				'URL_PREFIX': JSON.stringify(URL_PREFIX),
			}),
		],
		module:       {
			rules: [
				{
					test:    /\.js$/,
					loader:  "babel-loader",
					query:
					         {
						         presets: ['react']
					         },
					exclude: [/node_modules/, /public/]
				},
				{
					test:    /\.css$/,
					loader:  "style-loader!css-loader!resolve-url-loader",
					exclude: [/public/]
				},
				{
					test:    /\.scss$/,
					loader:  "style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap",
					exclude: [/node_modules/, /public/]
				},
				{
					test:    /\.less$/,
					loader:  "style-loader!css-loader!autoprefixer-loader!less",
					exclude: [/node_modules/, /public/]
				},
				{
					test:   /\.gif$/,
					loader: "url-loader?limit=10000&mimetype=image/gif"
				},
				{
					test:   /\.jpg$/,
					loader: "url-loader?limit=10000&mimetype=image/jpg"
				},
				{
					test:   /\.png$/,
					loader: "url-loader?limit=10000&mimetype=image/png"
				},
				{
					test:   /\.svg/,
					loader: "url-loader?limit=26000&mimetype=image/svg+xml"
				},
				{
					test:   /\.json$/,
					loader: "json-loader"
				},
				{test: /\.(png|jpg|svg)?(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?limit=8192'},
				{
					test:   /\.(woff|woff2|eot|ttf)$/,
					loader: 'file-loader?name=[name].[ext]&outputPath=fonts/',

				}
			]
		},
	};

	if (argv.mode === 'development') {
		result.devtool = 'inline-source-map';
	}
	else {
		result.optimization = {
			minimize: true,
			minimizer: [
				new UglifyJsPlugin({
					test:          /\.js$/i,
					exclude:       /node_modules/,
					parallel:      true,
					cache:         true,
					uglifyOptions: {
						output: {
							comments: false,
						}
					}
				}),
			]
		};
	}

	return result;
};

module.exports = [
	clientConfig,
];
