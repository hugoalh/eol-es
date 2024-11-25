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
	const results: RegExpExecArray[] = Array.from(content.matchAll(_regexpEOL));
	if (results.length === 0) {
		return null;
	}
	return (results.some((result: RegExpExecArray): boolean => {
		return (result[0] === eolCRLF);
	}) ? eolCRLF : eolLF);
}
export default detectEOL;
