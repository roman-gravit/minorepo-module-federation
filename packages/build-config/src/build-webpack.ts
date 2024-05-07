import webpack from "webpack";

import { BuildDevServer }  from "./build-devserver";
import { BuildLoaders } from "./build-loaders";
import { BuildPlugins } from "./build-plugins";
import { BuildResolver } from "./build-resolver";
import { BuildOptions } from "./types/types";

export function BuildWebpack(options: BuildOptions): webpack.Configuration {

	const { mode, paths } = options;
	const isDevMode = mode === "development";

	return {
		//  Enable production optimizations or development hints.
		mode: mode ?? "development",

		//  The entry point(s) of the compilation.
		entry: paths.entry,

		// Options affecting the output of the compilation. `output` options tell webpack how to write the compiled files to disk.
		output: {
			path: paths.output,
			filename: "[name].[contenthash].js",
			clean: true
		},

		// Options affecting the normal modules (`NormalModuleFactory`).
		module: {
			rules: BuildLoaders(options),
		},
		
		resolve: BuildResolver(options),

		// developer tool to enhance debugging (false | eval | [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map).
		//devtool: isDevMode 
		//			? "inline-source-map" 
		//			: "source-map",

		// SourceMapDevToolPlugin
		// This plugin enables more fine grained control of source map generation. 
		// It is also enabled automatically by certain settings of the devtool configuration option.
		devtool: false,

		// Add additional plugins to the compiler.
		plugins: BuildPlugins(options),

		// Can be used to configure the behaviour of webpack-dev-server when
		// the webpack config is passed to webpack-dev-server CLI.
		devServer: isDevMode 
					 ? BuildDevServer(options) 
					 : undefined
	
	}
}