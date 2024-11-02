/**
 * End Of Line (EOL) character CRLF, use on the Windows platforms.
 */
export const eolCRLF = "\r\n" as const;
/**
 * End Of Line (EOL) character LF, use on the POSIX/UNIX platforms.
 */
export const eolLF = "\n" as const;
/**
 * End Of Line (EOL) character evaluated for the current platform.
 */
export const eol: typeof eolCRLF | typeof eolLF = (Deno.build.os === "windows") ? eolCRLF : eolLF;
const regexpEOL = /\r?\n/g;
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
	const result: RegExpMatchArray | null = content.match(regexpEOL);
	if (
		result === null ||
		result.length === 0
	) {
		return null;
	}
	return (result.some((part: string): boolean => {
		return (part === eolCRLF);
	}) ? eolCRLF : eolLF);
}
/**
 * Normalize the End Of Line (EOL) characters in the content, where EOL character is evaluated for the current platform.
 * @param {string} content Content that need to normalize the EOL characters.
 * @returns {string} Content that normalized the EOL characters.
 * @example
 * ```ts
 * normalizeEOL("Deno\r\nis not\r\nNode");
 * //=> "Deno\nis not\nNode" (POSIX/UNIX Platforms)
 * //=> "Deno\r\nis not\r\nNode" (Windows Platforms)
 * ```
 */
export function normalizeEOL(content: string): string;
/**
 * Normalize the End Of Line (EOL) characters in the content, where EOL character is specify.
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
export function normalizeEOL(eolChar: typeof eol, content: string): string;
export function normalizeEOL(param0: string, param1?: string): string {
	if (typeof param1 === "undefined") {
		return param0.replace(regexpEOL, eol);
	}
	return param1.replace(regexpEOL, param0);
}
