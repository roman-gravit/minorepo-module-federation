// If you use TypeScript in the webpack config, you'll need to properly type devServer property 
// in order to avoid TS errors (e.g. 'devServer' does not exist in type 'Configuration'). 
// For that use either:
import type { Configuration as DevServerConfiguration} from "webpack-dev-server";
import { BuildOptions } from './types/types';

export function BuildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		port: options.port ?? 3000, 
		open: true,
		historyApiFallback: true,
		hot: true
	}
}