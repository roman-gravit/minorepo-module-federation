import webpack, { DefinePlugin, Configuration } from 'webpack';

import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MinCssExtractPlugin from "mini-css-extract-plugin";
//import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";
import { SourceMapDevToolPlugin } from "webpack";

import { BuildOptions } from "./types/types";
import path from 'path';


export function BuildPlugins(options: BuildOptions): Configuration["plugins"] {

	const isDevMode = options.mode === "development";
	const isProdMode = options.mode === "production";


	const devToolPluginOptions = {

		// Indicates whether column mappings should be used.
		columns: true,				
		
		// Prevents the source file content from being included in the source map.
		//
		// Production: include original source code into the source map files.
		//             Takes more space, but allows to debug without source files.
		//
		// Debug: do not include original source code.
		//        Takes less space, works faster, need original files to debug.
		//
		noSources: isDevMode ? false : true,

		// Indicates whether loaders should generate source maps.
		module: true,

		namespace: "test"

	};

	// common for development and production
	const plugins: Configuration["plugins"] = [
		// In the example above, the html-webpack-plugin generates an HTML file for your application and 
		// automatically injects all your generated bundles into this file.
		new HtmlWebpackPlugin({ 
			template: options.paths.html, 
			favicon: path.resolve(options.paths.public, "favicon.ico"),
			publicPath: "/"
		}),

		// The DefinePlugin replaces variables in your code with other values or expressions at compile time. 
		// This can be useful for allowing different behavior between development builds and production builds.
		new DefinePlugin({
			_PLATFORM: JSON.stringify(options.platform)
		}),

		// Webpack plugin that runs TypeScript type checker on a separate process.
		//new ForkTsCheckerWebpackPlugin(),

		new SourceMapDevToolPlugin(devToolPluginOptions)
	];

	if(isDevMode) {
		plugins.push(
			new webpack.ProgressPlugin({ dependencies: true, dependenciesCount: 10000 }));

		plugins.push(new MinCssExtractPlugin({
			filename: "css/[name][contenthash].css",
			chunkFilename: "css/[name][contenthash].css",
  		}));

		plugins.push(new ReactRefreshWebpackPlugin())
		
	}

	if(isProdMode) {
		plugins.push(new MinCssExtractPlugin({
			filename: "css/[name][contenthash].css",
			chunkFilename: "css/[name][contenthash].css",
  		}));

		// Copies individual files or entire directories, which already exist, to the build directory.
		plugins.push(new CopyPlugin({
			patterns: [
				{ from: path.resolve(options.paths.public, "locales"), to: path.resolve(options.paths.output, "locales") },
			],
		}));
	}

	if(options.analzer) {
		plugins.push(new BundleAnalyzerPlugin());
	}

	return plugins;
}