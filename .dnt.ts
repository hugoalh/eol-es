import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	assetsCopy: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: [
		...configJSR.getExports(),
		{
			executable: true,
			name: "eol",
			path: "./cli.ts"
		}
	],
	generateDeclarationMap: true,
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
		description: "A CLI and module to handle end of line (EOL).",
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
		scripts: {
		},
		engines: {
			node: ">=16.13.0"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "npm",
	outputDirectoryPreEmpty: true
});
