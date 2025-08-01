import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	copyAssets: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: configJSR.getExports(),
	fixInjectedImports: true,
	generateDeclarationMap: true,
	mappings: {
		"https://raw.githubusercontent.com/hugoalh/runtime-info-es/v0.1.0/mod.ts": {
			name: "@hugoalh/runtime-info",
			version: "^0.1.0"
		}
	},
	metadata: {
		name: configJSR.getName(),
		version: configJSR.getVersion(),
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
		scripts: {
		},
		engines: {
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "dist/npm",
	outputDirectoryPreEmpty: true
});
