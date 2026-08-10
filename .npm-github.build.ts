import {
	readManifest,
	transform
} from "DNT";
const manifest = await readManifest("jsr.jsonc");
await transform({
	copyEntries: [
		"LICENSE.md",
		"README.md"
	],
	//@ts-ignore Lazy type.
	entrypointsScript: manifest.exports,
	generateDeclarationMap: true,
	mappings: {
		"jsr:@hugoalh/runtime-info@^0.4.0": {
			name: "@hugoalh/runtime-info",
			version: "^0.4.0"
		}
	},
	metadata: {
		//@ts-ignore Lazy type.
		name: manifest.name,
		//@ts-ignore Lazy type.
		version: manifest.version,
		description: "A module to handle end of line (EOL).",
		keywords: [
			"end-of-line",
			"eol"
		],
		homepage: "https://github.com/hugoalh/eol-es#readme",
		bugs: {
			url: "https://github.com/hugoalh/eol-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh/eol-es.git"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm-github",
	outputDirectoryPreEmpty: true
});
