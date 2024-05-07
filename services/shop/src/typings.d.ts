declare module '*.module.scss' {
	const content: Record<string, string>;
	export default content;
}

declare module "*.png";

declare module '*.svg' {
	import React from 'react';
	const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare const _PLATFORM: "mobile" | "desktop";