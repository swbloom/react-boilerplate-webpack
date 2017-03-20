import { resolve } from 'path';
import webpack from 'webpack';
// import webpackValidator from 'webpack-validator';
import { getIfUtils } from 'webpack-config-utils';
import ExtractTextPlugin from 'extract-text-webpack-plugin';


const { extract } = ExtractTextPlugin;

export default env => {
	const { ifProd, ifNotProd } = getIfUtils(env);
	const settings = {
		context: resolve('src'),
		entry: [
			ifNotProd('webpack-dev-server/client?http://localhost:8080'),
			ifNotProd('webpack/hot/only-dev-server'),
			ifNotProd('react-hot-loader/patch'),
			'./app.js'
		],
		output: {
			filename: 'bundle.js',
			path: resolve('public'),
			publicPath: '/public/',
			pathinfo: ifNotProd()
		},
		devtool: ifProd('source-map', 'eval'),
		devServer: {
			hot: true,
			contentBase: resolve(__dirname, 'public'),
			publicPath: '/public/'
		},
		module: {
			rules: [
				{test: /\.js$/, use: ['babel-loader'], exclude: /node_modules/},
				{test: /\.css$/, use: ifProd(extract({ fallback: 'style-loader', use: 'css-loader' }), ['style-loader', 'css-loader'])}
			]
		},
		plugins: [
			new ExtractTextPlugin('style.css'),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		]
	}
	const config = settings;

	if (env.debug) {
		console.log(config);
		debugger;
	}

	return config;
}



