import { ModuleOptions } from "webpack";

import MinCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";

import { BuildOptions } from "./types/types";
//import { buildBabelLoader } from "./babel/buildBabelLoader";

export function BuildLoaders(options: BuildOptions): ModuleOptions["rules"] {
	const isDevMode = options.mode === "development";

	const scssLoader = {
		test: /\.s[ac]ss$/i,
		use: [
			MinCssExtractPlugin.loader, 
			{
				loader: "css-loader",
				options: {
					modules: {
						localIdentName: isDevMode ? "[path][name]_[local]" : "[hash:base64:8]" 
					}
				}
			},
			"sass-loader"
		],
	};


	//const babelLoader = buildBabelLoader(options);

	const tsLoader = {
		test: /\.tsx?$/,
		use: [
			{ 
				loader: "ts-loader",
			    options: {
					getCustomTransformers: () => ({
						before: [isDevMode && ReactRefreshTypeScript()].filter(Boolean),
					}),
					transpileOnly: true
				}
			}
		],
		exclude: /node_modules/
	};

	const assetLoader = {
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource'
	}

	const svgLoader = {
        test: /\.svg$/i,
        use: [
			{ 
				loader: '@svgr/webpack', 
				options: { 
					icon: true,
					svgoConfig: {
						plugins: [
							{
								name: "convertColors",
								params: {
									currentColor: true
								}
							}
						]

					}
				} 
			}
		]
    }

	return [
		assetLoader,
		svgLoader,
		scssLoader,
		//babelLoader
		tsLoader
	]
}