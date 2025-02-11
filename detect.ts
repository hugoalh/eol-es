import {
	_regexpEOL,
	eolCRLF,
	eolLF,
	type eol
} from "./eol.ts";
/**
 * Detect the End Of Line (EOL) character in the content.
 * 
 * If no EOL character is detected, `null` is returned.
 * @param {string} content Content that need to detect the EOL character.
 * @returns {typeof eol | null} Result of the detected EOL character, or `null` if no EOL character is detected.
 * @example 1
 * ```ts
 * detectEOL("Deno\r\nis not\r\nNode");
 * //=> "\r\n"
 * ```
 * @example 2
 * ```ts
 * detectEOL("Deno\nis not\r\nNode");
 * //=> "\r\n"
 * ```
 * @example 3
 * ```ts
 * detectEOL("Deno\nis not\nNode");
 * //=> "\n"
 * ```
 * @example 4
 * ```ts
 * detectEOL("Deno is not Node");
 * //=> null
 * ```
 */
export function detectEOL(content: string): typeof eol | null {
	const results: readonly RegExpExecArray[] = Array.from(content.matchAll(_regexpEOL));
	if (results.length === 0) {
		return null;
	}
	return (results.some((result: RegExpExecArray): boolean => {
		return (result[0] === eolCRLF);
	}) ? eolCRLF : eolLF);
}
/**
 * Detect the End Of Line (EOL) character in the file, asynchronously.
 * 
 * If no EOL character is detected, `null` is returned.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * @param {string | URL} filePath Path of the file that need to detect the EOL character.
 * @returns {Promise<typeof eol | null>} Result of the detected EOL character, or `null` if no EOL character is detected.
 */
export async function detectFileEOL(filePath: string | URL): Promise<typeof eol | null> {
	return detectEOL(await Deno.readTextFile(filePath));
}
/**
 * Detect the End Of Line (EOL) character in the file, synchronously.
 * 
 * If no EOL character is detected, `null` is returned.
 * 
 * > **🛡️ Runtime Permissions**
 * > 
 * > - File System - Read \[Deno: `read`; NodeJS (>= v20.9.0) 🧪: `fs-read`\]
 * >   - *Resources*
 * @param {string | URL} filePath Path of the file that need to detect the EOL character.
 * @returns {typeof eol | null} Result of the detected EOL character, or `null` if no EOL character is detected.
 */
export function detectFileEOLSync(filePath: string | URL): typeof eol | null {
	return detectEOL(Deno.readTextFileSync(filePath));
}
