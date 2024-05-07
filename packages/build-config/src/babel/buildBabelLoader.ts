import { BuildOptions } from "../types/types";
import { removeDataTestBabelPlugin } from "./removeDataTestBabelPlugin";

export function buildBabelLoader(options: BuildOptions) {
	const isDevMode = options.mode === "development";
	const isProdMode = options.mode === "production";

	const plugins = [];

	if(isProdMode) {
		plugins.push([
			removeDataTestBabelPlugin,
			{
				props: ["data-testid"]
			}
		])
	}

	return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
				"@babel/preset-env",
				"@babel/preset-typescript",
				[
					"@babel/preset-react",
					{
						runtime: isDevMode ? "automatic" : "classic"
					}
				]
				
			],
			plugins: plugins.length > 0 ? plugins : undefined 
          }
        }
	}
}