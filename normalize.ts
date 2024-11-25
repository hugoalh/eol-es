import {
	_regexpEOL,
	type eol
} from "./eol.ts";
/**
 * Normalize the End Of Line (EOL) characters in the content.
 * @param {typeof eol} eolChar EOL character that use to normalize the content.
 * @param {string} content Content that need to normalize the EOL characters.
 * @returns {string} Content that normalized the EOL characters.
 * @example
 * ```ts
 * normalizeEOL(eolLF, "Deno\r\nis not\r\nNode");
 * //=> "Deno\nis not\nNode" (POSIX/UNIX Platforms)
 * //=> "Deno\nis not\nNode" (Windows Platforms)
 * ```
 */
export function normalizeEOL(eolChar: typeof eol, content: string): string {
	return content.replace(_regexpEOL, eolChar);
}
export default normalizeEOL;
