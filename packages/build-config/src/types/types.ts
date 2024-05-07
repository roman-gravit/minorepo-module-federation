export { BuildMode, BuildPlatform };
export { BuildOptions };
export { BuildPaths };


type BuildMode = "production" | "development";
type BuildPlatform = "mobile" | "desktop";

interface BuildPaths {
	entry: string;
	html: string;
	public: string;
	output: string;
	src: string;
}

interface BuildOptions {
	port: number;
	paths: BuildPaths;
	mode: BuildMode;
	analzer?: boolean;
	platform?: BuildPlatform;
}