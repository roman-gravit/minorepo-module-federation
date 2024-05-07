import path  from "path";
import webpack from 'webpack';

import { BuildMode, BuildPlatform, BuildPaths, BuildWebpack } from "@packages/build-config";

import packageJson from "./package.json";



export interface EnvVariables {
	analyzer?:         boolean;
	mode?:             BuildMode;
	platform?:         BuildPlatform;
	port?:             number;
	SHOP_REMOTE_URL?:  string;
	ADMIN_REMOTE_URL?: string;
}

export default (env: EnvVariables) => {

	const paths: BuildPaths = {
		entry: path.resolve(__dirname, "src", "index.tsx"),
		output: path.resolve(__dirname, "out"),
		html: path.resolve(__dirname, "public", "index.html"),
		public: path.resolve(__dirname, "public"),
		src: path.resolve(__dirname, "src")
	}

	const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? "http://localhost:3001";
	const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? "http://localhost:3002";

	const config: webpack.Configuration = BuildWebpack({
		port: env.port ?? 3000,
		mode: env.mode ?? "development",
		paths: paths,
		analzer: env.analyzer ?? false,
		platform: env.platform ?? "desktop"
	})

	config.plugins.push(new webpack.container.ModuleFederationPlugin({
		name: "host",
		filename: "remoteEntry.js",

		remotes: {
			shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
			admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`,
		},

		shared: {
			...packageJson.dependencies,
			react: {
				eager: true,
				requiredVersion: packageJson.dependencies["react"]
			},
			"react-router-dom" : {
				eager: true,
				requiredVersion: packageJson.dependencies["react-router-dom"]
			},
			"react-dom": {
				eager: true,
				requiredVersion: packageJson.dependencies["react-dom"]
			}
		}
	}));

	return config;
};