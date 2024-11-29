import { parseArgs } from "jsr:@std/cli@^1.0.6/parse-args";
import { detectEOL } from "./detect.ts";
import { detectFileEOL } from "./detect_fs.ts";
import {
	eol,
	eolCRLF,
	eolLF
} from "./eol.ts";
import { normalizeFileEOL } from "./normalize_fs.ts";
if (!import.meta.main) {
	throw new Error(`This script is for command line usage only!`);
}
const args = parseArgs(Deno.args, {
	boolean: [
		"file",
		"stdin"
	]
});
const fromFile: boolean = args.file;
const fromStdin: boolean = args.stdin;
const [action, ...argsValues]: string[] = args._.map((value: string | number): string => {
	return String(value);
});
if (fromFile && fromStdin) {
	throw new SyntaxError(`Unable to use the sources of file and stdin together!`);
}
function visualizeEOL(eolChar: typeof eol | null): string {
	switch (eolChar) {
		case eolCRLF:
			return "crlf";
		case eolLF:
			return "lf";
		default:
			return "null";
	}
}
switch (action?.toLowerCase()) {
	case "detect":
		if (fromFile) {
			if (argsValues.length === 0) {
				throw new SyntaxError(`File path is not defined!`);
			}
			if (argsValues.length !== 1) {
				throw new SyntaxError(`Too many arguments! Expect: 1; Current: ${argsValues.length}.`);
			}
			console.log(visualizeEOL(await detectFileEOL(argsValues[0])));
		} else if (fromStdin) {
			if (argsValues.length !== 0) {
				throw new SyntaxError(`Too many arguments! Expect: 0; Current: ${argsValues.length}.`);
			}
			const stdinReader: ReadableStreamDefaultReader<Uint8Array> = Deno.stdin.readable.getReader();
			let data: Uint8Array = Uint8Array.from([]);
			while (true) {
				const {
					done,
					value
				}: ReadableStreamReadResult<Uint8Array> = await stdinReader.read();
				if (done) {
					break;
				}
				data = Uint8Array.from([...data, ...value]);
			}
			console.log(visualizeEOL(detectEOL(new TextDecoder().decode(data).replace(/\r?\n$/, ""))));
		} else {
			if (argsValues.length === 0) {
				throw new SyntaxError(`Data is not defined!`);
			}
			if (argsValues.length !== 1) {
				throw new SyntaxError(`Too many arguments! Expect: 1; Current: ${argsValues.length}.`);
			}
			console.log(visualizeEOL(detectEOL(argsValues[0])));
		}
		break;
	case "normalize":
		if (fromStdin) {
			throw new SyntaxError(`Unable to use the source of stdin with this action!`);
		}
		if (argsValues.length === 0) {
			throw new SyntaxError(`Files path are not defined!`);
		}
		await normalizeFileEOL(eol, ...argsValues);
		break;
	default:
		throw new Error(`\`${action}\` is not a valid action!`);
}
