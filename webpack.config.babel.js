import { resolve } from 'path';
import webpackValidator from 'webpack-validator';
import { getIfUtils } from 'webpack-config-utils';

export default env => {
	const { ifProd, ifNotProd } = getIfUtils(env);
	const settings = {
		context: resolve('src'),
		entry: './app.js',
		output: {
			filename: 'bundle.js',
			path: resolve('public'),
			publicPath: '/public/',
			pathinfo: ifNotProd()
		},
		devtool: ifProd('source-map', 'eval'),
		module: {
			loaders: [
				{test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/}
			]
		}
	};
	const config = webpackValidator(settings);

	if (env.debug) {
		console.log(config);
		debugger;
	}

	return config;
}



